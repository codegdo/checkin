import { JwtSecretRequestType } from "@nestjs/jwt";
import * as jwt from 'jsonwebtoken';

export default {
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
        // retrieve signing key dynamically
        return JSON.parse(`"${process.env.JWT_PRIVATE_KEY}"`);
      case JwtSecretRequestType.VERIFY:
        // retrieve public key for verification dynamically
        return JSON.parse(`"${process.env.JWT_PUBLIC_KEY}"`);
      default:
        // retrieve secret dynamically
        return process.env.JWT_SECRET;
    }
  },
}