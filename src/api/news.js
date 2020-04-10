import request from '_utils/request';

export function getNewsCate(params) {
    return request({
        url: '/api.php/news/news/getNewsCate',
        method: 'get',
        params: params
    });
}


// 新闻轮播
export function getNewSlide(params) {
    return request({
        url: '/api.php/news/news/getNewsTui',
        method: 'get',
        params: params
    });
}


// 新闻列表
export function getNewList(data) {
    return request({
        url: '/api.php/news/news/getList',
        method: 'post',
        data: data
    });
}

// 精华推荐
export function getNewBest(params) {
    return request({
        url: '/api.php/news/news/getNewsTui',
        method: 'get',
        params: params
    });
}

// 新闻详情
export function getNewDetail(data) {
    return request({
        url: '/api.php/news/news/getDetail',
        method: 'post',
        data: data
    });
}