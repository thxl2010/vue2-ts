/**
 * 用户相关请求模块
 */
import { fetch } from '@/utils/request';
import { UserLoginFormInterface } from '@/models/user/User.interface';

export function login(data: UserLoginFormInterface): Promise<any> {
  return fetch('/api/login', data, 'post');
}
