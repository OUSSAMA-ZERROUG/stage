import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/routes/user/user.module';

import { UserService } from 'src/routes/user/user.service';

import { PrismaModule } from 'src/prisma/prisma.module';

import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AtGuard, RolesGuard, RtGuard } from 'src/auth/guards';
import {
  AtStrategy,
  LdapStrategy,
  RtStrategy,
} from 'src/auth/strategy';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    LdapStrategy,
    AtGuard,
    RtGuard,
    RolesGuard,
    UserService,
  ],
})
export class AuthModule {}
