import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { ActionModule } from '../action/action.module';
import { EquipmentModule } from '../equipment/equipment.module';
import { ImpactModule } from '../impact/impact.module';
import { RappelController } from './rappel.controller';
import { RappelService } from './rappel.service';

@Module({
  controllers: [RappelController],
  providers: [RappelService],
  imports: [
    PrismaModule,
    ActionModule,
    EquipmentModule,
    ImpactModule,
  ],
})
export class RappelModule {}
