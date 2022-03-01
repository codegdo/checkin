import { EntityRepository, Repository } from 'typeorm';
import { UserFormDto } from '../dtos';
import { Form } from './form.entity';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {
  async getForm(id: number | string) {
    const [result] = await this.manager.query(
      `CALL org.pr_form_get_by_id($1, $2, $3, $4, $5)`,
      [id, null, null, null, null],
    );

    const [form] = result?.data || [];
    return form;
  }

  async getFormForUser(dto: UserFormDto) {
    const { formId, userId, loginId, bizId } = dto;

    const [result] = await this.manager.query(
      `CALL org.pr_form_get_for_user($1, $2, $3, $4, $5)`,
      [formId, userId, loginId, bizId, null],
    );

    const [form] = result?.data || [];
    return form;
  }
}
