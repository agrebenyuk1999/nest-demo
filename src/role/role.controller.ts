import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import FilterDto from '../common/query.dto';
import { Role } from '@prisma/client';
import { IPaginatedResult } from '../common/IPaginatedResult';
import { RoleResponse } from './responses/role.response';
import QueryDto from '../common/query.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly _service: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponse | Role> {
    return this._service.create(createRoleDto);
  }

  @Get()
  findAll(@Query() queryDto: QueryDto<Role>): Promise<IPaginatedResult<Role>> {
    return this._service.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RoleResponse | Role | null> {
    return this._service.findById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponse | Role> {
    return this._service.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._service.remove(+id);
  }
}
