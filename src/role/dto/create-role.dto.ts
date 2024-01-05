import { IsArray, IsEnum, IsString, MaxLength } from 'class-validator';
import { RoleTypes } from '@prisma/client';
import { IsRelationsExist } from '../../common/validation-decorators/relations-exist.decorator';

export class CreateRoleDto {
  @IsString()
  @MaxLength(128)
  name: string;
  @IsEnum(RoleTypes)
  type: RoleTypes;
  @IsArray()
  @IsRelationsExist('permission', { message: 'Relations not found' })
  permissions: number[];
}
