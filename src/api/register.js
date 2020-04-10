import request from '_utils/request';

// 注册
export function register(data) {
    return request({
        url: '/api.php/user/Register/register',
        method: 'post',
        data: data
    });
}
