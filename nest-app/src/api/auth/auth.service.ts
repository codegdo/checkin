import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { jwtConfig } from 'src/configs';
import { UserRepository } from 'src/models/main';
import { UserSignupDto } from 'src/models/main/user/user.dto';
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
  ) {}

  async signup({ password, ...dto }: UserSignupDto) {
    //const hash = await this.hashingService.hash('123');
    //const keystore = await this.keyGenService.generate();
    //console.log(keystore);
    //console.log(hash);
    try {
      // hash password
      const hashedPassword = await this.hashingService.hash(password);
      const data = await this.userRepository.signupUser({
        ...dto,
        passsword: hashedPassword,
      });

      if (!data) {
        throw new NotFoundException();
      }

      return data;
    } catch (err) {
      //this.loggerService.handleError(err);
    }
  }

  async login() {
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

  private async signToken<T>(sub: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        privateKey: this.jwtConfiguration.privateKey,
        expiresIn,
      },
    );
  }
}
