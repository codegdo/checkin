import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger, LoggerService, NotFoundException } from '@nestjs/common';
import { ErrorMessageEnum } from './error.type';

@Injectable()
export class ErrorService {

  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) { }


  handleError(error) {
    if (error.code) {
      switch (error.code) {
        case 'P0002':
          this.logger.warn(error);
          throw new NotFoundException(ErrorMessageEnum.NOT_FOUND);
        case '23505':
          this.logger.warn(error);
          throw new ConflictException(ErrorMessageEnum.UNIQUE_VIOLATION);
        default:
          this.logger.error(error);
          throw new InternalServerErrorException(ErrorMessageEnum.INTERNAL_SERVER_ERROR);
      }
    } else {
      this.logger.warn(error);
      throw error;
    }
  }
}
