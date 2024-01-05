import { ArrayMinSize, ArrayUnique, IsArray, IsString, Max, MaxLength, Min } from 'class-validator';
import { IsUnique } from '../../common/validation-decorators/is-unique.decorator';

export class CreateCompanyDto {
  @IsString()
  @MaxLength(128)
  @IsUnique('company', { message: 'КП з такою назвою вже існує' })
  name: string;
  @IsArray()
  @Min(1, { each: true })
  @Max(10, { each: true })
  @ArrayMinSize(1)
  @ArrayUnique()
  divisions: number[];
}
