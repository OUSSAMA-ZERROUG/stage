import Strategy from 'passport-ldapauth';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LdapStrategy extends PassportStrategy(Strategy, 'ldap') {
  constructor(private configService: ConfigService) {
    super(configService.get('ldap'));
  }

  validate<T>(user: T): T {
    return user; // or transform the user object if needed
  }
}
