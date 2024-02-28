import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { EquipmentDto } from './dto';

@Injectable({})
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async getEquipment(tag: string) {
    let equipment = await this.prisma.equipment.findFirst({
      where: {
        tag,
      },
    });

    // if (!equipment) {
    //   //request to the other database
    //   equipment = await this.getEquipmentInSecondDatabase(tag);
    //   if (!equipment) {
    //     throw new NotFoundException('No equipment found');
    //   }
    //   throw new NotImplementedException(
    //     'Not implemented yet. We will need to map the equipment from the other database to our database',
    //   );
    // }

    return equipment;
  }

  async getEquipmentInSecondDatabase(tag: string) {
    return null;
  }

  async updateOrCreate(dto: EquipmentDto) {
    const equipment = await this.prisma.equipment.upsert({
      where: { Id_equipment: dto.id },
      update: dto,
      create: dto,
    });

    return equipment;
  }
}
