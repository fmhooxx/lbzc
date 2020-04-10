import request from '_utils/request';

// hot catd
export function getSimpleNews(params) {
    return request({
        url: '/api.php/news/news/getSimpleNews',
        method: 'get',
        params: params
    });
}

