
import request from '_utils/request';

// 热门关键词
export function getHotWord(params) {
    return request({
        url: 'api.php/item/item/get_hot_keywords',
        method: 'get',
        params: params
    });
}

// 热门搜索
export function getSearch(params) {
    return request({
        url: '/api.php/item/item/getSearch',
        method: 'get',
        params: params
    });
}
