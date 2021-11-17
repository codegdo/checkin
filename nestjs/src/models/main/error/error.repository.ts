import { EntityRepository, Repository } from 'typeorm';
import { LogError } from './error.entity';

@EntityRepository(LogError)
export class ErrorRepository extends Repository<LogError> { }