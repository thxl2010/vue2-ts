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
