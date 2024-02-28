import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import {
  GetCurrentUser,
  GetCurrentUserId,
} from 'src/auth/decorators';
import { LoginDto } from 'src/auth/dto';
import { AtGuard, LdapGuard, RtGuard } from 'src/auth/guards';
import { LdapExceptionFilter } from 'src/auth/validators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LdapGuard)
  @UseFilters(new LdapExceptionFilter())
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: LoginDto) {
    // return this.authService.signin(dto);
  }

  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(@GetCurrentUserId() userId: number) {
    // return this.authService.signout(userId);
  }

  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') rt: string,
  ) {
    // return this.authService.refreshTokens(userId, rt);
  }
}
