import { Injectable } from '@nestjs/common';
import { BaseService } from '@app/common/base.sevice';
import { VerificationCode } from '@prisma/client';
import { CreateVerificationCodeDto } from './dto/create-verification-code.dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class VerificationCodeService extends BaseService<
  VerificationCode,
  CreateVerificationCodeDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'verificationCode');
  }

  generateRandomCode(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
}
