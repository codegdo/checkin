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

  async loginUser(dto: any): Promise<any> {
    const { username } = dto;

    const [result] = await this.manager.query(
      `CALL sec.pr_user_login($1, $2, $3, $4, $5, $6, $7)`,
      [username, null, null, null, null, null, null],
    );

    return result;
  }

}