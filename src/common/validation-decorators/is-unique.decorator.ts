import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '@prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(value: any, args: ValidationArguments) {
    if (!value) return false;

    const target: string = args.constraints[0];

    let condition = { [args.property]: value };

    if (args.object['id']) {
      condition = {
        ...condition,
        NOT: { id: args.object['id'] },
      };
    }

    const foundRecords = await this.prismaService[target].count({ where: condition });

    return foundRecords === 0;
  }
}

export function IsUnique(entity: string, validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: IsUniqueConstraint,
    });
  };
}
