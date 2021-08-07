import { ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto) {

    console.log('CREATE', createUserDto);

    try {
      const user = await this.create(createUserDto);
      return this.save(user);
    } catch (err) {
      throw new ConflictException('Duplicate username');
    }
  }
}