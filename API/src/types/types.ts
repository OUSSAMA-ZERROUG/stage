import { Prisma } from '@prisma/client';

export type ConfigFile = {
  database: {
    primary: {
      url: string;
    };
    secondary: {
      url: string;
    };
  };
  ldap: {
    server: {
      url: string;
      bindDN: string;
      bindCredentials: string;
      searchBase: string;
      searchFilter: string;
    };
  };
  jwt: {
    access: {
      secret: string;
      expiresIn: string;
    };
    refresh: {
      secret: string;
      expiresIn: string;
    };
  };
};

export type WithOptionalId<T> = T & { id?: string };

export type FullRappel = Prisma.rappelGetPayload<{
  include: {
    interventionPerson: {
      include: {
        person: true;
      };
    };
    impact: true;
    deviation: true;
    equipment: true;
    guardPerson: true;
    lmra: true;
    have_actions: {
      select: {
        action: true;
      };
    };
  };
}>;
