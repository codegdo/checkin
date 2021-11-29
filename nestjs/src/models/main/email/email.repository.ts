import { EntityRepository, Repository } from 'typeorm';
import { Email, EmailType, Recipient } from '../entities';

@EntityRepository(Email)
export class EmailRepository extends Repository<Email> {
  async getSingupEmail() {
    const query = this.createQueryBuilder('e');

    const signupEmails = await query
      .leftJoinAndSelect('e.emailTypeId', 'email_type')
      .leftJoinAndSelect('email_type.recipientId', 'recipient')
      .where('email_type.name = :name', { name: 'signup' })
      .select([
        'e.id as id',
        'email_type.type as type',
        'e.name as name',
        'recipient.email_address as "emailAddress"',
        'e.subject as subject',
        'e.body as body',
        'e.is_active as "isActive"',
        'e.org_id as orgId'
      ])
      .getRawMany();

    // const signupEmails = await query
    //   .leftJoinAndSelect(EmailType, 'et', 'e.email_type_id = et.id')
    //   .leftJoinAndSelect(Recipient, 'r', 'et.recipient_id = r.id')
    //   .select([
    //     'e.id as id',
    //     'et.type as type',
    //     'e.name as name',
    //     'r.email_address as "emailAddress"',
    //     'e.subject as subject',
    //     'e.body as body',
    //     'e.is_active as "isActive"',
    //     'e.org_id as orgId'
    //   ])
    //   .where('et.name = :name', { name: 'signup' })
    //   .getRawMany();

    return signupEmails;
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
