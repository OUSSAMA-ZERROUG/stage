import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//import { PrismaClient } from '@prisma-secondary/prisma/client';

// @Injectable()
// export class PrismaSecondaryService extends PrismaClient {
//   constructor(config: ConfigService) {
//     super({
//       datasources: {
//         db: {
//           url: config.get('database.secondary.url'),
//         },
//       },
//     });
//   }
// }
