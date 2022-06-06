import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Feature } from './feature.entity';

@EntityRepository(Feature)
export class FeatureRepository extends Repository<Feature> { }