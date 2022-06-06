import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Subscription } from './subscription.entity';

@EntityRepository(Subscription)
export class SubscriptionRepository extends Repository<Subscription> { }
