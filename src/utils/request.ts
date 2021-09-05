import axios, {
  AxiosRequestConfig,
  Method,
  AxiosPromise,
  AxiosResponse,
} from 'axios';
import JSONbig from 'json-bigint';
import qs from 'qs';
import { isJson } from './index';
import store from '@/store/index';
import { SET_USER } from '@/store/types';
import { Message } from 'element-ui';
import router from '@/router/index';

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
    if (store.state.user) {
      config.headers.Authorization = store.state.user.access_token;
    }
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
function redirectLogin() {
  router.push({
    name: 'login',
    query: { redirect: router.currentRoute.fullPath },
  });
}

function refreshToken() {
  return axios.create().post('/front/user/refresh_token', {
    data: qs.stringify({
      refreshtoken: store.state.user?.refresh_token,
    }),
  });
}

let isRefresing = false;
let requests: Array<() => void> = []; // 存储刷新 Token 期间挂起的请求
request.interceptors.response.use(
  (res: AxiosResponse): any => {
    console.log('axios.interceptors.response : res : ', res);
    const data = res.data;
    const { state: status, success, content /* , message */ } = data;
    if (success) {
      return content;
    } else if (status === 400) {
      Message.error('请求参数错误');
    } else if (status === 401) {
      // Token 无效: 未提供、无效、过期
      if (!store.state.user) {
        redirectLogin();
        return Promise.reject(data);
      }

      // 尝试刷新获取新的 token
      if (!isRefresing) {
        isRefresing = true;
        refreshToken()
          .then((result) => {
            const { data } = result;
            if (!data.success) {
              throw new Error('刷新 Token 失败');
            }
            // ! 把刷新获取到的 access_token 更新
            store.commit(SET_USER, data.content);
            // 刷新状态下，挂起的请求重新发出
            requests.forEach((cb) => cb());
            requests = [];
            // ! 把本次失败的请求重新发出
            return request(res.config);
          })
          .catch((err) => {
            console.log('refreshToken err :', err);
            // 清除当前登录用户状态
            store.commit(SET_USER, null);
            // 跳转到登录页
            redirectLogin();

            return Promise.reject(data);
          })
          .finally(() => {
            isRefresing = false;
          });
      }

      // 刷新状态下，把请求挂起放到 requests 数组中
      return new Promise((resolve) => {
        requests.push(() => {
          resolve(request(res.config));
        });
      });
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员');
    } else if (status === 404) {
      Message.error('请求资源不存在');
    } else if (status >= 500) {
      Message.error('服务器错误，请联系管理员');
    }
    return Promise.reject(data);
  },
  async (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status } = error.response;
      if (status === 400) {
        Message.error('请求参数错误');
      } else if (status === 401) {
        // Token 无效: 未提供、无效、过期
        if (!store.state.user) {
          redirectLogin();
          return Promise.reject(error);
        }

        // 尝试刷新获取新的 token
        if (!isRefresing) {
          isRefresing = true;
          refreshToken()
            .then((res) => {
              const { data } = res;
              if (!data.success) {
                throw new Error('刷新 Token 失败');
              }
              // ! 把刷新获取到的 access_token 更新
              store.commit(SET_USER, data.content);
              // 刷新状态下，挂起的请求重新发出
              requests.forEach((cb) => cb());
              requests = [];
              // ! 把本次失败的请求重新发出
              return request(error.config);
            })
            .catch((err) => {
              console.log('refreshToken err :', err);
              // 清除当前登录用户状态
              store.commit(SET_USER, null);
              // 跳转到登录页
              redirectLogin();

              return Promise.reject(error);
            })
            .finally(() => {
              isRefresing = false;
            });
        }

        // 刷新状态下，把请求挂起放到 requests 数组中
        return new Promise((resolve) => {
          requests.push(() => {
            resolve(request(error.config));
          });
        });
      } else if (status === 403) {
        Message.error('没有权限，请联系管理员');
      } else if (status === 404) {
        Message.error('请求资源不存在');
      } else if (status >= 500) {
        Message.error('服务器错误，请联系管理员');
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  }
);

const fetch = (
  url: string,
  params: any,
  method: Method = 'get'
): AxiosPromise => {
  const config: AxiosRequestConfig = {
    method,
    url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  };
  if (method === 'get') {
    config.params = params;
  } else {
    config.data = params;
  }

  return request(config);
};

const fetchJson = (
  url: string,
  params: any,
  method: Method = 'get'
): AxiosPromise => {
  const config: AxiosRequestConfig = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  if (method === 'get') {
    config.params = params;
  } else {
    config.data = params;
  }

  return request(config);
};

export default request;

export { fetch, fetchJson };
