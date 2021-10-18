import { fetch, fetchJson } from '@/utils/request';

/**
 * [分页查询课程信息](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%AF%BE%E7%A8%8B/getQueryCoursesUsingPOST)
 * @param {object} data
 * @param {string} [data?.courseName]
 * @param {number} [data?.status]
 * @param {number} [data?.currentPage]
 * @param {number} [data?.pageSize]
 * @returns {Promise<any>}
 */
export function getQueryCourses(data: any = {}): Promise<any> {
  return fetchJson('/boss/course/getQueryCourses', data, 'post');
}

/**
 * [课程上下架](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%AF%BE%E7%A8%8B/changeStateUsingGET)
 * @param {object} data
 * @param {string} [data?.courseId]
 * @param {number} [data?.status] - 课程状态，0-草稿，1-上架
 * @returns {Promise<any>}
 */
export function changeState(data: any = {}): Promise<any> {
  return fetch('/boss/course/changeState', data, 'get');
}
