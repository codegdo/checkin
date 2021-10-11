import { EntityRepository, Repository } from 'typeorm';
import { Policy } from './policy.entity';

@EntityRepository(Policy)
export class PolicyRepository extends Repository<Policy> { }