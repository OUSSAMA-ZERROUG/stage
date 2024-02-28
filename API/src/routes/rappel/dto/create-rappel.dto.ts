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
  ValidateIf,
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

export class CreateRappelDto {
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
  readonly notification?: string;

  @IsString()
  @IsNotEmpty()
  readonly details: string;

  @IsBoolean()
  @ValidateIf((_, value) => value !== null)
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

  @IsNotEmpty()
  readonly gardeName: GardeType;

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

  @IsNotEmpty()
  @IsString()
  readonly actionsCorrectives: string;

  @IsNotEmpty()
  @IsString()
  readonly actionsPreventives: string;

  @IsNotEmpty()
  @IsString()
  readonly equipmentTag: string;

  @IsArray()
  readonly interventionPersons: InterventionPersonDto[];

  @IsOptional()
  @IsObject()
  readonly lmra?: lmraType;
}
