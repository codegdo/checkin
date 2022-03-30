import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  private trim(values) {
    Object.keys(values).forEach((key) => {
      if (typeof values[key] === 'object') {
        values[key] = this.trim(values[key]);
      } else if (typeof values[key] === 'string' && key !== 'password') {
        values[key] = values[key].trim();
      }
    });

    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type } = metadata;

    if (typeof values === 'object' && type === 'body') {
      return this.trim(values);
    }

    throw new BadRequestException('Trim Validation failed');
  }
}
