import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Group } from './group.entity';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> { }
