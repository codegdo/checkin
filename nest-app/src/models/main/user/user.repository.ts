import { Repository } from 'typeorm';
import { User } from './user.entity';

import { CustomRepository } from 'src/customs/typeorm/custom-repository.decorator';
import { UserSignupData, UserSignupDto } from './user.dto';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async signupUser(data: UserSignupDto): Promise<UserSignupData> {
    const [result] = await this.manager.query(
      `CALL main_sec.pr_user_signup($1, $2)`,
      [data, null],
    );

    return result.data;
  }

  async loginUser(id: number): Promise<any> {
    const [result] = await this.manager.query(
      `CALL main_sec.pr_user_login($1, $2)`,
      [id, null],
    );

    return result.data;
  }

  async getUserPermissionPolicy(user) {
    const { id } = user;
    const [result] = await this.manager.query(
      `CALL main_sec.pr_user_permission_policy($1, $2)`,
      [id, null],
    );

    return result.data;
  }
}
