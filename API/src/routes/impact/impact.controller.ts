import { Controller, Get } from '@nestjs/common';

import { ImpactService } from './impact.service';

@Controller('impacts')
export class ImpactController {
  constructor(private impactService: ImpactService) {}

  @Get()
  findAll() {
    return this.impactService.getImpacts();
  }
}
