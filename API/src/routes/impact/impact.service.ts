import { Injectable, NotFoundException } from '@nestjs/common';

import { impact } from '@prisma/client';

import { DeviationType, ImpactType } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class ImpactService {
  constructor(private prisma: PrismaService) {}

  async getImpacts() {
    const impacts: impact[] = await this.prisma.impact.findMany();
    if (impacts.length === 0) {
      throw new NotFoundException('No impact found');
    }
    return impacts;
  }

  async updateOrCreateManyAndConnect(
    impactNames: ImpactType[],
    idRappel: number,
  ) {
    await this.prisma.impact.deleteMany({
      where: {
        Id_rappel: idRappel,
      },
    });
    for (const impactName of impactNames) {
      await this.prisma.impact.create({
        data: {
          impactName,
          rappel: {
            connect: {
              Id_rappel: idRappel,
            },
          },
        },
      });
    }
  }

  async updateOrCreateManyDeviationAndConnect(
    deviationNames: DeviationType[],
    idRappel: number,
  ) {
    await this.prisma.deviation.deleteMany({
      where: {
        Id_rappel: idRappel,
      },
    });
    for (const deviationName of deviationNames) {
      await this.prisma.deviation.create({
        data: {
          deviationName,
          rappel: {
            connect: {
              Id_rappel: idRappel,
            },
          },
        },
      });
    }
  }
}
