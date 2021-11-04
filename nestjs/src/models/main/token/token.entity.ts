import { BaseEntity, Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import crypto from 'crypto';
import { TokenDto } from './dtos/token.dto';

export interface TokenData {
  username?: string;
}

@Entity({ database: 'main', schema: 'sec', name: 'token' })
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'expired_at' })
  expiredAt: number;

  @Column({ type: 'jsonb', name: 'data' })
  data?: TokenData;

  // create({ data = '{}', maxAge = 86400 }: TokenData): TokenDto {
  //   return {
  //     id: crypto.randomBytes(16).toString('hex'),
  //     expiredAt: Math.floor(new Date().getTime() / 1000 + maxAge),
  //     data: data,
  //   };
  // }

  //validate() {}

  //hash() {}

  //encypt() {}

  //decrypt() {}

  //encode() {}

  //decode() {}
}
