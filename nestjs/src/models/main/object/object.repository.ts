import { EntityRepository, Repository } from 'typeorm';
import { DBObject } from './object.entity';

@EntityRepository(DBObject)
export class ObjectRepository extends Repository<DBObject> { }