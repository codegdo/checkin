import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { FormDto } from './form.dto';
import { Form } from './form.entity';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {

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
