import { ValidatorConstraintInterface, ValidatorConstraint, ValidationArguments } from 'class-validator';

@ValidatorConstraint()
export class CustomEmailArray implements ValidatorConstraintInterface {
  validate(emailarray: string[], args: ValidationArguments) {
    for (let i = 0; i < emailarray.length; i++) {
      if (!validateEmail(emailarray[i])) return false;
    }
    return true;
  }
}

const validateEmail = (email: string) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
