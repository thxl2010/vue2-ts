/**
 * 用户相关请求模块
 */
import request, { fetch } from '@/utils/request';
import {
  UserLoginFormInterface,
  UserInterface,
} from '@/models/user/User.interface';
import store from '@/store/index';

export function login(data: UserLoginFormInterface): Promise<any> {
  return fetch('/api/login', data, 'post');
}

export function getUserInfo(): Promise<any> {
  return request.get('/api/getUser', {
    headers: {
      Authorization: (store.state.user as UserInterface).access_token,
    },
  });
}
