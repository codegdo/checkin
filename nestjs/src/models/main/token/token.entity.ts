import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';
import crypto from 'crypto';
import { TokenDto } from './dtos/token.dto';

export interface TokenData {
  maxAge?: number;
  data?: string;
}

@Entity({ database: 'main', schema: 'sec', name: 'token' })
export class Token extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'expired_at' })
  expiredAt: number;

  @Column({ name: 'data' })
  data: string;

  create({ data = '{}', maxAge = 86400 }: TokenData): TokenDto {
    const token: TokenDto = {
      id: crypto.randomBytes(16).toString('hex'),
      expiredAt: Math.floor(new Date().getTime() / 1000 + maxAge),
      data: data,
    };

    return token;
  }

  //validate() {}

  //hash() {}

  //encypt() {}

  //decrypt() {}

  //encode() {}

  //decode() {}
}
