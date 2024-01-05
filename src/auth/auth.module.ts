import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { PasswordService } from '../common/password.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BullModule } from '@nestjs/bull';
import { VerifyConsumer } from './consumers/verify.consumer';
import { VerificationCodeService } from './verification-code/verification-code.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    MailModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        const secret = config.get('JWT_SECRET');

        return {
          global: true,
          secret: secret,
          signOptions: { expiresIn: '25h' },
        };
      },
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'verify',
    }),
  ],
  providers: [
    AuthService,
    PasswordService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    VerifyConsumer,
    VerificationCodeService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
