import { fetch, fetchJson, upload } from '@/utils/request';

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

/**
 * [上传图片](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%AF%BE%E7%A8%8B/uploadUsingPOST)
 * @param {object<FormData>} data
 * @param {ProgressEvent} HTML5 新增的上传响应事件：progress
 * @returns {Promise<any>}
 */
export function uploadCourseImage(
  data: any,
  onUploadProgress: (progressEvent: ProgressEvent) => void
): Promise<any> {
  return upload('/boss/course/upload', data, onUploadProgress);
}

/**
 * [保存或者更新课程信息](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%AF%BE%E7%A8%8B/saveOrUpdateCourseUsingPOST)
 * @param {object} data
 * @returns {Promise<any>}
 */
export function saveOrUpdateCourse(data: any = {}): Promise<any> {
  return fetchJson('/boss/course/saveOrUpdateCourse', data, 'post');
}

/**
 * [通过课程Id获取课程信息](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E8%AF%BE%E7%A8%8B/getCourseByIdUsingGET)
 * @param {object} data
 * @param {string | number} data.courseId
 * @returns {Promise<any>}
 */
export function getCourseById(data: any = {}): Promise<any> {
  return fetch('/boss/course/getCourseById', data, 'get');
}
