import { EntityRepository, Repository } from 'typeorm';
import { Store } from './store.entity';

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> { }