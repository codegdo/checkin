import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/main';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }


  async login(dto: any) {
    try {
      return this.userRepository.loginUser(dto);
    } catch (err) {
      console.log(err);
    }
  }
}
