import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger, LoggerService, NotFoundException } from '@nestjs/common';

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
        throw new NotFoundException('no_data_found');
      case '23505':
        this.logger.warn(`${error.message}`, error);
        throw new ConflictException('unique_violation');
      default:
        this.logger.error(`${error.message}`, error);
        throw new InternalServerErrorException(error.code);
    }
  }
}
