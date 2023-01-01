export enum ProfileAction {
  GET_PROFILE = 'profile:getProfile',
  UPDATE_PROFILE = 'profile:updateProfile',
}

export enum InviteAction {
  GET_INVITE = 'invite:getInvite',
}

export type PermissionAction = ProfileAction | InviteAction;
export type PermissionSubject = string | string[];

interface CaslPermission {
  action: PermissionAction;
  // In our database, Invoice, Project... are called "object"
  // but in CASL they are called "subject"
  subject: string;
}
