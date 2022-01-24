import { EntityRepository, Repository } from 'typeorm';
import { Form } from './form.entity';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {
  async getFormByName(name: string) {
    const [result] = await this.manager.query(
      `CALL org.pr_form_field_get_by_name($1, $2)`,
      [name, null],
    );

    const [form] = result?.data;
    console.log('FORM', form);
  }
}
