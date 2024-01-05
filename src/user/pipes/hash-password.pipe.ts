import { PipeTransform, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: CreateUserDto) {
    if (value.password) {
      value.password = await bcrypt.hash(value.password, 10);
    }

    return value;
  }
}
