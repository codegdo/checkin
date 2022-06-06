import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Permission } from './permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> { }