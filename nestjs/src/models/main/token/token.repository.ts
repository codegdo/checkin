import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Token } from './token.entity';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> { }