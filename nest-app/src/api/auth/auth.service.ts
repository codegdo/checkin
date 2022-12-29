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
import { HashingService, KeyGenService } from 'src/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly keyGenService: KeyGenService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }

  async signup({ password, ...dto }: UserSignupDto) {
    //console.log(hash);
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

  async login({ username, password }: UserLoginDto, sessionId: string) {
    try {
      const user = await this.userRepository.findOneByOrFail({ username });

      if (!user) {
        throw new NotFoundException();
      }

      const { id, password: hashedPassword, isActive, companyId } = user;

      const isEqual = await this.hashingService.compare(
        password,
        hashedPassword,
      );

      if (!isEqual) {
        throw new NotFoundException();
      }

      const { accessToken, refreshToken } = await this.generateToken(id, sessionId);

      //await this.userRepository.

      return { accessToken, refreshToken, user };
    } catch (err) {
      throw err;
    }

    // const isEqual = await this.hashingService.compare(
    //   '123',
    //   'acff23badee6f18ce2cb1f0f31e5b530441fba72d4b044f05c4c22f06d2f86eb.e601fc9013d2ea35',
    // );
    // const accessToken = await this.jwtService.signAsync(
    //   {
    //     sub: 1,
    //     email: '123@gmail.com',
    //   },
    //   {
    //     audience: this.jwtConfiguration.audience,
    //     issuer: this.jwtConfiguration.issuer,
    //     //secret: this.jwtConfiguration.secret,
    //     privateKey: this.jwtConfiguration.privateKey,
    //     expiresIn: this.jwtConfiguration.accessTokenTtl,
    //   },
    // );
    // const token = await this.jwtService.verifyAsync(accessToken, {
    //   publicKey: this.jwtConfiguration.publicKey,
    // });
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
          algorithm: 'RS256',
          privateKey: this.jwtConfiguration.privateKey,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      )
    ]);

    return { accessToken, refreshToken }
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
