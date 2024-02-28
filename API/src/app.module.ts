import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { ActionModule } from 'src/routes/action/action.module';
import { EquipmentModule } from 'src/routes/equipment/equipment.module';
import { ImpactModule } from 'src/routes/impact/impact.module';
import { PersonModule } from 'src/routes/person/person.module';
import { RappelModule } from 'src/routes/rappel/rappel.module';
import { UserModule } from 'src/routes/user/user.module';

import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TasksModule } from 'src/tasks/tasks.module';

import configuration from 'src/config/configuration';

@Module({
  imports: [
    ActionModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [configuration],
    }),
    EquipmentModule,
    ImpactModule,
    PersonModule,
    PrismaModule,
    RappelModule,
    ScheduleModule.forRoot(),
    TasksModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
