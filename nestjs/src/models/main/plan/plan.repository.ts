import { EntityRepository, Repository } from 'typeorm';
import { Plan } from './plan.entity';

@EntityRepository(Plan)
export class PlanRepository extends Repository<Plan> { }
