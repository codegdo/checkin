import { EntityRepository, Repository } from 'typeorm';
import { Subscription } from './subscription.entity';

@EntityRepository(Subscription)
export class SubscriptionRepository extends Repository<Subscription> { }
