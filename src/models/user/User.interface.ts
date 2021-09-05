export interface UserInterface {
  access_token: string;
  expires_in: number;
  jti: string;
  organization: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  user_id: string;
}

export interface UserLoginFormInterface {
  phone: string;
  password: string;
}

export interface UserInfoInterface {
  isUpdatedPassword: boolean;
  userName: string;
  portrait: string;
}
