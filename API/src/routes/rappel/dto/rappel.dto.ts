import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { InterventionPersonDto } from 'src/routes/rappel/dto';

import {
  CategoryType,
  ContactRoleType,
  DeviationType,
  GardeType,
  ImpactType,
  InterventionType,
  lmraType,
} from 'src/constants';

import { ActionDto } from '../../action/dto/action.dto';
import { EquipmentDto } from '../../equipment/dto/equipment.dto';

export class RappelDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly id?: number;

  @IsDate()
  @IsNotEmpty()
  readonly startAt: Date;

  @IsDate()
  @IsNotEmpty()
  readonly endAt: Date;

  @IsString()
  @IsNotEmpty()
  readonly diffusion: string;

  @IsString()
  @IsNotEmpty()
  readonly contactInformation: string;

  @IsString()
  @IsNotEmpty()
  readonly notification: string;

  @IsString()
  @IsNotEmpty()
  readonly details: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly reccurence: boolean | null;

  @IsString()
  @IsNotEmpty()
  readonly cause: string;

  @IsNotEmpty()
  readonly preInterState: string;

  @IsNotEmpty()
  readonly postInterState: string;

  @IsNotEmpty()
  readonly interventionTypeName: InterventionType;

  @IsNotEmpty()
  readonly categoryName: CategoryType;

  @IsNotEmpty()
  readonly contactRole: ContactRoleType;

  @IsArray({ each: true })
  @Type(() => ActionDto)
  readonly actions: ActionDto[];

  @IsArray({ each: true })
  @MinLength(1)
  @MaxLength(2)
  @Type(() => InterventionPersonDto)
  readonly interventionPersons: InterventionPersonDto[];

  @IsNotEmpty()
  readonly gardeName: GardeType;

  @IsObject()
  @IsNotEmptyObject()
  @Type(() => EquipmentDto)
  readonly equipment: EquipmentDto;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly guardPerson: number;

  @IsOptional()
  @IsString()
  readonly subRole?: string;

  @IsArray()
  readonly impacts: ImpactType[];

  @IsNotEmpty()
  readonly deviation: DeviationType[];

  @IsOptional()
  @IsObject()
  readonly lmra?: lmraType;
}
