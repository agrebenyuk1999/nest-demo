import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyCodeDto {
  @ApiProperty()
  @IsNumber()
  code: number;
  @ApiProperty()
  @IsString()
  secret: string;
}
