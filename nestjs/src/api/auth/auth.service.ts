import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { CreateUserDto } from 'src/models/main/dtos';
import {
  BusinessRepository,
  UserRepository,
} from 'src/models/main/repositories';
import { CalendarRepository } from 'src/models/schedule/repositories';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection()
    private connection: Connection,

    @InjectConnection('schedule')
    private connection2: Connection,

    @InjectRepository(BusinessRepository)
    private businessRepository: BusinessRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(CalendarRepository, 'schedule')
    private calendarRepository: CalendarRepository,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    //const user = this.userRepository.createUser(createUserDto);
    const business = await this.businessRepository.create({
      subdomain: createUserDto.username,
    });
    const user = await this.userRepository.create(createUserDto);
    const calendar = await this.calendarRepository.create();

    try {
      await this.connection.transaction(async (manager) => {
        const bus = await manager.save(business);
        user.businessId = bus.id;
        await manager.save(user);
      });
    } catch (err) {
      console.log(err);
    }

    await this.connection2.transaction(async (manager) => {
      await manager.save(calendar);
    });

    return {};
  }

  async login(loginUserDto) {
    const user = await this.userRepository.loginUser(loginUserDto);

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }

  async logout() {}
}

/*
const queryRunner = this.connection.createQueryRunner();
await queryRunner.startTransaction();

try {

  const bus = await queryRunner.manager.save(business);
  user.businessId = bus.id;
  await queryRunner.manager.save(user);

  // commit
  await queryRunner.commitTransaction();
} catch (err) {
  // rollback
  await queryRunner.rollbackTransaction();
} finally {
  // release
  await queryRunner.release();
}
*/
