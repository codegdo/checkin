import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/models/main/user/user.entity';
import { UserRepository, FormRepository } from 'src/models/main/repositories';
import { ErrorMessageEnum, ErrorService } from 'src/common/modules';
import { FormDto, UserCreateDto } from 'src/models/main/dtos';

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

  async createUser(dto: UserCreateDto) {
    try {
      const data = await this.userRepository.createUser(dto);

      if (!data) {
        throw new NotFoundException(ErrorMessageEnum.NOT_FOUND);
      }

      return data;
    } catch (e) {
      this.errorService.handleError(e);
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
