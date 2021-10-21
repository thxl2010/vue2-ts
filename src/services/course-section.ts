import { fetch, fetchJson } from '@/utils/request';

/**
 * [通过课程Id获取课程章节内容](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E7%AB%A0%E8%8A%82%E5%86%85%E5%AE%B9/getSectionAndLessonUsingGET)
 * @param {object} data
 * @param {string | number} data.courseId
 * @returns {Promise<any>}
 */
export function getSectionAndLesson(data: any = {}): Promise<any> {
  return fetch('/boss/course/section/getSectionAndLesson', data, 'get');
}

/**
 * [保存或更新章节](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E7%AB%A0%E8%8A%82%E5%86%85%E5%AE%B9/saveOrUpdateSectionUsingPOST)
 * @param {object} data
 * @param {string | number} [data.id]
 * @param {string | number} [data.courseId]
 * @param {string} [data.courseName]
 * @param {string} [data.sectionName]
 * @param {string} [data.description]
 * @param {number} [data.orderNum] - 排序字段
 * @param {number} [data.status] - 状态，0:隐藏；1：待更新；2：已发布
 * @returns {Promise<any>}
 */
export function saveOrUpdateSection(data: any = {}): Promise<any> {
  return fetchJson('/boss/course/section/saveOrUpdateSection', data, 'post');
}

/**
 * [getBySectionId](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E7%AB%A0%E8%8A%82%E5%86%85%E5%AE%B9/getBySectionIdUsingGET)
 * @param {object} data
 * @param {string | number} sectionId
 */
export function getSectionById(data: any = {}): Promise<any> {
  return fetch('/boss/course/section/getBySectionId', data, 'get');
}
