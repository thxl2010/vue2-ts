import { AxiosRequestConfig } from 'axios';

export function isJson(req: AxiosRequestConfig): boolean {
  const str = req.headers['Content-Type'] || req.headers['content-type'] || '';
  const contentType = str.split(';')[0];
  return contentType === 'application/json';
}

export function isForm(req: AxiosRequestConfig): boolean {
  const str = req.headers['Content-Type'] || req.headers['content-type'] || '';
  const contentType = str.split(';')[0];
  return contentType === 'multipart/form-data';
}

export function encodeHtml(str: string): string {
  if (str.length == 0) return '';

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
