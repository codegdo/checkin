import {
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  Injectable,
  InternalServerErrorException,
  Inject,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

//import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
//import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
//import { Logger } from 'winston';

import {
  OrganizationRepository,
  UserRepository,
  RoleRepository,
  TokenRepository,
  ContactRepository,
} from 'src/models/main/repositories';
import { CalendarRepository } from 'src/models/checkin/repositories';
import { MailService } from 'src/common';
import { ISignup } from './auth.interface';
import { SignupUserDto } from 'src/models/main/user/dtos/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection()
    private connection: Connection,

    @InjectConnection('checkin')
    private connection2: Connection,

    @InjectRepository(OrganizationRepository)
    private orgRepository: OrganizationRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(ContactRepository)
    private contactRepository: ContactRepository,

    @InjectRepository(RoleRepository)
    private roleRepository: RoleRepository,

    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,

    @InjectRepository(CalendarRepository, 'checkin')
    private calendarRepository: CalendarRepository,

    //@InjectPinoLogger(AuthService.name)
    //private readonly logger: PinoLogger,

    // @Inject(WINSTON_MODULE_PROVIDER)
    // private readonly logger: Logger,

    @Inject(Logger)
    private readonly logger: LoggerService,

    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) { }

  async signup(body: ISignup) {
    /*   
    const { contact, user } = body;

    try {
      const signupUserDto: SignupUserDto = {
        ...contact,
        ...user,
        data: { username: user.username },
        expiredAt: Math.floor(new Date().getTime() / 1000 + 60 * 1000),
      };

      const { id } = await this.userRepository.singupUser(signupUserDto);

      console.log(id);
    } catch (err) {
      console.log(err);
    }

    return {username: user.username};
*/

    //const organization = await this.orgRepository.create({
    //subdomain: createUserDto.username,
    //});

    const contact = await this.contactRepository.create(body.contact);
    const user = await this.userRepository.create(body.user);
    const role = await this.roleRepository.create();
    const token = await this.tokenRepository.create();
    const calendar = await this.calendarRepository.create({
      name: user.username,
    });

    const queryRunner = this.connection.createQueryRunner();
    const queryRunner2 = this.connection2.createQueryRunner();

    await queryRunner.startTransaction();
    await queryRunner2.startTransaction();

    try {
      //const org = await queryRunner.manager.save(organization);
      //user.orgId = org.id;

      const saveContact = await queryRunner.manager.save(contact);
      user.contact = saveContact;

      // assign role = owner
      role.id = 2;
      user.role = role;

      token.data = { username: user.username };
      token.expiredAt = Math.floor(new Date().getTime() / 1000 + 60 * 1000);

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

      // log error
      this.logger.error(`${err.message}`, err);

      //console.log('ERRRRR', log.);

      throw new InternalServerErrorException(err.code);
    } finally {
      // release
      await queryRunner.release();
      await queryRunner2.release();
    }

    // send mail
    this.mailService.sendUserConfirmation();

    return { username: user.username };

    /* try {
      const { response } = await this.mailerService.sendMail({
        from: 'noreply@checkin.com',
        to: `${user.emailAddress}`,
        subject: 'Activate Your Account',
        html: `<a href="${this.configService.get('app.host')}/auth/verify/${token.id}">Activate Your Account</a>`,
      });

      const msgId = response.split('=').slice(-1).join().replace(/]$/, '');
      console.log(`${this.configService.get('app.mailerUrl')}/message/${msgId}`);
    } catch (err) {
      console.log(err);
    } */
  }

  async login(loginUserDto) {
    const user = await this.userRepository.loginUser(loginUserDto);

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }

  async logout() { }

  async verify(id: string) {
    const token = await this.tokenRepository.findOne({
      where: [{ id }],
    });

    if (!token) {
      throw new NotFoundException(404, 'Not Found');
    }

    const date = new Date();
    const now = Math.round(date.getTime() / 1000);

    if (token.expiredAt < now) {
      throw new UnauthorizedException(401, 'Unauthorized');
    }

    const { username } = token.data;

    //const query = await this.userRepository.createQueryBuilder('user');
    //const user = await query.addSelect(['user.password', 'user.passcode']).where('user.username = :username', { username }).getOne();
    const user = await this.userRepository.findOne({ where: [{ username }] });

    if (user.isActive) {
      throw new ConflictException(409, 'Activated');
    }

    user.isActive = true;

    await this.userRepository.save(user);
    await this.tokenRepository.delete(token);
    //await this.userRepository.update(user.id, user);
    //await this.connection.transaction(async (manager) => {
    //await manager.save(user);
    //});

    /*
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      user.isActive = true;
      await queryRunner.manager.save(user);

      // commit
      await queryRunner.commitTransaction();

    } catch (err) {
      // rollback
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(err.code);
    } finally {
      // release
      await queryRunner.release();
    }
    */
  }
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
