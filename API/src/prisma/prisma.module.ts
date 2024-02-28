import { Module } from '@nestjs/common';

//import { PrismaSecondaryService } from 'src/prisma/prisma-secondary.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    PrismaService, //PrismaSecondaryService
  ],
  exports: [
    PrismaService, //PrismaSecondaryService
  ],
})
export class PrismaModule {}
