import { registerAs } from "@nestjs/config";
import { JwtSecretRequestType } from "@nestjs/jwt";
import * as jwt from 'jsonwebtoken';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: 6000,
    algorithm: 'RS256',
  },
  publicKey: JSON.parse(`"${process.env.JWT_PUBLIC_KEY}"`),
  privateKey: JSON.parse(`"${process.env.JWT_PRIVATE_KEY}"`),

  secretOrKeyProvider: (
    requestType: JwtSecretRequestType,
    tokenOrPayload: string | Object | Buffer,
    verifyOrSignOrOptions?: jwt.VerifyOptions | jwt.SignOptions
  ) => {
    switch (requestType) {
      case JwtSecretRequestType.SIGN:
        return JSON.parse(`"${process.env.JWT_PRIVATE_KEY}"`);
      case JwtSecretRequestType.VERIFY:
        return JSON.parse(`"${process.env.JWT_PUBLIC_KEY}"`);
      default:
        return process.env.JWT_SECRET;
    }
  },
}))