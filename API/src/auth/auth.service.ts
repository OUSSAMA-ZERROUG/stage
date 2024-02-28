import * as argon from 'argon2';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/routes/user/user.service';

import { LoginDto } from 'src/auth/dto';
import { JwtPayload, Tokens, User } from 'src/auth/types';

@Injectable({})
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  // async signin(dto: LoginDto): Promise<Tokens> {
  //   const user = await this.userService.findOneByUsername(
  //     dto.username,
  //   );

  //   if (!user) {
  //     throw new ForbiddenException('Credentials incorrect');
  //   }

  //   const pwMatches = await argon.verify(user.hash, dto.password);
  //   if (!pwMatches) {
  //     throw new ForbiddenException('Credentials incorrect');
  //   }

  //   const tokens = await this.signToken(
  //     user.id,
  //     user.username,
  //     user.role.name,
  //   );
  //   await this.updateRtHash(user.id, tokens.refresh_token);
  //   return tokens;
  // }

  // async signout(userId: number): Promise<void> {
  //   const user = await this.userService.deleteRtHash(userId);
  //   if (user.rtHash === '' && user) return;
  //   throw new ForbiddenException(
  //     'An error occurred while signing out',
  //   );
  // }

  // async refreshTokens(userId: number, rt: string): Promise<Tokens> {
  //   const user = await this.userService.findOneById(userId);

  //   if (!user) {
  //     throw new ForbiddenException('Access denied');
  //   }

  //   const pwMatches = await argon.verify(user.rtHash, rt);
  //   if (!pwMatches) {
  //     throw new ForbiddenException('Invalid refresh token');
  //   }

  //   const tokens = await this.signToken(
  //     user.id,
  //     user.username,
  //     user.role.name,
  //   );
  //   await this.updateRtHash(user.id, tokens.refresh_token);
  //   return tokens;
  // }

  async signToken(
    userId: number,
    username: string,
    roleName: string,
  ): Promise<Tokens> {
    const payload: JwtPayload = {
      sub: userId,
      username,
      roleName,
    };
    const atSecret = this.config.get<string>('jwt.access.secret');
    const rtSecret = this.config.get<string>('jwt.refresh.secret');

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '1h',
        secret: atSecret,
      }),
      this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: rtSecret,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  // async updateRtHash(userId: number, rt: string): Promise<void> {
  //   const rtHash = await argon.hash(rt);
  //   await this.userService.updateOneById(userId, {
  //     rtHash,
  //   });
  // }

  // async validateUser(
  //   username: string,
  //   password: string,
  // ): Promise<Nullable<UserWithRoleAndPerson>> {
  //   const user = await this.userService.findOneByUsername(username);

  //   if (!user) {
  //     return null;
  //   }

  //   const pwMatches = await argon.verify(user.hash, password);
  //   if (!pwMatches) {
  //     return null;
  //   }

  //   return user;
  // }
}
