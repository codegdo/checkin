import { EntityRepository, Repository } from 'typeorm';
import { Role } from './role.entity';

@EntityRepository(Role)
export class Rolepository extends Repository<Role> { }