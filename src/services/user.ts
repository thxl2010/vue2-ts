/**
 * 用户相关请求模块
 */
import { fetch, fetchJson } from '@/utils/request';
import {
  UserLoginFormInterface,
  UsersQueryFormInterface,
} from '@/models/user/User.interface';

export function login(data: UserLoginFormInterface): Promise<any> {
  return fetch('/front/user/login', data, 'post');
}

export function getUserInfo(): Promise<any> {
  return fetch('/front/user/getInfo', null, 'get');
}

/**
 * [分页查询用户信息](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E7%94%A8%E6%88%B7%E6%8E%A5%E5%8F%A3/getUserPagesUsingPOST)
 * @returns {Promise<any>}
 */
export function getUserPages(data: UsersQueryFormInterface): Promise<any> {
  return fetchJson('/boss/user/getUserPages', data, 'post');
}

/**
 * [封禁用户](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E7%94%A8%E6%88%B7%E6%8E%A5%E5%8F%A3/forbidUserUsingPOST)
 * @param {object} data
 * @param {string|number} data.userId
 * @returns Promise<any>
 */
export function forbidUser(data: any): Promise<any> {
  return fetchJson('/boss/user/forbidUser', data, 'post');
}

/**
 * [启用](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E7%94%A8%E6%88%B7%E6%8E%A5%E5%8F%A3/enableUserUsingGET)
 * @param {object} data
 * @param {string|number} data.userId
 * @returns Promise<any>
 */
export function enableUser(data: any): Promise<any> {
  return fetch('/boss/user/enableUser', data, 'get');
}
