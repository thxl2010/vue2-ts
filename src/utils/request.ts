import axios from 'axios';
import JSONbig from 'json-bigint';
import qs from 'qs';
import { isJson } from './index';

// ! [axios#983: json parse bigint](https://github.com/axios/axios/issues/983)
const JSONbigString = JSONbig({ storeAsString: true });
axios.defaults.transformResponse = [
  function (data) {
    // Do whatever you want to transform the data
    return JSONbigString.parse(data);
  },
];

const request = axios.create({
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      if (isJson(config)) {
        config.data = JSON.stringify(config.data);
      } else {
        config.data = qs.stringify(config.data, {
          arrayFormat: 'repeat', // indices/brackets/repeat
          allowDots: true,
        });
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // console.log('axios.interceptors.response : res : ', res);
    const data = res.data;
    if (data.status !== 200 && data.status !== 'OK') {
      return Promise.reject(data);
    }
    return data.data;
  },
  (error) => Promise.reject(error)
);
export default request;
