import request from '_utils/request';

// 征信主页
export function getZhengxinList(params) {
    return request({
        url: '/api.php/common/common/getZhengxinList',
        method: 'get',
        params: params
    });
}

// 提交征信表单
export function sumitZXForm(data) {
    return request({
        url: '/api.php/zhengxin/zhengxin/addDo',
        method: 'post',
        data: data
    });
}

// 征信支付接口
export function payZx(params) {
    return request({
        url: '/api.php/zhengxin/zhengxin/payZx',
        method: 'get',
        params: params
    });
}

// 征信二次支付接口
export function payZxSec(params) {
    return request({
        url: '/api.php/zhengxin/zhengxin/payZx_sec',
        method: 'get',
        params: params
    });
}

// 征信历史记录列表
export function getRecordList(data) {
    return request({
        url: '/api.php/zhengxin/zhengxin/getList',
        method: 'post',
        data: data
    });
}

// 征信样例报告
export function getReportDemo(data) {
    return request({
        url: '/api.php/zhengxin/zhengxin/getZhengxinDemo',
        method: 'post',
        data: data
    });
}

// 具体征信报表详情页面
export function getReportDetail(params) {
    return request({
        url: '/api.php/zhengxin/zhengxin/getDetail',
        method: 'get',
        params: params
    });
}

// 个人信息三要素
export function getUserInfo(params) {
    return request({
        url: '/api.php/member/member/getSimpleInfo',
        method: 'get',
        params: params
    });
}
