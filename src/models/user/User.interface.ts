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
  mobile: string;
  password: string;
}

export interface UserInfoInterface {
  id: string;
  name: string;
  mobile: string;
  avatar: string;
}
