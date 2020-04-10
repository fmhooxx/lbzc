import request from '_utils/request';

// 获取平台公告
export function getIndexNotice(params) {
    return request({
        url: 'api.php/index/index/IndexNotice',
        method: 'get',
        params: params
    });
}

// 获取随机的四个商品
export function getGoodProduct(params) {
    return request({
        url: '/api.php/index/index/IndexChange',
        method: 'get',
        params: params
    });
}

// 商品种类
export function getCategory(params) {
    return request({
        url: '/api.php/index/index/getMiddleMenu',
        method: 'get',
        params: params
    });
}

// 获取贷款数据
export function getDaiList(data) {
    return request({
        url: '/api.php/index/index/IndexItems',
        method: 'post',
        data: data
    });
}

// 推广素材种类
export function getMaterialCate(params) {
    return request({
        url: '/api.php/tuiguang/tuiguang/tuiguangCate',
        method: 'get',
        params: params
    });
}

// 推广素材列表
export function getMaterialList(data) {
    return request({
        url: '/api.php/tuiguang/tuiguang/tuiguangSucai',
        method: 'post',
        data: data
    });
}

// 推广素材生成推荐海报
export function makePoster(data) {
    return request({
        url: '/api.php/tuiguang/tuiguang/getBac',
        method: 'post',
        data: data
    });
}


// 消息弹窗（轮播图）
export function getMessagePop(params) {
    return request({
        url: '/api.php/index/index/IndexPopup',
        method: 'get',
        params: params
    });
}


// 获取优惠卷第一步
export function getCouponOne(params) {
    return request({
        url: '/api.php/member/coupon/checkTui',
        method: 'get',
        params: params
    });
}

// 获取优惠卷第二步
export function getCouponTwo(data) {
    return request({
        url: '/api.php/index/index/getCoupon',
        method: 'post',
        data: data
    });
}