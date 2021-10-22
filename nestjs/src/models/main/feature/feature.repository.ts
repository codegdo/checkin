import { EntityRepository, Repository } from 'typeorm';
import { Feature } from './feature.entity';

@EntityRepository(Feature)
export class FeatureRepository extends Repository<Feature> { }