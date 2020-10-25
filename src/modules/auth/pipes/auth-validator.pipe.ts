import * as yup from 'yup';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class AuthValidatorPipe implements PipeTransform {
  async transform(values: any) {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup.string().min(6, 'Password must at least 6 characters'),
    });

    await schema.validate(values).catch(err => {
      throw new BadRequestException(err.message);
    });

    return values;
  }
}
