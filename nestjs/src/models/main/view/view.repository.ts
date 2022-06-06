import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { View } from './view.entity';

@EntityRepository(View)
export class ViewRepository extends Repository<View> { }