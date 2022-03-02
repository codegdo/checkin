import { EntityRepository, Repository } from 'typeorm';
import { FormDto } from './form.dto';
import { Form } from './form.entity';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {
  // async getForm(id: number | string) {
  //   const [result] = await this.manager.query(
  //     `CALL org.pr_form_get($1, $2, $3, $4, $5)`,
  //     [id, null, null, null, null],
  //   );

  //   const [form] = result?.data || [];
  //   return form;
  // }

  async getForm(dto: FormDto) {
    const { formId, filterId, loginId, orgId } = dto;

    const [result] = await this.manager.query(
      `CALL org.pr_form_get($1, $2, $3, $4, $5)`,
      [formId, filterId, loginId, orgId, null],
    );

    const [form] = result?.data || [];
    return form;
  }
}
