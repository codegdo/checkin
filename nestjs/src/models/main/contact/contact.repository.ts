import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Contact } from './contact.entity';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> { }