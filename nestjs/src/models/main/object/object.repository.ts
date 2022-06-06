import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { ObjectEntity } from './object.entity';

@EntityRepository(ObjectEntity)
export class ObjectRepository extends Repository<ObjectEntity> { }