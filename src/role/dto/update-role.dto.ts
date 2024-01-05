import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsInt } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsInt()
  id: number;
}
