export enum MessageType {
  MESSAGE = 'message',
  EMAIL = 'email',
}

export type MessageOptions<T> = {
  type: MessageType;
  context: T;
};

export type VerifyTokenData = {
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
};

export type VerifyMessageKey = {
  key: string;
}

export type VerifyEmailKey = {
  key: string;
  firstName: string;
  lastName: string;
  replyTo: string;
}