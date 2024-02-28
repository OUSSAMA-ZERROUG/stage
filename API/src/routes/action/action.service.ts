import { Injectable } from '@nestjs/common';

import { ActionDto } from 'src/routes/action/dto/';

import { ActionType } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActionService {
  constructor(private prisma: PrismaService) {}

  async updateOrCreateMany(actionsDto: ActionDto[]) {
    const actions = actionsDto.map(async action =>
      this.prisma.action.upsert({
        where: { Id_action: action.id || 0 },
        update: {
          actionTypeName: action.type,
          description: action.description,
        },
        create: {
          actionTypeName: action.type,
          description: action.description,
        },
      }),
    );
    return Promise.all(actions);
  }

  async updateOrCreateManyAndConnect(
    actionsPreventives: string,
    actionsCorrectives: string,
    idRappel: number,
  ) {
    this.prisma.have_actions.deleteMany({
      where: {
        Id_rappel: idRappel,
      },
    });

    await this.prisma.action.create({
      data: {
        actionTypeName: ActionType.preventive,
        description: actionsPreventives,
        have_actions: {
          create: {
            rappel: {
              connect: {
                Id_rappel: idRappel,
              },
            },
          },
        },
      },
    });

    await this.prisma.action.create({
      data: {
        actionTypeName: ActionType.corrective,
        description: actionsCorrectives,
        have_actions: {
          create: {
            rappel: {
              connect: {
                Id_rappel: idRappel,
              },
            },
          },
        },
      },
    });
  }
}
