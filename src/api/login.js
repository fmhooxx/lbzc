import request from '_utils/request';

// 获取时间戳
export function getTimestamp(params) {
    return request({
        url: '/api.php/Tool/tool/timestamp',
        method: 'get',
        params: params
    });
}

// 获取个人信息
export function getMemberInfo(params) {
    return request({
        url: '/api.php/member/member/info',
        method: 'get',
        params: params
    });
}

// user login
export function userlogin(params) {
    return request({
        url: '/api.php/user/usercenter/userlogin',
        method: 'get',
        params: params
    });
}


// user login rongkedian
export function rongLogin(params) {
    return request({
        url: '/api.php/user/usercenter/rongLogin',
        method: 'get',
        params: params
    });
}




