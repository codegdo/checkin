import { Repository } from 'typeorm';

import { CustomRepository } from 'src/decorators';
import { Session } from './session.entity';

@CustomRepository(Session)
export class SessionRepository extends Repository<Session> { }
