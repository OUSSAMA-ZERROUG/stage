import { ConfigFile } from 'src/types';

export default () =>
  ({
    database: {
      primary: {
        url: process.env.DATABASE_URL,
      },
      secondary: {
        url: process.env.DATABASE_URL_SECONDARY,
      },
    },
    ldap: {
      server: {
        url: process.env.LDAP_URL || 'ldap://default-ldap-server',
        bindDN: process.env.LDAP_BIND_DN,
        bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
        searchBase: process.env.LDAP_SEARCH_BASE,
        searchFilter:
          process.env.LDAP_SEARCH_FILTER ||
          '(sAMAccountName={{username}})',
      },
    },
    jwt: {
      access: {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      },
    },
  } as ConfigFile);
