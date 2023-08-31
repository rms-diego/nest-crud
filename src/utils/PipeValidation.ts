import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError, ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const formatErrorMessage = error.format();

        const formatKeys = Object.keys(formatErrorMessage).reduce(
          (acc, currentKey) => {
            if (currentKey !== '_errors') {
              acc.push(currentKey);
              return acc;
            }
            return acc;
          },
          [],
        );

        throw new BadRequestException({
          missingFields: formatKeys,
          error: formatErrorMessage,
        });
      }

      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
