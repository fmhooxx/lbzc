import request from '_utils/request';

// card
export function getCardDatas(data) {
    return request({
        url: '/api.php/item/item/getCardDatas',
        method: 'post',
        data: data
    });
}

// hot bank
export function getBankDatas(data) {
    return request({
        url: '/api.php/item/item/getCardDatas',
        method: 'post',
        data: data
    });
}
// reward content
export function getRewardDatas(params) {
    return request({
        url: '/api.php/news/news/getSimpleNews',
        method: 'get',
        params: params
    });
}

// 贷款推荐产品
export function getRecommend(data) {
    return request({
        url: '/api.php/tuiguang/tuiguang/getRec',
        method: 'post',
        data: data
    });
}

// 贷款商品（大额、小额）
export function getDaiProduct(data) {
    return request({
        url: '/api.php/tuiguang/tuiguang/getItems',
        method: 'post',
        data: data
    });
}

// 产品详情
export function getProductDetail(data) {
    return request({
        url: '/api.php/item/item/itemDetail',
        method: 'post',
        data: data
    });
}


// 产品海报
export function getProductPost(data) {
    return request({
        url: '/api.php/item/item/itemHaibao',
        method: 'post',
        data: data
    });
}
