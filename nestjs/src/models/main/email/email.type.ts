export type EmailData = {
  id: number;
  name: string;
  type: string;
  fromName: string;
  fromAddress: string;
  replyTo: string;
  recipients: string;
  ccRecipients: string;
  bccRecipients: string;
  smsRecipients: string;
  subject: string;
  body: string;
  message: string;
  isActive: boolean;
  bizId: number;
}