import { fetch } from '@/utils/request';

/**
 * [查询资源分类列表](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86/getCategoriesUsingGET)
 * @param data {object}
 * @param data?.resourceId {string|number}
 * @returns Promise<any>
 */
export function getAllResourceCategories(data: any = {}): Promise<any> {
  return fetch('/boss/resource/category/getAll', data, 'get');
}
