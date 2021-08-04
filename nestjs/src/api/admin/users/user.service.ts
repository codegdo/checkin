import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/models/main/user/user.entity';
import { UserRepository } from 'src/models/main/repositories';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    //@Inject(MainRepository)
    //private repo: MainRepository
  ) { }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
