import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  findAll(paginationQueryDto) {
    const { limit, offset } = paginationQueryDto;

    return this.userRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOne(id) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async create(dto) {
    const user = this.userRepository.create(dto);

    try {
      return this.userRepository.save(user);
    } catch (err) {
      throw new ConflictException('Duplicate username');
    }

  }

  async update(id, updateUserDto) { }

  async delete(id) { }
}
