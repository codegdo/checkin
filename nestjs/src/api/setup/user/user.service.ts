import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/models/main/user/user.entity';
import { UserRepository, FormRepository } from 'src/models/main/repositories';
import { ErrorService } from 'src/common/modules';
import { FormDto } from 'src/models/main/dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(FormRepository)
    private formRepository: FormRepository,

    private readonly errorService: ErrorService, //private repo: MainRepository
  ) //@Inject(MainRepository)
  { }

  async getAllUsers(paginationQueryDto) {
    const { limit, offset } = paginationQueryDto;

    return this.userRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async getUser(id) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async createUser(dto) {
    const user = this.userRepository.create(dto);

    try {
      return this.userRepository.save(user);
    } catch (err) {
      throw new ConflictException('Duplicate username');
    }
  }

  async updateUser(id, updateUserDto) { }

  async delete(id) { }

  async getForm(dto: FormDto) {
    try {
      return this.formRepository.getForm(dto);
    } catch (e) {
      this.errorService.handleError(e);
    }
  }
}
