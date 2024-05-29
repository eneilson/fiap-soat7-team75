import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCpfOrCnpjConstraint implements ValidatorConstraintInterface {
  validate(document: string): boolean {
    const docNumber = `${document}`.replace(/\D/g, '');

    // todo: enhance document validation
    if (docNumber.length === 11) {
      return /^\d{11}$/.test(docNumber);
    }
    if (docNumber.length === 11) {
      return /^\d{14}$/.test(docNumber);
    }

    return false;
  }

  defaultMessage(): string {
    return 'document must be a valid CPF or CNPJ';
  }
}

export function IsCpfOrCnpj(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfOrCnpjConstraint,
    });
  };
}
