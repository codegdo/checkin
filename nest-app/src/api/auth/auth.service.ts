import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { HashingService } from 'src/services/hashing/hashing.service';
import { KeyGenService } from 'src/services/keygen/keygen.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly keyGenService: KeyGenService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signup() {
    const hash = await this.hashingService.hash('123');
    const keystore = await this.keyGenService.generate();
    console.log(keystore);
    console.log(hash);
  }

  async signin() {
    const isEqual = await this.hashingService.compare(
      '123',
      'acff23badee6f18ce2cb1f0f31e5b530441fba72d4b044f05c4c22f06d2f86eb.e601fc9013d2ea35',
    );

    const accessToken = await this.jwtService.signAsync(
      {
        sub: 1,
        email: '123@gmail.com',
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        //secret: this.jwtConfiguration.secret,
        privateKey: this.jwtConfiguration.privateKey,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    const token = await this.jwtService.verifyAsync(accessToken, {
      publicKey: this.jwtConfiguration.publicKey,
    });

    console.log(accessToken);
    console.log(token);
    console.log(isEqual);
  }
}
