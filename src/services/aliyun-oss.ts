/**
 * 阿里云上传
 */

import { fetch, fetchJson } from '@/utils/request';
import { CourseMediaDTOInterface } from '@/models/course/Course.interface';

/**
 * [获取阿里云图片上传凭证](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E9%98%BF%E9%87%8C%E4%B8%8A%E4%BC%A0/generateAliyunImagUploadAddressAdnAuthUsingGET)
 * @returns {Promise<any>}
 */
export function aliyunImagUploadAddressAdnAuth(): Promise<any> {
  return fetch(
    '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json',
    null,
    'get'
  );
}

/**
 * [获取阿里云视频上传凭证](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E9%98%BF%E9%87%8C%E4%B8%8A%E4%BC%A0/aliyunVideoUploadAddressAdnAuthUsingGET)
 * @param {object} params
 * @param {string} params.fileName
 * @param {string} params.imageUrl
 * @returns {Promise<any>}
 */
export function aliyunVideoUploadAddressAdnAuth(params: any): Promise<any> {
  return fetch(
    '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params,
    'get'
  );
}

/**
 * [阿里云转码请求](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E9%98%BF%E9%87%8C%E4%B8%8A%E4%BC%A0/aliyunTransCodeUsingPOST)
 * @param {CourseMediaDTOInterface} data
 * @returns {Promise<any>}
 */
export function transCodeVideo(data: any): Promise<any> {
  return fetchJson('/boss/course/upload/aliyunTransCode.json', data, 'post');
}

/**
 * [阿里云转码进度](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/%E9%98%BF%E9%87%8C%E4%B8%8A%E4%BC%A0/aliyunTransCodePercentUsingGET)
 * @param {string | number} lessonId
 * @returns {Promise<any>}
 */
export function getAliyunTransCodePercent(
  lessonId: string | number
): Promise<any> {
  return fetch(
    '/boss/course/upload/aliyunTransCodePercent.json',
    { lessonId },
    'get'
  );
}
