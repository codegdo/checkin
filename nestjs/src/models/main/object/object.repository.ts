import { EntityRepository, Repository } from 'typeorm';
import { ObjectEntity } from './object.entity';

@EntityRepository(ObjectEntity)
export class ObjectRepository extends Repository<ObjectEntity> { }