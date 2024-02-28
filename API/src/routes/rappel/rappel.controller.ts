import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateRappelDto, EditRappelDto } from './dto';
import { ParseDatePipe } from './pipes/ParseDatePipe.pipe';
import { RappelService } from './rappel.service';

@Controller('rappels')
export class RappelController {
  constructor(private rappelService: RappelService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateRappelDto) {
    return this.rappelService.updateOrCreate(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.rappelService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('search')
  getByDate(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
    @Query('building') building: string | null,
    @Query('guardPerson') guardPerson: string | null,
  ) {
    return this.rappelService.search(
      start,
      end,
      building,
      guardPerson ? parseInt(guardPerson) : null,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) rappelId: number) {
    return this.rappelService.getById(rappelId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) rappelId: number,
    @Body() dto: EditRappelDto,
  ) {
    return this.rappelService.updateOrCreate(dto, rappelId);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) rappelId: number) {
    return this.rappelService.delete(rappelId);
  }
}
