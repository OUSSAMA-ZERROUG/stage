import { Controller, Get } from '@nestjs/common';

import { PersonService } from 'src/routes/person/person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async findAll() {
    return this.personService.findAll();
  }

  @Get('test')
  async test() {
    return this.personService.test();
  }
}
