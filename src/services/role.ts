import { fetch, fetchJson } from '@/utils/request';
import { RoleFormInterface } from '@/models/role/Role.interface';

/**
 * [条件查询角色](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86/getRolePagesUsingPOST)
 * @param {object} data
 * @param {string} [data?.code]
 * @param {number|string} [data?.id]
 * @param {string} [data?.name]
 * @param {string} [data?.startCreateTime]
 * @param {string} [data?.endCreateTime]
 * @param {number} [data?.current]
 * @param {number} [data?.size]
 * @returns {Promise<any>}
 */
export function getRolesByCondition(data: any = {}): Promise<any> {
  return fetchJson('/boss/role/getRolePages', data, 'post');
}

/**
 * [保存或者更新角色](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86/saveOrUpdateUsingPOST_3)
 * @param {object<RoleFormInterface>} data
 * @param {string|number} [data?.id]
 * @param {string} [data.name]
 * @param {string} [data.code]
 * @param {string} [data.description]
 * @returns {Promise<any>}
 */
export function saveOrUpdateRole(data: RoleFormInterface = {}): Promise<any> {
  return fetchJson('/boss/role/saveOrUpdate', data, 'post');
}

/**
 * [删除角色](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86/deleteUsingDELETE_2)
 * @param {object} data
 * @param {number|string} data.id
 * @returns {Promise<any>}
 */
export function deleteRole(data: any = {}): Promise<any> {
  const { id } = data;
  return fetch(`/boss/role/${id}`, data, 'delete');
}

/**
 * [给用户分配角色](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86/allocateUserRolesUsingPOST)
 * @param {object} data
 * @param {number|string} data.userId
 * @param {array} data.roleIdList
 * @returns {Promise<any>}
 */
export function allocateUserRoles(data: any = {}): Promise<any> {
  return fetchJson('/boss/role/allocateUserRoles', data, 'post');
}
