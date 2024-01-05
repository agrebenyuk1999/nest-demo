import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: Number,
  })
  @Matches(/^0\d{9}$/, { message: 'Логін повинен бути в форматі номеру телефона' })
  phone: string;
  @ApiProperty()
  @IsString()
  password: string;
}
