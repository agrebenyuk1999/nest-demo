import { Expose, Exclude } from 'class-transformer';
import { Role, User, UserStatus } from '@prisma/client';

export class UserResponse implements User {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Expose()
  phone: string;
  @Exclude()
  password: string;
  @Expose()
  name: string;
  @Expose()
  surname: string;
  @Expose()
  middle_name: string;
  @Expose()
  personnel_number: number;
  @Expose()
  status: UserStatus;
  @Expose()
  created_at: Date;
  @Expose()
  updated_at: Date;
  @Expose()
  deleted: Date;
  @Expose()
  roles: Role[];
  @Expose()
  company_id: number;
}
