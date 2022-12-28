import { Repository } from 'typeorm';
import { User } from './user.entity';

import { CustomRepository } from 'src/custom/typeorm/custom-repository.decorator';
import { UserSignupDto } from './user.dto';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async signupUser(data: UserSignupDto): Promise<any> {
    const [result] = await this.manager.query(
      `CALL sec.pr_user_signup($1, $2)`,
      [data, null],
    );

    return result.data;
  }
}
