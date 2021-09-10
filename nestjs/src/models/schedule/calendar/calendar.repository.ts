import { EntityRepository, Repository } from "typeorm";
import { Calendar } from "./calendar.entity";

@EntityRepository(Calendar)
export class CalendarRepository extends Repository<Calendar> {

}