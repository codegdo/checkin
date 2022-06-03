import { Repository } from 'typeorm';

import { EntityRepository } from 'src/decorators';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async getUser(username: string) {
    const [user] = await this.manager.query(
      `SELECT * FROM sec.fn_get_user($1)`,
      [username]
    );
    return user;
  }
}