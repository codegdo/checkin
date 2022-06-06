import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Location } from './location.entity';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> { }