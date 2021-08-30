import { AxiosRequestConfig } from 'axios';

export function isJson(req: AxiosRequestConfig): boolean {
  const str = req.headers['Content-Type'] || req.headers['content-type'] || '';
  const contentType = str.split(';')[0];
  return contentType === 'application/json';
}
