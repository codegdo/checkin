import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { HashingService } from 'src/services/hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) { }

  async signup() {
    const hash = await this.hashingService.hash('123');
    console.log(hash);
  }

  async signin() {
    const isEqual = await this.hashingService.compare(
      '1234',
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
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    console.log(accessToken);
    console.log(isEqual);
  }
}
