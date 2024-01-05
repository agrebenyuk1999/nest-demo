import { Injectable, InternalServerErrorException, NotFoundException, Type } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import QueryDto from './query.dto';
import { IPaginatedResult } from './IPaginatedResult';
import { plainToInstance } from 'class-transformer';

@Injectable()
export abstract class BaseService<Model, CreateDTO, UpdateDTO = null, Response = null> {
  constructor(
    protected readonly _prismaService: PrismaService,
    private readonly _modelName: string,
  ) {}

  responseClass = null;
  filterClass = null;
  relations: string[] = [];

  async create(data: CreateDTO): Promise<Response | Model> {
    const transformedData = this.transformDataForCreatingWithRelations(data);

    return this.executePrismaMethod('create', { data: transformedData });
  }

  async findById(id: number): Promise<Response | Model> {
    return this.executePrismaMethod('findUniqueOrThrow', { where: { id } });
  }

  async findAll(queryDto: QueryDto<Model>): Promise<IPaginatedResult<Model>> {
    this.validateRelations(queryDto.relations);
    const filter = new this.filterClass();
    const query = filter.buildQueryWithFilters(queryDto.filters);
    const total = await this._prismaService[this._modelName].count({ where: query });
    const page = +queryDto.page || 1;
    const limit = +queryDto.limit || 50;
    const result = await this._prismaService[this._modelName].findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: query,
      orderBy: queryDto.sort,
      include: this.buildIncludeObject(queryDto.relations, true),
    });

    return this.buildPaginatedResult(result, total, limit, page);
  }

  findByParam<K extends keyof Model>(value: Model[K], param: K): Promise<Model | null> {
    return this._prismaService[this._modelName].findFirst({
      where: { [param]: value },
    });
  }

  async update(id: number, data: UpdateDTO): Promise<Response | Model> {
    const transformedData = this.transformDataForUpdatingWithRelations(id, data);

    return this.executePrismaMethod('update', { where: { id }, data: transformedData });
  }

  async remove(id: number): Promise<Model> {
    return this._prismaService[this._modelName].delete({ where: { id } });
  }

  async deleteIfExists(condition: object): Promise<boolean> {
    const entity = await this._prismaService[this._modelName].findUnique(condition);

    if (entity) {
      await this._prismaService[this._modelName].delete({ where: { id: entity.id } });

      return true;
    }

    return false;
  }

  transformDataForCreatingWithRelations(data: CreateDTO) {
    if (this.relations.length) {
      this.relations.forEach((relation) => {
        if (data[relation]) {
          data[relation] = { connect: data[relation].map((id: number) => ({ id })) };
        }
      });
    }

    return data;
  }

  transformDataForUpdatingWithRelations(id: number, data: UpdateDTO) {
    const existingModel = this._prismaService[this._modelName].findUnique({
      where: { id },
      include: this.relations.reduce((acc, key) => {
        acc[key] = true;

        return acc;
      }, {}),
    });

    if (!existingModel) {
      throw new Error(`Entity with id ${id} does not exist`);
    }

    if (this.relations.length) {
      this.relations.forEach((relation) => {
        if (data[relation]) {
          data[relation] = {
            set: data[relation].map((id: number) => ({ id })),
          };
        }
      });
    }

    return data;
  }

  public responseWrapper(model: Model): Response | Model
  {
    return this.responseClass
        ? plainToInstance(this.responseClass as Type<Response>, model, {
          excludeExtraneousValues: true,
        })
        : model;
  }

  private async executePrismaMethod(method: string, params: any): Promise<Response | Model> {
    try {
      const model = await this._prismaService[this._modelName][method]({
        ...params,
        include: this.buildIncludeObject(this.relations),
      });

      return this.responseWrapper(model);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): void {
    if (error.code === 'P2025') {
      throw new NotFoundException(`${this._modelName} не знайдено.`);
    }

    throw new InternalServerErrorException(`Помилка при обробці ${this._modelName}`);
  }

  private buildIncludeObject(
    relations?: string[],
    allowEmpty: boolean = false,
  ): Record<string, boolean> {
    if (allowEmpty && (!relations || relations.length === 0)) {
      return {};
    }

    return relations.reduce((acc, key) => {
      acc[key] = true;

      return acc;
    }, {});
  }

  private validateRelations(requestedRelations: string[]): void {
    if (requestedRelations) {
      const invalidRelations = requestedRelations.filter(
        (relation) => !this.relations.includes(relation),
      );
      if (invalidRelations.length > 0) {
        throw new InternalServerErrorException(`Invalid relations: ${invalidRelations.join(', ')}`);
      }
    }
  }

  private buildPaginatedResult(
    result: Model[],
    total: number,
    limit: number,
    page: number,
  ): IPaginatedResult<Model> {
    return {
      data: this.responseClass
        ? result.map((item: Model) =>
            plainToInstance(this.responseClass, item, { excludeExtraneousValues: true }),
          )
        : result,
      total,
      limit,
      page,
      last_page: Math.ceil(total / limit),
    };
  }
}
