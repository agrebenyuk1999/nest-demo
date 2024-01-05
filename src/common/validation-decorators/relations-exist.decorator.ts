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
export class IsRelationsExistConstraint implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(values: number[] | number, args: ValidationArguments) {
    if (!values) return false;

    const relation: string = args.constraints[0];

    if (!Array.isArray(values)) {
      values = [values];
    }

    const foundRelations = await this.prismaService[relation].count({
      where: {
        id: { in: values },
      },
    });

    return foundRelations === values.length;
  }
}

export function IsRelationsExist(relation: string, validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      name: 'IsRelationsExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [relation],
      validator: IsRelationsExistConstraint,
    });
  };
}
