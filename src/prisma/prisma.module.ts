import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IsUniqueConstraint } from '../common/validation-decorators/is-unique.decorator';
import { IsRelationsExistConstraint } from '../common/validation-decorators/relations-exist.decorator';
import { IsDivisionExistConstraint } from '@app/common/validation-decorators/is-division-exist.decorator';

@Global()
@Module({
  providers: [
    PrismaService,
    IsUniqueConstraint,
    IsRelationsExistConstraint,
    IsDivisionExistConstraint,
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
