/**
 * 菜单相关请求模块
 */
import { fetch, fetchJson } from '@/utils/request';
import { MenuFormInterface } from '@/models/menu/Menu.interface';

/**
 * [保存或新增菜单](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/saveOrUpdateUsingPOST_1)
 * @param {MenuFormInterface} data
 * @returns {Promise<any>}
 */
export function createMenu(data: MenuFormInterface): Promise<any> {
  return fetchJson('/boss/menu/saveOrUpdate', data, 'post');
}

/**
 * [获取编辑菜单页面信息](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/getEditMenuInfoUsingGET)
 * @param {object} data
 * @param {string|number} data.id
 * @returns {Promise<any>}
 */
export function getEditMenuInfo(data: any = { id: -1 }): Promise<any> {
  return fetchJson('/boss/menu/getEditMenuInfo', data, 'get');
}

/**
 * [获取所有菜单](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/getAllUsingGET)
 * @param {object} data
 * @param {string|number} data.id
 * @returns {Promise<any>}
 */
export function getAllMenu(data: any = {}): Promise<any> {
  return fetchJson('/boss/menu/getAll', data, 'get');
}

/**
 * [删除菜单](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/deleteUsingDELETE)
 * @param {object} data
 * @param {string|number} data.id
 * @returns {Promise<any>}
 */
export function deleteMenu(data: any = {}): Promise<any> {
  const { id } = data;
  return fetch(`/boss/menu/${id}`, {}, 'delete');
}

/**
 * [获取所有菜单并按层级展示](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/getMenuNodeListUsingGET)
 * @returns {Promise<MenuNodeListInterface[]>}
 */
export function getMenuNodeList(): Promise<any> {
  return fetch('/boss/menu/getMenuNodeList', {}, 'get');
}

/**
 * [给角色分配菜单](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/allocateRoleMenusUsingPOST)
 * @param {object} data
 * @param data.roleId {number|string}
 * @param data.menuIdList {array}
 * @returns {Promise<any>}
 */
export function allocateRoleMenus(data: any = {}): Promise<any> {
  return fetchJson('/boss/menu/allocateRoleMenus', data, 'post');
}

/**
 * [获取角色拥有的菜单列表](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/getRoleMenusUsingGET)
 * @param {object} data
 * @param data.roleId {number|string}
 * @returns {Promise<any>}
 */
export function getRoleMenus(data: any = {}): Promise<any> {
  return fetch('/boss/menu/getRoleMenus', data, 'get');
}
