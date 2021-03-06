import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

//import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
//import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
//import { Logger } from 'winston';

import {
  OrganizationRepository,
  UserRepository,
  GroupRepository,
  TokenRepository,
  ContactRepository,
  EmailRepository,
  FormRepository,
} from 'src/models/main/repositories';
//import { CheckinRepository } from 'src/models/checkin/repositories';
import {
  LoggerMessageEnum,
  LoggerService,
  MessageAuthService,
  MessageEnum,
} from 'src/common';
import {
  UserLoginDto,
  UserSetupDto,
  UserSignupDto,
  UserVerifyDto,
} from 'src/models/main/dtos';
import { moduleViewObjectGroup } from 'src/utils/module-view-object-group.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource('default')
    private dataSource: DataSource,

    //@InjectDataSource('checkin')
    //private dataSource2: DataSource,

    @InjectRepository(OrganizationRepository)
    private orgRepository: OrganizationRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(ContactRepository)
    private contactRepository: ContactRepository,

    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,

    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,

    @InjectRepository(EmailRepository)
    private emailRepository: EmailRepository,

    @InjectRepository(FormRepository)
    private formRepository: FormRepository,

    //@InjectRepository(CheckinRepository, 'checkin')
    //private checkinRepository: CheckinRepository,

    // @Inject(WINSTON_MODULE_PROVIDER)
    // private readonly logger: Logger,

    private readonly messageService: MessageAuthService,
    private readonly loggerService: LoggerService,
  ) { }

  async signup(dto: UserSignupDto) {
    try {
      const data = await this.userRepository.signupUser(dto);

      if (!data) {
        throw new NotFoundException(LoggerMessageEnum.NOT_FOUND);
      }

      return data;
    } catch (e) {
      this.loggerService.handleError(e);
    }
  }

  async verify(dto: UserVerifyDto) {
    const {
      loginId,
      data: { option },
    } = dto;

    try {
      const type =
        option == 'phoneNumber' ? MessageEnum.MESSAGE : MessageEnum.EMAIL;
      const data = await this.userRepository.verifyUser(loginId);
      return { ok: true };
      //return this.messageService.sendVerify({ type, context: data });
    } catch (e) {
      this.loggerService.handleError(e);
    }
  }

  async login(dto: UserLoginDto) {
    try {
      const data = await this.userRepository.loginUser(dto);

      const { user, modules, ...rest } = data;
      const { orgId, isActive } = user;

      if (orgId && !isActive) {
        throw new BadRequestException(LoggerMessageEnum.ACCOUNT_UNACTIVE);
      }

      const nav = modules && moduleViewObjectGroup(modules);

      return { user, nav, ...rest };
    } catch (e) {
      this.loggerService.handleError(e);
    }
  }

  async setup(dto: UserSetupDto) {
    try {
      const data = await this.userRepository.setupUser(dto);
      const { modules, ...rest } = data;

      const nav = modules && moduleViewObjectGroup(modules);
      return { nav, ...rest };
    } catch (e) {
      this.loggerService.handleError(e);
    }
  }

  async confirm(key: string) {
    try {
      return await this.userRepository.confirmUser(key);
    } catch (e) {
      this.loggerService.handleError(e);
    }
  }

  async getForm(formId: string) {
    try {
      return this.formRepository.getForm({
        formId,
        filterId: null,
        loginId: null,
        orgId: null
      });
    } catch (e) {
      this.loggerService.handleError(e);
    }
  }
}

//   async resend(username: string) {
//     const token = await this.tokenRepository.create();
//     const user = await this.userRepository.getUser(username);

//     console.log(user);

//     const sendData = {
//       name: null,
//       emailAddress: null,
//       url: `${this.configService.get('app.host')}/auth/verify/${token.id}`,
//     };

//     //this.mailService.sendVerifyEmail(sendData);

//     return { username };
//   }

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

/*
// const queryRunner = this.connection.createQueryRunner();

    // try {
    //   await queryRunner.startTransaction();

    //   const result = await queryRunner.manager
    //     .getCustomRepository(UserRepository)
    //     .singupUser({ ...contact, ...user });

    //   await queryRunner.commitTransaction();

    //   return result;
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();

    //   // 23505 = conflict
    //   if (err.code == 23505) {
    //     this.logger.warn(`${err.message}`, err);
    //     throw new ConflictException(409, 'Username already exists.');
    //   } else {
    //     this.logger.error(`${err.message}`, err);
    //     throw new InternalServerErrorException(500, err.code);
    //   }
    // } finally {
    //   await queryRunner.release();
    // }


    // const token = await this.tokenRepository.findOne({
    //   where: [{ id }],
    // });

    // if (!token) {
    //   throw new NotFoundException(404, 'Not Found');
    // }

    // const date = new Date();
    // const now = Math.round(date.getTime() / 1000);

    // if (token.expiredAt < now) {
    //   throw new UnauthorizedException(401, 'Unauthorized');
    // }

    // const { username } = token.data;
    // const user = await this.userRepository.findOne({ where: [{ username }] });

    // if (user.isActive) {
    //   throw new ConflictException(409, 'Activated');
    // }

    // user.isActive = true;

    // try {
    //   await this.userRepository.save(user);
    //   await this.tokenRepository.delete(token);
    // } catch (err) {
    //   throw new InternalServerErrorException(err.code);
    // }

    // await this.connection.transaction(async (manager) => {
    //   try {
    //     await manager.save(user);
    //     await manager.remove(token);
    //   } catch (err) {
    //     throw new InternalServerErrorException(err.code);
    //   }
    // });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(user);
      await queryRunner.manager.remove(token);

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
