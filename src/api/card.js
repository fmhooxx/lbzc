import request from '_utils/request';

// hot catd
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


// 信用卡商品详情
export function getItemDetail(data) {
    return request({
        url: '/api.php/tuiguang/tuiguang/itemDetail',
        method: 'post',
        data: data
    });
}