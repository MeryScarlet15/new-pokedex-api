import { Validator } from 'class-validator';

// EMAIL
export const isValidEmail = (mail) => {
  const validator = new Validator();
  return validator.isEmail(mail);
};
