export * from './user/user.repository'
export * from './session/session.repository';

/* import { Injectable } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';
import { UserRepository } from './user/user.repository';

@Injectable()
export class MainRepository {
  get connection(): Connection {
    return getConnection('default')
  }

  // sec
  get userRepository(): UserRepository {
    return this.connection.getCustomRepository(UserRepository)
  }
} */