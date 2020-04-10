import request from '_utils/request';

// 论坛板块
export function getPlates(params) {
    return request({
        url: '/api.php/bbs/index/getforums',
        method: 'get',
        params: params
    });
}

export function getForumPost(params) {
    return request({
        url: '/api.php/bbs/index/getindexPosts',
        method: 'get',
        params: params
    });
}

// 帖子详情
export function getPostDetail(params) {
    return request({
        url: '/api.php/bbs/detail/getPostData',
        method: 'get',
        params: params
    });
}

// 帖子评论列表
export function getPostComment(params) {
    return request({
        url: '/api.php/bbs/Detail/getComment',
        method: 'get',
        params: params
    });
}

// 笑脸
export function getSmiles(params) {
    return request({
        url: '/api.php/bbs/detail/getSmiles',
        method: 'get',
        params: params
    });
}

// 收藏帖子
export function getFavorite(params) {
    return request({
        url: '/api.php/bbs/favor/Favorite',
        method: 'get',
        params: params
    });
}

// 点赞帖子
export function getLike(params) {
    return request({
        url: '/api.php/bbs/index/addTransmit',
        method: 'get',
        params: params
    });
}

// 回复评论
export function replyPost(data) {
    return request({
        url: '/api.php/bbs/reply/sendComment',
        method: 'post',
        data: data
    });
}

export function getLabel(params) {
    return request({
        url: '/api.php/bbs/list/getListForums',
        method: 'get',
        params: params
    });
}

// 图片长传
export function uploadImage(data) {
    return request({
        url: '/api.php/Common/Oss/oss_uploadImage',
        method: 'post',
        data: data
    });
}

// 发帖
export function sendPost(data) {
    return request({
        url: '/api.php/bbs/posted/sendPostResult',
        method: 'post',
        data: data
    });
}

// 我的发帖
export function getMyPost(params) {
    return request({
        url: '/api.php/bbs/TopicList/getMyList',
        method: 'get',
        params: params
    });
}

// 所有板块信息
export function getAllPlates(params) {
    return request({
        url: '/api.php/bbs/TopicList/getAllForums',
        method: 'get',
        params: params
    });
}

// 关注与取消关注板块
export function followPlate(params) {
    return request({
        url: '/api.php/bbs/favor/Favorite',
        method: 'get',
        params: params
    });
}

// 某一个论坛板块的基本信息
export function getPlateBase(data) {
    return request({
        url: '/api.php/bbs/list/getHeaderList',
        method: 'post',
        data: data
    });
}

// 我的发帖
export function getPlatePost(params) {
    return request({
        url: '/api.php/bbs/list/getPosts',
        method: 'get',
        params: params
    });
}

// 搜索帖子
export function getSearch(params) {
    return request({
        url: '/api.php/bbs/index/getsearch',
        method: 'get',
        params: params
    });
}


// 帖子阅览数加+1
export function addView(params) {
    return request({
        url: '/api.php/bbs/index/addViews',
        method: 'get',
        params: params
    });
}