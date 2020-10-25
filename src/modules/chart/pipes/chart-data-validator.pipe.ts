import * as yup from 'yup';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ChartDataValidatorPipe implements PipeTransform {
  async transform(values: any) {
    const schema = yup.object().shape({
      firstName: yup.string().required('Fill with your first name'),
      lastName: yup.string().required('Fill with your last name'),
      participation: yup
        .number()
        .min(1, 'Participation must be over 1%')
        .max(100, 'Participation must be under 100%'),
      color: yup.string().required(),
    });

    await schema.validate(values).catch(err => {
      throw new BadRequestException(err.message);
    });

    return values;
  }
}
