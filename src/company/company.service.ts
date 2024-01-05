import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { BaseService } from '../common/base.sevice';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyResponse } from './responses/company.response';
import { CompanyFilter } from './company.filter';

@Injectable()
export class CompanyService extends BaseService<Company, CreateCompanyDto, UpdateCompanyDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'company');
  }

  filterClass = CompanyFilter;
  responseClass = CompanyResponse;
}
