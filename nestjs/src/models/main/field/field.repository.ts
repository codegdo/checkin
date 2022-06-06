import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Field } from './field.entity';

@EntityRepository(Field)
export class FieldRepository extends Repository<Field> { }