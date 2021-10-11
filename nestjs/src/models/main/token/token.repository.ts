import { EntityRepository, Repository } from 'typeorm';
import { Token } from './token.entity';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> { }