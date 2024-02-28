import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EquipmentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly tag: string;

  @IsString()
  @IsNotEmpty()
  readonly site: string;

  @IsString()
  @IsNotEmpty()
  readonly building: string;

  @IsString()
  @IsNotEmpty()
  readonly family: string;

  @IsString()
  @IsNotEmpty()
  readonly subfamily: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly costCenter: string;

  @IsString()
  @IsNotEmpty()
  readonly functionalLocation: string;

  @IsString()
  @IsNotEmpty()
  readonly plantSection: string;
}
