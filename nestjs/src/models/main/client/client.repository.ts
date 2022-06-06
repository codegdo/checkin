import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Client } from './client.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> { }