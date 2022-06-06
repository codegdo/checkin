import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Level } from './level.entity';

@EntityRepository(Level)
export class LevelRepository extends Repository<Level> { }