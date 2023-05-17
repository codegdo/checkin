import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtConfig } from 'src/configs';
import { UserRepository } from 'src/models/main';

@Injectable()
export class IamService {
  // constructor(
  //   @Inject(jwtConfig.KEY)
  //   private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

  //   @InjectRepository(UserRepository)
  //   private userRepository: UserRepository,
  // ) {}

  // async getUserPermissionPolicy(user) {
  //   try {
  //     const data = await this.userRepository.getUserPermissionPolicy(user);

  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
