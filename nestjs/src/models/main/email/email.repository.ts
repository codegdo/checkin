import { EntityRepository, Repository } from 'typeorm';
import { Email, EmailType } from '../entities';

@EntityRepository(Email)
export class EmailRepository extends Repository<Email> {
  async getSingupEmail() {

    const emails = await this.manager.query(`SELECT * FROM org.fn_get_email_by_name($1)`, ['signup']);

    // const emails = await this.createQueryBuilder('email')
    //   .leftJoinAndSelect('email.emailTypeId', 'emailType')
    //   .leftJoinAndSelect('emailType.emailAddressId', 'emailAddress')
    //   .select([
    //     'email.id as id',
    //     'emailType.type as type',
    //     'email.name as name',
    //     'emailAddress.recipient',
    //     'emailAddress.cc_recipient as "ccRecipient"',
    //     'emailAddress.bcc_recipient as "bccRecipient"',
    //     'email.subject as subject',
    //     'email.body as body',
    //     'email.is_active as "isActive"',
    //     'email.org_id as "orgId"'
    //   ])
    //   .where('emailType.name = :name', { name: 'signup' })
    //   .getRawMany();

    // const emails = await await this.createQueryBuilder('e')
    //   .leftJoinAndSelect(EmailType, 'et', 'e.email_type_id = et.id')
    //   .leftJoinAndSelect(EmailAdress, 'ea', 'et.email_address_id = ea.id')
    //   .select([
    //     'e.id as id',
    //     'et.type as type',
    //     'e.name as name',
    //     'ea.recipient',
    //     'ea.cc_recipient as "ccRecipient"',
    //     'ea.bcc_recipient as "bccRecipient"',
    //     'e.subject as subject',
    //     'e.body as body',
    //     'e.is_active as "isActive"',
    //     'e.org_id as "orgId"'
    //   ])
    //   .where('et.name = :name', { name: 'signup' })
    //   .getRawMany();

    return emails;
  }
}

@EntityRepository(EmailType)
export class EmailTypeRepository extends Repository<EmailType> {
  async getSingupEmail() {
    const query = this.createQueryBuilder('email_type');

    const signupEmails = await query
      .leftJoinAndSelect('email_type.emails', 'email')
      .getMany();

    return signupEmails;
  }
}
