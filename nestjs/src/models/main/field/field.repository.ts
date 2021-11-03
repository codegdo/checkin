import { EntityRepository, Repository } from 'typeorm';
import { Field } from './field.entity';

@EntityRepository(Field)
export class FieldRepository extends Repository<Field> { }