import { EntityRepository, Repository } from 'typeorm';
import { Recipient } from './recipient.entity';

@EntityRepository(Recipient)
export class RecipientRepository extends Repository<Recipient> { }