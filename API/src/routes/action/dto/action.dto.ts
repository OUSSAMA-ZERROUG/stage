import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ActionType } from 'src/constants';

export class ActionDto {
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @IsNotEmpty()
  readonly type: ActionType;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
