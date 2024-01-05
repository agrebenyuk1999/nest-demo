import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import FilterDto from '../common/query.dto';
import { Company } from '@prisma/client';
import { IPaginatedResult } from '../common/IPaginatedResult';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyResponse } from './responses/company.response';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CheckPermissions } from '../common/permissions.decorator';
import QueryDto from '../common/query.dto';
import { User } from '../user/decorators/user.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly _service: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<CompanyResponse | Company> {
    return this._service.create(createCompanyDto);
  }

  @Get()
  @CheckPermissions('companies.access')
  findAll(@Query() queryDto: QueryDto<Company>): Promise<IPaginatedResult<Company>> {
    return this._service.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CompanyResponse | Company | null> {
    return this._service.findById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyResponse | Company> {
    return this._service.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._service.remove(+id);
  }
}
