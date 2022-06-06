import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Session } from './session.entity';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> { }
