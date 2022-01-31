import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger, LoggerService, NotFoundException } from '@nestjs/common';
import { ErrorMessageEnum } from './error.type';

@Injectable()
export class ErrorService {

  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) { }


  handleError(error) {
    switch (error.code) {
      case 'P0002':
        this.logger.warn(`${error.message}`, error);
        throw new NotFoundException(ErrorMessageEnum.NOT_FOUND);
      case '23505':
        this.logger.warn(`${error.message}`, error);
        throw new ConflictException(ErrorMessageEnum.UNIQUE_VIOLATION);
      default:
        this.logger.error(`${error.message}`, error);
        throw new InternalServerErrorException(error.code);
    }
  }
}
