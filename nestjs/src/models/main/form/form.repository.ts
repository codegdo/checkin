import { EntityRepository, Repository } from 'typeorm';
import { Form } from './form.entity';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {
  async getFormByName(name: string) {
    const form = await this.manager.query(`SELECT * FROM org.fn_form_field_get_by_name($1)`, [name]);

    console.log('FFFOOORRRMMM', form);
  }
}