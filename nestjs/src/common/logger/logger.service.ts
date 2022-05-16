import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService as NestLoggerService,
  NotFoundException
} from '@nestjs/common';
import { LoggerMessageEnum } from './logger.type';

@Injectable()
export class LoggerService {
  constructor(
    @Inject(Logger)
    private readonly logger: NestLoggerService,
  ) { }

  handleError(error) {
    if (error.code) {
      switch (error.code) {
        case 'P0002':
          this.logger.warn(error);
          throw new NotFoundException(LoggerMessageEnum.NOT_FOUND);
        case '23505':
          this.logger.warn(error);
          throw new ConflictException(LoggerMessageEnum.UNIQUE_VIOLATION);
        default:
          this.logger.error(error);
          throw new InternalServerErrorException(LoggerMessageEnum.INTERNAL_SERVER_ERROR);
      }
    } else {
      this.logger.warn(error);
      throw error;
    }
  }
}
