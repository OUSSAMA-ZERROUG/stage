import { Module } from '@nestjs/common';

import { PersonController } from 'src/routes/person/person.controller';
import { PersonService } from 'src/routes/person/person.service';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
