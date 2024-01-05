import { Expose, Exclude } from 'class-transformer';
import { Company } from '@prisma/client';

export class CompanyResponse implements Company {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  divisions: number[];
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}
