import { Injectable, NotFoundException } from '@nestjs/common';

import { rappel } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { WithOptionalId } from 'src/types';

import { ActionService } from '../action/action.service';
import { ImpactService } from '../impact/impact.service';
import {
  BaseRappelDto,
  CreateRappelDto,
  EditRappelDto,
  RappelDto,
} from './dto';

@Injectable()
export class RappelService {
  constructor(
    private prisma: PrismaService,
    private action: ActionService,
    private impact: ImpactService,
  ) {}

  async getById(id: number): Promise<rappel> {
    const rappel = await this.prisma.rappel.findUnique({
      where: {
        Id_rappel: id,
      },
      include: {
        interventionPerson: {
          include: {
            person: true,
          },
        },
        impact: true,
        deviation: true,
        equipment: true,
        guardPerson: true,
        lmra: true,
        have_actions: {
          select: {
            action: true,
          },
        },
      },
    });
    if (!rappel)
      throw new NotFoundException(`Rappel ${id} not found`);
    return rappel;
  }

  async delete(id: number) {
    await this.prisma.have_actions.deleteMany({
      where: {
        Id_rappel: id,
      },
    });

    await this.prisma.impact.deleteMany({
      where: {
        Id_rappel: id,
      },
    });

    await this.prisma.deviation.deleteMany({
      where: {
        Id_rappel: id,
      },
    });

    await this.prisma.interventionPerson.deleteMany({
      where: {
        Id_rappel: id,
      },
    });

    await this.prisma.lmra.deleteMany({
      where: {
        Id_rappel: id,
      },
    });

    await this.prisma.rappel.delete({
      where: {
        Id_rappel: id,
      },
    });
  }

  async search(
    start: Date,
    end: Date,
    building: string | null,
    id_guardPerson: number | null,
  ) {
    console.log(start, end, building, id_guardPerson);
    return this.prisma.rappel.findMany({
      where: {
        startAt: {
          gte: new Date(start),
        },
        endAt: {
          lte: new Date(end),
        },
        equipment: {
          building: building ? building : undefined,
        },
        guardPerson: {
          Id_person: id_guardPerson ? id_guardPerson : undefined,
        },
      },
      include: {
        interventionPerson: {
          include: {
            person: true,
          },
        },
        impact: true,
        deviation: true,
        equipment: true,
        guardPerson: true,
        lmra: true,
        have_actions: {
          select: {
            action: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<rappel[]> {
    return this.prisma.rappel.findMany({
      include: {
        interventionPerson: {
          include: {
            person: true,
          },
        },
        impact: true,
        deviation: true,
        equipment: true,
        have_actions: {
          select: {
            action: true,
          },
        },
        guardPerson: true,
        lmra: true,
      },
    });
  }

  async updateOrCreate(dto: CreateRappelDto, id?: number) {
    let rappelId = id;
    if (!id) {
      rappelId = 0;
    }

    const equipmentID = await this.prisma.equipment.findFirst({
      where: {
        tag: dto.equipmentTag,
      },
      select: {
        Id_equipment: true,
      },
    });

    const rappel = await this.prisma.rappel.upsert({
      where: { Id_rappel: rappelId },
      update: {
        cause: dto.cause,
        categoryName: dto.categoryName,
        contactInformation: dto.contactInformation,
        contactRoleName: dto.contactRole,
        details: dto.details,
        diffusion: dto.diffusion,
        equipment: {
          connect: {
            Id_equipment: equipmentID?.Id_equipment,
          },
        },
        endAt: dto.endAt,
        interventionTypeName: dto.interventionTypeName,
        notification: dto.notification,
        postInterState: dto.postInterState,
        preInterState: dto.preInterState,
        reccurence: dto.reccurence,
        startAt: dto.startAt,
        subRoleName: dto.subRole,
      },
      create: {
        cause: dto.cause,
        categoryName: dto.categoryName,
        contactInformation: dto.contactInformation,
        contactRoleName: dto.contactRole,
        details: dto.details,
        diffusion: dto.diffusion,
        equipment: {
          connect: {
            Id_equipment: equipmentID?.Id_equipment,
          },
        },
        endAt: dto.endAt,
        guardPerson: {
          connect: {
            Id_person: parseInt(dto.guardPerson.toString()), //TODO: guardPersonId
          },
        },
        interventionTypeName: dto.interventionTypeName,
        notification: dto.notification,
        postInterState: dto.postInterState,
        preInterState: dto.preInterState,
        reccurence: dto.reccurence,
        startAt: dto.startAt,
        subRoleName: dto.subRole,
      },
    });

    await this.action.updateOrCreateManyAndConnect(
      dto.actionsCorrectives,
      dto.actionsPreventives,
      rappel.Id_rappel,
    );

    await this.impact.updateOrCreateManyAndConnect(
      dto.impacts,
      rappel.Id_rappel,
    );

    await this.impact.updateOrCreateManyDeviationAndConnect(
      dto.deviation,
      rappel.Id_rappel,
    );

    await this.prisma.interventionPerson.deleteMany({
      where: {
        Id_rappel: rappel.Id_rappel,
      },
    });
    for (const interventionPerson of dto.interventionPersons) {
      await this.prisma.interventionPerson.create({
        data: {
          Id_person: interventionPerson.idPerson,
          startAt: interventionPerson.startAt,
          endAt: interventionPerson.endAt,
          Id_rappel: rappel.Id_rappel,
        },
      });
    }

    if (dto.lmra) {
      await this.prisma.lmra.upsert({
        where: { Id_rappel: rappel.Id_rappel },
        update: {
          ...dto.lmra,
        },
        create: {
          ...dto.lmra,
          Id_rappel: rappel.Id_rappel,
        },
      });
    }

    return rappel;
  }

  transformBaseDtoToRappelDto(
    value: WithOptionalId<BaseRappelDto>,
  ): RappelDto {
    return {
      id: value.id,
      actions: value.actions,
      details: value.diagnosticDetails,
      cause: value.diagnosticCause,
      preInterState: value.preInterventionState,
      postInterState: value.postInterventionState,
      reccurence: value.reccurence,
      impacts: value.impacts,
      deviation: value.deviation,
      lmra: value.lmra,
      equipment: {
        tag: value.equipmentTag,
        site: value.equipmentSite,
        building: value.equipmentBuilding,
        family: value.equipmentFamily,
        subfamily: value.equipmentSubFamily,
        description: value.equipmentDescription,
        costCenter: value.equipmentCostCenter,
        functionalLocation: value.equipmentFunctionalLocation,
        plantSection: value.equipmentPlantSection,
      },
      interventionPersons: value.interventionPersons,
      gardeName: value.garde,
      startAt: value.interventionStart,
      endAt: value.interventionEnd,
      diffusion: value.diffusion,
      notification: value.notification,
      categoryName: value.category,
      contactInformation: value.contactInformations,
      contactRole: value.contactRole,
      subRole: value.subRole,
      interventionTypeName: value.interventionType,
      guardPerson: value.guardPersonId,
    } as RappelDto;
  }
}
