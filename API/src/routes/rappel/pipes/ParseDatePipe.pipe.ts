import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const date = Date.parse(value);
    if (isNaN(date))
      throw new BadRequestException(`Invalid date format: ${value}`);
    return date;
  }
}
