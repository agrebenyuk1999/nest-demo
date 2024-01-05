import { Expose, Exclude } from 'class-transformer';
import { Permission } from '@prisma/client';

export class PermissionResponse implements Permission {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  description: string;
  @Expose()
  permission_group_id: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}
