export interface TUser {
  name: string;
  login: string;
  password: string;
}

export interface TUserModel extends TUser {
  id: string;
}

export interface TUserResponse extends Omit<TUser, 'password'> {
  id: string;
}
