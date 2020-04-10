import request from '_utils/request';

// 顶部轮播广告
export function getIndexRotation(params) {
    return request({
        url: '/api.php/index/index/IndexRotation',
        method: 'get',
        params: params
    });
}

// 获取短信验证码
export function getMsgCode(data) {
    return request({
        url: '/api.php/common/common/mygetcode',
        method: 'post',
        data: data
    });
}

// 获取图文验证码
export function getImgCode() {
    return request({
        url: '/api.php/common/common/selfverify',
        method: 'get',
        responseType: 'arraybuffer'
    });
}

// 验证图文验证码
export function checkImgCode(params) {
    return request({
        url: '/api.php/common/common/checkImgCode',
        method: 'get',
        params: params
    });
}

// 验证手机短信
export function checkCode(data) {
    return request({
        url: '/api.php/common/common/checkCode',
        method: 'post',
        data: data
    });
}

// 实名信息验证
export function checkRealName(params) {
    return request({
        url: '/api.php/member/member/check_info',
        method: 'get',
        params: params
    });
}

// 实名表单提交
export function setRealName(data) {
    return request({
        url: '/api.php/member/rong/shiming',
        method: 'post',
        data: data
    });
}

// 贷款、信用卡产品申请---本地
export function applyLocalProduct(data) {
    return request({
        url: '/api.php/tuiguang/tuiguang/ajaxCheckInfo',
        method: 'post',
        data: data
    });
}

// 贷款、信用卡产品申请---本地
export function applyOtherProduct(data) {
    return request({
        url: '/api.php/item/api/applyInfo',
        method: 'post',
        data: data
    });
}

// 上传头像
export function uploadFile(data) {
    return request({
        url: '/api.php/common/common/upload',
        method: 'post',
        data: data
    });
}

// 查询支付订单是否成功
export function getPayOrder(data) {
    return request({
        url: '/api.php/common/common/getOrder',
        method: 'post',
        data: data
    });
}

// 版本更新
export function getVersion(params) {
    return request({
        url: '/api.php/common/common/getVersion',
        method: 'get',
        params: params
    });
}

// 获取优惠卷
export function getCoupon(data) {
    return request({
        url: '/api.php/member/member/getCoupon',
        method: 'post',
        data: data
    });
}

// 获取支付优惠卷
export function getPayCoupon(data) {
    return request({
        url: '/api.php/common/common/getCoupon',
        method: 'post',
        data: data
    });
}

// 获取分类信息
export function getContent(params) {
    return request({
        url: '/api.php/news/content/getContentByCate',
        method: 'get',
        params: params
    });
}

// 获取分类信息详情
export function getContentDetail(params) {
    return request({
        url: '/api.php/news/content/getContentDetail',
        method: 'get',
        params: params
    });
}

// 基础各种信息获取
export function getBaseicInfo(params) {
    return request({
        url: '/api.php/common/common/getBaseicInfo',
        method: 'get',
        params: params
    });
}

// 当前产品是否需要交押金
export function checkYjToProduct(data) {
    return request({
        url: '/api.php/item/item/checkYJ',
        method: 'post',
        data: data
    });
}

// 分享产品的人是否已经交过押金
export function checkYJ(data) {
    return request({
        url: '/api.php/tuiguang/tuiguang/checkYJ',
        method: 'post',
        data: data
    });
}

// 押金弹窗提示信息
export function getCpaText(params) {
    return request({
        url: '/api.php/item/item/getCpa',
        method: 'get',
        params: params
    });
}

// 支付押金
export function payYJ(data) {
    return request({
        url: '/api.php/item/item/payYJ',
        method: 'post',
        data: data
    });
}
