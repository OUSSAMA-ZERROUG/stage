import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { ZodObject } from 'zod';

@ValidatorConstraint({ name: 'isSchema', async: false })
export class IsSchemaConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    try {
      const schema = args.constraints[0] as ZodObject<any>;
      schema.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'the schema is not valid';
  }
}

export function IsSchema(schema: ZodObject<any>) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isSchema',
      target: object.constructor,
      propertyName: propertyName,
      options: { message: '' },
      constraints: [schema],
      validator: IsSchemaConstraint,
    });
  };
}
