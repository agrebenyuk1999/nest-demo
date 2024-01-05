import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsRelationsExist } from '../../common/validation-decorators/relations-exist.decorator';
import { IsUnique } from '../../common/validation-decorators/is-unique.decorator';

enum UserStatus {
  WORKING,
  NOT_WORKING,
  TEMPORARILY_NOT_WORKING,
}

export class CreateUserDto {
  @IsOptional()
  @IsEmail()
  @IsUnique('user', { message: 'Користувач з таким email вже існує' })
  email?: string;
  @IsString()
  @Length(10, 10)
  @IsUnique('user', { message: 'Користувач з таким телефоном вже існує' })
  phone: string;
  @IsString()
  @MinLength(4)
  password: string;
  @IsString()
  @MaxLength(128)
  name: string;
  @IsString()
  @MaxLength(128)
  surname: string;
  @IsOptional()
  @IsString()
  @MaxLength(128)
  middle_name?: string;
  @IsInt()
  personnel_number: number;
  @IsEnum(UserStatus)
  status: UserStatus;
  @IsRelationsExist('role', { message: 'Relations not found' })
  roles: number[];
  @IsNumber()
  @IsRelationsExist('company', { message: 'Relations not found' })
  company_id: number;
}
