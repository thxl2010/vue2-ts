import { fetch, fetchJson } from '@/utils/request';

/**
 * [保存或更新课时](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%AF%BE%E6%97%B6%E5%86%85%E5%AE%B9/saveOrUpdateUsingPOST)
 * @param {object} data
 * @param {string | number} [data.id]
 * @param {string | number} [data.courseId]
 * @param {string | number} [data.sectionId]
 * @param {string} [data.theme]
 * @param {number} [data.duration] - 课时时长(分钟)
 * @param {boolean} [data.isFree]
 * @param {number} [data.orderNum] - 排序字段
 * @param {number} [data.status] - 课时状态,0-隐藏，1-未发布，2-已发布
 * @returns {Promise<any>}
 */
export function saveOrUpdateLesson(data: any = {}): Promise<any> {
  return fetchJson('/boss/course/lesson/saveOrUpdate', data, 'post');
}
