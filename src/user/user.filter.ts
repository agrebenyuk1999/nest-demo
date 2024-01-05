import { Injectable } from '@nestjs/common';
import { BaseFilter } from '../common/filters/base.filter';

@Injectable()
export class UserFilter extends BaseFilter {}
