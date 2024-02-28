import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { ImpactController } from './impact.controller';
import { ImpactService } from './impact.service';

@Module({
  imports: [PrismaModule],
  controllers: [ImpactController],
  providers: [ImpactService],
  exports: [ImpactService],
})
export class ImpactModule {}
