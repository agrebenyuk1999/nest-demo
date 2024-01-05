import { IsOptional } from 'class-validator';

export default class QueryDto<Model> {
  @IsOptional()
  filters?: { [key in keyof Model]?: any };
  @IsOptional()
  sort?: { [key in keyof Model]?: 'asc' | 'desc' };
  @IsOptional()
  page: number;
  @IsOptional()
  limit: number;
  @IsOptional()
  relations?: string[];
}
