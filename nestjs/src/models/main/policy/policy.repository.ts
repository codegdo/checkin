import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Policy } from './policy.entity';

@EntityRepository(Policy)
export class PolicyRepository extends Repository<Policy> { }