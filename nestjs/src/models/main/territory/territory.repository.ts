import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Territory } from './territory.entity';

@EntityRepository(Territory)
export class TerritoryRepository extends Repository<Territory> { }
