import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class InterventionPersonDto {
  @IsNumber()
  @IsNotEmpty()
  readonly idPerson: number;

  @IsDate()
  @IsNotEmpty()
  readonly startAt: Date;

  @IsDate()
  @IsNotEmpty()
  readonly endAt: Date;
}
