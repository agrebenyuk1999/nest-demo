import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { RoleModule } from './role/role.module';
import { CompanyModule } from './company/company.module';
import { CitizenModule } from './citizen/citizen.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CompanyAuditListener } from './company/listeners/company-audit.listener';
import { RoleAuditListener } from './role/listeners/role-audit.listener';
import { ExternalAgentModule } from './external-agent/external-agent.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PageModule } from './page/page.module';
import { RouteModule } from './route/route.module';
import { HandbookModule } from './handbook/handbook.module';
import { GlossaryModule } from '@app/glossary/glossary.module';
import { GlossaryAuditListener } from '@app/glossary/listeners/glossary-audit.listener';
import { PrivilegeGroupModule } from '@app/privilege-group/privilege-group.module';
import { CitizenListener } from '@app/citizen/listeners/citizen.listener';
import { HttpModule } from '@nestjs/axios';
import { SubsystemModule } from '@app/subsustem/subsystem.module';
import { PrivilegeModule } from '@app/privilege/privilege.module';
import { TransportUnitModule } from '@app/transport-unit/transport-unit.module';
import { TransportUnityAuditListener } from '@app/transport-unit/listeners/transport-unity-audit.listener';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 3000,
        maxRedirects: 3,
      }),
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    MailModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static', 'public'),
    }),
    RoleModule,
    CompanyModule,
    EventEmitterModule.forRoot(),
    CitizenModule,
    ExternalAgentModule,
    HandbookModule,
    GlossaryModule,
    PageModule,
    RouteModule,
    PrivilegeModule,
    PrivilegeGroupModule,
    SubsystemModule,
    TransportUnitModule,
  ],
  controllers: [AppController],
  providers: [
    CompanyAuditListener,
    RoleAuditListener,
    GlossaryAuditListener,
    CitizenListener,
    TransportUnityAuditListener,
  ],
})
export class AppModule {}
