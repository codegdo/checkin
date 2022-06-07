import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { ErrorEntity } from './error.entity';

@EntityRepository(ErrorEntity)
export class ErrorRepository extends Repository<ErrorEntity> {

}