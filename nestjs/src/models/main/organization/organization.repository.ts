import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Organization } from './organization.entity';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> { }
