export enum ProfileAction {
  GET_PROFILE = 'profile:getProfile',
  UPDATE_PROFILE = 'profile:updateProfile',
}

export enum UserAction {
  GET_ALL_USER = 'users:getAllUser',
  GET_USER = 'users:getUser',
  CREATE_USER = 'users:createUser',
  UPDATE_USER = 'users:updateUser',
  DELETE_USER = 'users:deleteUser',
}

export type PermissionAction = ProfileAction | UserAction;
export type PermissionSubject = string | string[];