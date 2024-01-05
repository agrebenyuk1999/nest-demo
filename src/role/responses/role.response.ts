import { Expose, Exclude, Type } from 'class-transformer';
import { Role, RoleTypes } from '@prisma/client';
import { PermissionResponse } from './permission.response';

export class RoleResponse implements Role {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  type: RoleTypes;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
  @Expose()
  @Type(() => PermissionResponse)
  permissions: PermissionResponse[];
}
