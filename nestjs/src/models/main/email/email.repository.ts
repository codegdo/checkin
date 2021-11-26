import { EntityRepository, Repository } from 'typeorm';
import { Email } from './email.entity';

@EntityRepository(Email)
export class EmailRepository extends Repository<Email> {

  async getSingupEmail() {
    const query = this.createQueryBuilder('email');

    const signupEmails = await query
      .leftJoinAndSelect('email.email_type_id', 'email_type')
      .leftJoinAndSelect('recipient', 'email_type.recipient_id')
      .where('email_type.name = :name', { name: 'signup' })
      .getMany();

    return signupEmails;
  }
}
