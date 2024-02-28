import { Module } from '@nestjs/common';

import { ActionController } from 'src/routes/action/action.controller';
import { ActionService } from 'src/routes/action/action.service';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ActionController],
  providers: [ActionService],
  imports: [PrismaModule],
  exports: [ActionService],
})
export class ActionModule {}
