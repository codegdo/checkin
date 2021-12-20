export interface SignupTokenData {
  username?: string;
}

export interface VerifyTokenData {
  username?: string;
}

export type TokenData = SignupTokenData | VerifyTokenData;