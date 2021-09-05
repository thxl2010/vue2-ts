/**
 * 用户相关请求模块
 */
import { fetch } from '@/utils/request';
import { UserLoginFormInterface } from '@/models/user/User.interface';

export function login(data: UserLoginFormInterface): Promise<any> {
  return fetch('/front/user/login', data, 'post');
}

export function getUserInfo(): Promise<any> {
  return fetch('/front/user/getInfo', null, 'get');
}
