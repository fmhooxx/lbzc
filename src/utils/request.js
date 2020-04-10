import axios from 'axios';
import router from '../router';
import store from '../store';
import { hasInclude } from './func';
import { getToken, removeAll } from './local';
import getRequsetUrl from './requestUrl';

// create an axios instance
const service = axios.create({
    // baseURL: process.env.BASE_URL, // api 的 base_url
    baseURL: getRequsetUrl(),
    // baseURL: 'http://admin.jinrirong.com'
    // baseURL: 'http://admin.xkzdai.com',
    // baseURL: 'https://gadmin.jinrirong.com',
    // withCredentials: true // 跨域请求时发送 cookies
    timeout: 20000 // request timeout
});

// request interceptor
service.interceptors.request.use(
    config => {
        if (config.url.indexOf('bbs') >= 0) {
            config.headers['token'] = getToken();
            if (config.method == 'get') {
                config.params = {
                    ...config.params,
                    client: store.getters.platform,
                    ver: store.getters.version,
                    package: store.getters.packageName
                };
            } else {
                config.data = {
                    ...config.data,
                    client: store.getters.platform,
                    ver: store.getters.version,
                    package: store.getters.packageName
                };
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            }
        } else {
            if (config.method == 'get') {
                if (
                    config.url.indexOf('login') >= 0 ||
                    config.url.indexOf('timestamp') >= 0 ||
                    config.url.indexOf('Login') >= 0
                ) {
                    config.params = {
                        ...config.params,
                        client: store.getters.platform,
                        ver: store.getters.version,
                        package: store.getters.packageName,
                        from_app: 4
                    };
                } else {
                    config.params = {
                        ...config.params,
                        client: store.getters.platform,
                        ver: store.getters.version,
                        package: store.getters.packageName,
                        token: getToken(),
                        from_app: 4
                    };
                }

                config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            } else {
                if (config.data instanceof FormData) {
                    let Data = config.data;
                    Data.append('client', store.getters.platform);
                    Data.append('ver', store.getters.version);
                    Data.append('package', store.getters.packageName);
                    Data.append('token', getToken());
                    Data.append('from_app', 4);
                    config.data = Data;
                    config.headers['Content-Type'] = 'multipart/form-data; charset=UTF-8';
                } else {
                    config.data = {
                        ...config.data,
                        client: store.getters.platform,
                        ver: store.getters.version,
                        package: store.getters.packageName,
                        token: getToken(),
                        from_app: 4
                    };
                    config.headers['Content-Type'] =
                        'application/x-www-form-urlencoded; charset=UTF-8';
                }
            }
        }

        return config;
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        const url = response.request.responseURL;
        if (url.indexOf('/bbs') >= 0) {
            if (res.result != 1) {
                if (res.result == -1) {
                    removeAll();
                    return router.replace('/');
                }
                if (Object.prototype.toString.call(res) == '[object ArrayBuffer]') {
                    return res;
                }
                return Promise.reject(res.message || 'error');
            } else {
                let arr = [
                    '/getindexPosts',
                    '/getComment',
                    '/getMyList',
                    '/getPosts',
                    '/getsearch'
                ];
                if (hasInclude(arr, url)) {
                    return response.data;
                }
                return res.data;
            }
        } else {
            let arr = [
                '/Register/register',
                '/member/tixian',
                '/tuiguang/itemDetail',
                '/tuiguang/ajaxCheckInfo',
                '/api/applyInfo',
                '/item/checkYJ'
            ];
            if (hasInclude(arr, url)) {
                return response.data;
            }
            if (res.result != 100000) {
                if (res.result == 100088 || res.result == 100089 || res.result == 100084) {
                    removeAll();
                    return router.replace('/login');
                }
                if (Object.prototype.toString.call(res) == '[object ArrayBuffer]') {
                    return res;
                }
                return Promise.reject(res.message || 'error');
            } else {
                return res.data;
            }
        }
    },
    error => {
        console.log('err' + error); // for debug
        return Promise.reject(error);
    }
);

export default service;
