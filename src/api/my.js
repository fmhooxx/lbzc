import request from '_utils/request';

// 获取个人信息
export function getMemberInfo(params) {
    return request({
        url: '/api.php/member/member/info',
        method: 'get',
        params: params
    });
}

// 获取菜单按钮
export function getMenus(params) {
    return request({
        url: '/api.php/member/member/getMenu',
        method: 'get',
        params: params
    });
}


// 常见问题
export function getProblem(params) {
    return request({
        url: '/api.php/news/content/getContentByCate',
        method: 'get',
        params: params
    });
}



// 常见问题
export function getApplyList(data) {
    return request({
        url: '/api.php/member/rong/getApplyList',
        method: 'post',
        data: data
    });
}


// 个人信息修改


export function updateUserInfo(data) {
    return request({
        url: '/api.php/member/rong/save',
        method: 'post',
        data: data
    });
}



// 免费升级代理
export function upDaili(data) {
    return request({
        url: '/api.php/member/rong/upDaili',
        method: 'post',
        data: data
    });
}