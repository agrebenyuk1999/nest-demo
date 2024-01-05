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
export class IsDivisionExistConstraint implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(value: any, args: ValidationArguments) {
    const company = await this.prismaService.company.findUnique({
      where: { id: (args.object as any).company_id },
    });

    return company?.divisions.includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `Division is not valid.`;
  }
}

export function IsDivisionExist(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      name: 'IsDivisionExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDivisionExistConstraint,
    });
  };
}
