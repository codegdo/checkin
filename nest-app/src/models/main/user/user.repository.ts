import { Repository } from 'typeorm';
import { User } from './user.entity';

import { CustomRepository } from 'src/custom/typeorm/custom-repository.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async signupUser(dto): Promise<any> {
    //let { data } = dto;

    return dto;

    // const [result] = await this.manager.query(
    //   `CALL sec.pr_user_signup($1, $2)`,
    //   [data, null],
    // );

    // return result.data;
  }
}
