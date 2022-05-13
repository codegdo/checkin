import { registerAs } from '@nestjs/config';
import { JwtSecretRequestType } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

import { getKeyStore } from 'src/utils';

export const jwtConfig = registerAs('jwt', async () => {
  const secret = process.env.JWT_SECRET;
  const { privateKey = secret, publicKey = secret } = process.env.JOSE_KEY_STORE
    ? await getKeyStore(process.env.JOSE_KEY_STORE)
    : {};

  console.log(publicKey);

  return {
    secret,
    privateKey,
    publicKey,
    secretOrKeyProvider: (
      requestType: JwtSecretRequestType,
      tokenOrPayload: string | Object | Buffer,
      verifyOrSignOrOptions?: jwt.VerifyOptions & jwt.SignOptions,
    ) => {
      switch (requestType) {
        case JwtSecretRequestType.SIGN:
          const { algorithm } = verifyOrSignOrOptions;
          return algorithm == 'RS256' ? privateKey : secret;
        case JwtSecretRequestType.VERIFY:
          const { algorithms } = verifyOrSignOrOptions;
          return algorithms.includes('RS256') ? publicKey : secret;
        default:
          return secret;
      }
    },
  };
});
