import { SetMetadata } from '@nestjs/common';

export const CheckExternalAgent = (value: string) =>
  SetMetadata('externalAgent', value);
