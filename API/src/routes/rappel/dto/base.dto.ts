import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Optional } from '@nestjs/common';

import { ActionDto } from 'src/routes/action/dto';

import {
  CategoryType,
  ContactRoleType,
  DeviationType,
  GardeType,
  ImpactType,
  InterventionType,
  StateType,
  lmraSchema,
  lmraType,
} from 'src/constants';

import { InterventionPersonDto } from '../dto';
import { IsSchema } from '../validator';

export class BaseRappelDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id?: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  guardPersonId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @ArrayMaxSize(2)
  @Optional()
  @Type(() => InterventionPersonDto)
  interventionPersons?: InterventionPersonDto[];

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  interventionStart: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  interventionEnd: Date;

  @IsNotEmpty()
  interventionType: InterventionType;

  @IsNotEmpty()
  garde: GardeType;

  @IsString()
  @IsNotEmpty()
  diffusion: string;

  @IsNotEmpty()
  contactRole: ContactRoleType;

  @IsString()
  @Optional()
  subRole?: string;

  @IsString()
  @IsNotEmpty()
  contactInformations: string;

  @IsString()
  @IsNotEmpty()
  notification: string;

  @IsNotEmpty()
  category: CategoryType;

  @IsString()
  @IsNotEmpty()
  equipmentTag: string;

  @IsString()
  @IsNotEmpty()
  equipmentSite: string;

  @IsString()
  @IsNotEmpty()
  equipmentBuilding: string;

  @IsString()
  @IsNotEmpty()
  equipmentFamily: string;

  @IsString()
  @IsNotEmpty()
  equipmentSubFamily: string;

  @IsString()
  @IsNotEmpty()
  equipmentDescription: string;

  @IsString()
  @IsNotEmpty()
  equipmentPlantSection: string;

  @IsString()
  @IsNotEmpty()
  equipmentFunctionalLocation: string;

  @IsString()
  @IsNotEmpty()
  equipmentCostCenter: string;

  @IsOptional()
  @Type(() => Object)
  @IsSchema(lmraSchema)
  lmra: lmraType | null;

  @IsString()
  @IsNotEmpty()
  diagnosticDetails: string;

  @IsNotEmpty()
  impacts: ImpactType[];

  @IsNotEmpty()
  deviation: DeviationType[];

  @IsNotEmpty()
  @IsBoolean()
  reccurence: boolean | null;

  @IsString()
  @IsNotEmpty()
  diagnosticCause: string;

  @IsNotEmpty()
  preInterventionState: StateType;

  @IsNotEmpty()
  postInterventionState: StateType;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => ActionDto)
  actions: ActionDto[];
}
