import { fetch, fetchJson } from '@/utils/request';

/**
 * [查询资源分类列表](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86/getCategoriesUsingGET)
 * @param {object} data
 * @param {string|number} data?.resourceId
 * @returns {Promise<any>}
 */
export function getAllResourceCategories(data: any = {}): Promise<any> {
  return fetch('/boss/resource/category/getAll', data, 'get');
}

/**
 * [保存或更新资源分类](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86/saveOrUpdateCategoryUsingPOST)
 * @param {object} data
 * @param {string|number} [data?.id]
 * @param {string} [data.name]
 * @param {number} [data.sort]
 * @returns {Promise<any>}
 */
export function saveOrUpdateResourceCategory(data: any = {}): Promise<any> {
  return fetchJson('/boss/resource/category/saveOrderUpdate', data, 'post');
}

/**
 * [删除资源分类，如果资源分类下有资源，不允许删除](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86/deleteByIdUsingDELETE)
 * @param {object} data
 * @param {string|number} data.id
 * @returns {Promise<any>}
 */
export function deleteResourceCategory(data: any = {}): Promise<any> {
  const { id } = data;
  return fetch(`/boss/resource/category/${id}`, data, 'delete');
}
