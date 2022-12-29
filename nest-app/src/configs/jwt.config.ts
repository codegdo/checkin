import { registerAs } from '@nestjs/config';
import { JwtSecretRequestType } from '@nestjs/jwt';

export const jwtConfig = registerAs('jwt', () => {
  const secret = process.env.JWT_SECRET;
  const privateKey = process.env.JWT_PRIVATE_KEY;
  const publicKey = process.env.JWT_PUBLIC_KEY;

  return {
    secret,
    privateKey,
    publicKey,
    audience: process.env.CLIENT_HOST,
    issuer: process.env.CLIENT_HOST,
    expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
    secretOrKeyProvider: (
      requestType: JwtSecretRequestType,
      tokenOrPayload: string | Object | Buffer,
      verifyOrSignOrOptions?: any,
    ) => {
      switch (requestType) {
        case JwtSecretRequestType.SIGN:
          const { privateKey } = verifyOrSignOrOptions;
          //console.log(verifyOrSignOrOptions);
          return privateKey || secret;
        case JwtSecretRequestType.VERIFY:
          const { publicKey } = verifyOrSignOrOptions;
          //console.log(verifyOrSignOrOptions);
          return publicKey || secret;
        default:
          return secret;
      }
    },
  };
  // return {
  //   secret: process.env.JWT_SECRET,
  //   audience: process.env.CLIENT_HOST,
  //   issuer: process.env.CLIENT_HOST,
  //   accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
  //   privateKey: process.env.JWT_PRIVATE_KEY,
  //   publicKey: process.env.JWT_PUBLIC_KEY,
  // };
});
