import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/models/main/user/user.entity';
import { UserRepository, FormRepository } from 'src/models/main/repositories';
import { ErrorMessageEnum, ErrorService } from 'src/common';
import { FormDto, UserCreateDto } from 'src/models/main/dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(FormRepository)
    private formRepository: FormRepository,

    private readonly errorService: ErrorService, //private repo: MainRepository //@Inject(MainRepository)
  ) { }

  async getAllUsers(groupType, orgId, locationId) {
    //const { limit, offset } = query;

    return this.userRepository.getAllUsers(groupType, orgId, locationId);
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
