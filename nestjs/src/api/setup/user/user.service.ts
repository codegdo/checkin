import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/models/main/user/user.entity';
import { UserRepository, FormRepository } from 'src/models/main/repositories';
import { LoggerMessageEnum, LoggerService } from 'src/common';
import { FormDto, UserCreateDto } from 'src/models/main/dtos';
import { UserQueryAll } from 'src/models/main/user/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(FormRepository)
    private formRepository: FormRepository,

    private readonly loggerService: LoggerService, //private repo: MainRepository //@Inject(MainRepository)
  ) { }

  async getAllUsers(userQuery: UserQueryAll) {
    return this.userRepository.getAllUsers(userQuery);
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
        throw new NotFoundException(LoggerMessageEnum.NOT_FOUND);
      }

      return data;
    } catch (e) {
      this.loggerService.handleError(e);
    }
  }

  async updateUser(id, updateUserDto) { }

  async delete(id) { }

  async getForm(dto: FormDto) {
    try {
      return this.formRepository.getForm(dto);
    } catch (e) {
      this.loggerService.handleError(e);
    }
  }
}
