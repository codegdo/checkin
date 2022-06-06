import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { Module } from './module.entity';

@EntityRepository(Module)
export class ModuleRepository extends Repository<Module> { }