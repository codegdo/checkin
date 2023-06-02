import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { jwtConfig } from 'src/configs';
import { UserRepository } from 'src/models/main';
import { UserLoginDto, UserSignupDto } from 'src/models/main/user/user.dto';
import { HashingService, KeyGenService } from 'src/helpers';
import { AppStatus } from 'src/constants';
import { BillingService } from '../billing/billing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly keyGenService: KeyGenService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly billingService: BillingService
  ) { }

  async signup({ password, ...dto }: UserSignupDto) {

    try {
      // hash password
      const hashedPassword = await this.hashingService.hash(password);


    } catch (err) {
      throw err;
    }
  }

  async verify(verifyToken: string) {

  }

  async login({ username, password }: UserLoginDto, sessionId: string) {
    try {
      const user = await this.userRepository.findOneByOrFail({ username });

      if (!user) {
        throw new NotFoundException();
      }

      const { id, password: hashedPassword } = user;

      const isEqual = await this.hashingService.compare(
        password,
        hashedPassword,
      );

      if (!isEqual) {
        throw new NotFoundException();
      }

      const data = await this.userRepository.loginUser(id);

      const { accessToken, refreshToken } = await this.generateToken(
        id,
        sessionId,
      );

      const status = this.updateStatus(data.user);

      const navigation = this.generateNavigation();

      return {
        accessToken,
        refreshToken,
        current: {
          appStatus: status
        },
        user: data.user
      };
    } catch (err) {
      throw err;
    }
  }

  private generateNavigation() {

  }

  private updateStatus(user) {
    let status = null;

    if (user) {
      const { isActive, companyId } = user;

      if (isActive && companyId) {
        status = AppStatus.ACTIVE;
      } else if (!isActive && companyId) {
        status = AppStatus.INACTIVE;
      } else if (isActive && !companyId) {
        status = AppStatus.REQUIRE_VERIFY;
      } else if (!isActive && !companyId) {
        status = AppStatus.REQUIRE_VERIFY;
      }
    }

    return status;
  }

  private async generateToken(sub: number, sid: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
        sub,
        { sid },
        {
          algorithm: 'RS256',
          privateKey: this.jwtConfiguration.privateKey,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      ),
      this.signToken(
        sub,
        { sid },
        {
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  private async signToken<T>(sub, payload?: T, options?: JwtSignOptions) {
    return await this.jwtService.signAsync(
      { sub, ...payload },
      {
        audience: process.env.CLIENT_HOST,
        issuer: process.env.CLIENT_HOST,
        ...options,
      },
    );
  }
}

/*
async signup({ password, ...dto }: UserSignupDto) {

    try {
      // hash password
      const hashedPassword = await this.hashingService.hash(password);
      const data = await this.userRepository.signupUser({
        ...dto,
        password: hashedPassword,
      });

      if (!data) {
        throw new NotFoundException();
      }

      // TODO

      // create new stripe customer from api
      const newCustomer = await this.billingService.createCustomer('accountId', 'email');

      // create new trial subscription

      // 

      // update database with stripe subscription

      return data;
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';

      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }

      throw err;
      //this.loggerService.handleError(err);
    }
  }
*/
