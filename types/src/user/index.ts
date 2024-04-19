/**
 * Request
 */
export interface IUser {
  avatar: string;
  bio: string;
  createdAt: string;
  email: string;
  id: string;
  inviterId: null;
  name: string;
  password: string;
  showEmail: boolean;
}

export interface IJwt {
  email: string;
  id: string;
  iat: number;
  exp: number;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
  key: number;
}
