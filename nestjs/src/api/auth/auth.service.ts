import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { CreateUserDto } from 'src/models/main/dtos';
import {
  OrganizationRepository,
  UserRepository,
} from 'src/models/main/repositories';
import { CalendarRepository } from 'src/models/scheduler/repositories';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection()
    private connection: Connection,

    @InjectConnection('schedule')
    private connection2: Connection,

    @InjectRepository(OrganizationRepository)
    private orgRepository: OrganizationRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(CalendarRepository, 'schedule')
    private calendarRepository: CalendarRepository,
  ) { }

  async signup(createUserDto: CreateUserDto) {
    //const organization = await this.orgRepository.create({
    //subdomain: createUserDto.username,
    //});
    const user = await this.userRepository.create(createUserDto);
    const calendar = await this.calendarRepository.create({
      name: createUserDto.username,
    });

    const queryRunner = this.connection.createQueryRunner();
    const query2Runner = this.connection2.createQueryRunner();
    await queryRunner.startTransaction();
    await query2Runner.startTransaction();

    try {
      //const org = await queryRunner.manager.save(organization);
      //user.orgId = org.id;
      await queryRunner.manager.save(user);
      await query2Runner.manager.save(calendar);

      // commit
      await queryRunner.commitTransaction();
      await query2Runner.commitTransaction();
    } catch (err) {
      // rollback
      await queryRunner.rollbackTransaction();
      await query2Runner.rollbackTransaction();
    } finally {
      // release
      await queryRunner.release();
      await query2Runner.release();
    }

    return {};
  }

  async login(loginUserDto) {
    const user = await this.userRepository.loginUser(loginUserDto);

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }

  async logout() { }
}

/*
// Multiple transactions
const queryRunner = this.connection.createQueryRunner();
  const query2Runner = this.connection2.createQueryRunner();
  await queryRunner.startTransaction();
  await query2Runner.startTransaction();

  try {

    const bus = await queryRunner.manager.save(business);
    user.businessId = bus.id;
    await queryRunner.manager.save(user);
    await query2Runner.manager.save(calendar);

    // commit
    await queryRunner.commitTransaction();
    await query2Runner.commitTransaction();

  } catch (err) {
    // rollback
    await queryRunner.rollbackTransaction();
    await query2Runner.rollbackTransaction();
  } finally {
    // release
    await queryRunner.release();
    await query2Runner.release();
  }

  // Single transaction
  await this.connection.transaction(async (manager) => {
    const bus = await manager.save(business);
    user.businessId = bus.id;
    await manager.save(user);
  });
*/
