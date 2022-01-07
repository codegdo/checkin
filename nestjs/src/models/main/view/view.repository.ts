import { EntityRepository, Repository } from 'typeorm';
import { View } from './view.entity';

@EntityRepository(View)
export class ViewRepository extends Repository<View> { }