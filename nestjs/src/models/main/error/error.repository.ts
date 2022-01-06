import { EntityRepository, Repository } from 'typeorm';
import { ErrorEntity } from './error.entity';

@EntityRepository(ErrorEntity)
export class ErrorRepository extends Repository<ErrorEntity> { }