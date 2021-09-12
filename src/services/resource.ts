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
 * @param data {object}
 * @param data.id {string|number}
 * @returns Promise<any>
 */
export function deleteResource(data: any = {}): Promise<any> {
  const { id } = data;
  return fetch(`/boss/resource/${id}`, {}, 'delete');
}
