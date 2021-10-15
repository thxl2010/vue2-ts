/**
 * 资源相关请求模块
 */
import { fetch, fetchJson } from '@/utils/request';
import { ResourceFormInterface } from '@/models/resource/Resource.interface';

/**
 * [按条件分页查询资源](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86/getResourcePagesUsingPOST)
 * @param {object<ResourceFormInterface>} data
 * @returns {Promise<any>}
 */
export function getResourcePages(data: ResourceFormInterface): Promise<any> {
  return fetchJson('/boss/resource/getResourcePages', data, 'post');
}

/**
 * [删除资源](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86/deleteUsingDELETE_1)
 * @param {object} data
 * @param {string|number} data.id
 * @returns {Promise<any>}
 */
export function deleteResource(data: any = {}): Promise<any> {
  const { id } = data;
  return fetch(`/boss/resource/${id}`, {}, 'delete');
}

/**
 * [获取资源](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86/getByIdUsingGET_2)
 * @param {object} data
 * @param {string|number} data.id
 * @returns {Promise<any>}
 */
export function getResourceById(data: any = {}): Promise<any> {
  const { id } = data;
  return fetch(`/boss/resource/${id}`, {}, 'get');
}

/**
 * [保存或者更新资源](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86/saveOrUpdateUsingPOST_2)
 * @param {object} data
 * @param {string|number} [data.id] - 资源ID，新建时为空
 * @param {string} data.name
 * @param {string} data.url
 * @param {number} data.categoryId
 * @param {string} [data.description]
 * @returns {Promise<any>}
 */
export function saveOrUpdateResource(data: any = {}): Promise<any> {
  return fetchJson('/boss/resource/saveOrUpdate', data, 'post');
}

/**
 * [给角色分配资源](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86/allocateRoleResourcesUsingPOST)
 * @param {object} data
 * @param {number|string} data.userId
 * @param {array} data.resourceIdList
 * @returns {Promise<any>}
 */
export function allocateRoleResources(data: any = {}): Promise<any> {
  return fetchJson('/boss/resource/allocateRoleResources', data, 'post');
}
