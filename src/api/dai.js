import request from '_utils/request';

// 贷款商品种类
export function getAllCates(params) {
    return request({
        url: '/api.php/item/item/getALLCates',
        method: 'get',
        params: params
    });
}

// 贷款商品列表
export function getProList(data) {
    return request({
        url: '/api.php/item/item/getItemByCate',
        method: 'post',
        data: data
    });
}


// 贷款商品详情
export function getItemDetail(data) {
    return request({
        url: '/api.php/tuiguang/tuiguang/itemDetail',
        method: 'post',
        data: data
    });
}
