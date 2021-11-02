import { EntityRepository, Repository } from 'typeorm';
import { Object } from './object.entity';

@EntityRepository(Object)
export class ObjectRepository extends Repository<Object> { }