import { EntityRepository, Repository } from 'typeorm';
import { UserFormDto } from '../dtos';
import { Form } from './form.entity';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {
  async getForm(id: number | string) {
    const [result] = await this.manager.query(
      `CALL org.pr_form_get_by_id($1, $2)`,
      [id, null],
    );

    if (!result) {
      //
    }

    const [form] = result?.data || [];
    return form;
  }

  async getFormForUser(dto: UserFormDto) {
    return dto;
  }
}
