import { EntityRepository, Repository } from 'typeorm';
import { Territory } from './territory.entity';

@EntityRepository(Territory)
export class TerritoryRepository extends Repository<Territory> { }
