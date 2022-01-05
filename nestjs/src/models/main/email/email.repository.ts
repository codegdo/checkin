import { EntityRepository, Repository } from 'typeorm';
import { Email, EmailType } from '../entities';
import { EmailData } from './email.dto';

@EntityRepository(Email)
export class EmailRepository extends Repository<Email> {

  async getEmailByName(name: string): Promise<EmailData[]> {
    return this.manager.query(`SELECT * FROM org.fn_email_get_by_name($1)`, [
      name,
    ]);
  }

}

@EntityRepository(EmailType)
export class EmailTypeRepository extends Repository<EmailType> {
}

/*
// email

const emails = await this.createQueryBuilder('email')
  .leftJoinAndSelect('email.emailTypeId', 'emailType')
  .leftJoinAndSelect('emailType.emailCategoryId', 'emailCategory')
  .select([
    'email.id as id',
    'emailType.type as type',
    'email.name as name',
    'emailCategory.recipients',
    'emailCategory.cc_recipients as "ccRecipients"',
    'emailCategory.bcc_recipients as "bccRecipients"',
    'email.subject as subject',
    'email.body as body',
    'email.is_active as "isActive"',
    'email.org_id as "orgId"'
  ])
  .where('emailType.name = :name', { name: 'signup' })
  .getRawMany();

const emails = await await this.createQueryBuilder('e')
  .leftJoinAndSelect(EmailType, 'et', 'e.email_type_id = et.id')
  .leftJoinAndSelect(EmailCategory, 'ec', 'et.email_category_id = ec.id')
  .select([
    'e.id as id',
    'et.type as type',
    'e.name as name',
    'ec.recipients',
    'ec.cc_recipients as "ccRecipients"',
    'ec.bcc_recipients as "bccRecipients"',
    'e.subject as subject',
    'e.body as body',
    'e.is_active as "isActive"',
    'e.org_id as "orgId"'
  ])
  .where('et.name = :name', { name: 'signup' })
  .getRawMany();
*/
