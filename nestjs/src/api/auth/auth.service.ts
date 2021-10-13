import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

import { CreateUserDto } from 'src/models/main/dtos';
import {
  OrganizationRepository,
  UserRepository,
  TokenRepository,
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

    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,

    @InjectRepository(CalendarRepository, 'schedule')
    private calendarRepository: CalendarRepository,

    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    //const organization = await this.orgRepository.create({
    //subdomain: createUserDto.username,
    //});
    //const tokenDto =
    const user = await this.userRepository.create(createUserDto);
    const token = await this.tokenRepository.create();
    const calendar = await this.calendarRepository.create({
      name: createUserDto.username,
    });

    const queryRunner = this.connection.createQueryRunner();
    const queryRunner2 = this.connection2.createQueryRunner();

    await queryRunner.startTransaction();
    await queryRunner2.startTransaction();

    console.log('CONFIG', this.configService.get('MAILER_HOST'));

    try {
      //const org = await queryRunner.manager.save(organization);
      //user.orgId = org.id;
      await queryRunner.manager.save(user);
      await queryRunner.manager.save(token);
      await queryRunner2.manager.save(calendar);

      // commit
      await queryRunner.commitTransaction();
      await queryRunner2.commitTransaction();
    } catch (err) {
      // rollback
      await queryRunner.rollbackTransaction();
      await queryRunner2.rollbackTransaction();

      // errors
      let message = 'Internal server error';

      if (err.code === '23505') {
        message = 'Username already exists';
      }

      throw new InternalServerErrorException(message);
    } finally {
      // release
      await queryRunner.release();
      await queryRunner2.release();
    }

    console.log('TOKEN', token.id);

    try {
      const { response } = await this.mailerService.sendMail({
        from: 'noreply@checkin.com',
        to: `${user.emailAddress}`,
        subject: 'Activate Your Account',
        html: `<a href="/auth/verify/${token.id}">Activate Your Account</a>`,
      });

      //'250 Accepted [STATUS=new MSGID=YWXy.TtTVk.ToNJbYWX6ftPxNAyMUpIRAAAAA1fY7.ae9u2U-JkOgvSw0r0]'
      //https://ethereal.email/message/YWXy.TtTVk.ToNJbYWX6ftPxNAyMUpIRAAAAA1fY7.ae9u2U-JkOgvSw0r0

      const msgId = response.split('=').slice(-1).join().replace(/]$/, '');

      console.log(`https://ethereal.email/message/${msgId}`);
    } catch (err) {
      console.log(err);
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

  async logout() {}
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
