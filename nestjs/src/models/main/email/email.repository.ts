import { EntityRepository, Repository } from 'typeorm';
import { Email, EmailType, Recipient } from '../entities';

@EntityRepository(Email)
export class EmailRepository extends Repository<Email> {
  async getSingupEmail() {
    const query = this.createQueryBuilder('e');

    const signupEmails = await query

      //.leftJoinAndSelect('email.email_type_id', 'email_type')

      //.leftJoinAndSelect('email_type.recipient_id', 'recipient')
      //.where('email_type.name = :name', { name: 'signup' })
      //.leftJoinAndSelect('email.email_type_id', 'email_type')
      //.leftJoin('email.email_type_id', 'email_type')
      //.addSelect('*')

      .leftJoinAndSelect(EmailType, 'et', 'e.email_type_id = et.id')
      .select(['e.id as id', 'et.type as type'])
      // .leftJoinAndSelect(
      //   Recipient,
      //   'recipient',
      //   'email_type.recipient_id = recipient.id',
      // )

      //.where('email_type.name = :name', { name: 'signup' })
      .getRawMany();

    return signupEmails;
  }
}
