import { Controller, Get, Param } from '@nestjs/common';

import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  @Get(':tag')
  findOne(@Param('tag') tag: string) {
    return this.equipmentService.getEquipment(tag);
  }
}
