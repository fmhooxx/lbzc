import request from '_utils/request';

// 价格表
export function getPriceList(params) {
    return request({
        url: '/api.php/news/news/pricelist',
        method: 'get',
        params: params
    });
}

// 新手帮助问题类别
export function getHelpCate(params) {
    return request({
        url: '/api.php/news/content/getCateChild',
        method: 'get',
        params: params
    });
}

// 新手帮助问题列表
export function getHelpList(params) {
    return request({
        url: '/api.php/news/content/getContentByCate',
        method: 'get',
        params: params
    });
}

// 新手帮助问题详情
export function getHelpDetail(params) {
    return request({
        url: '/api.php/news/content/getContentDetail',
        method: 'get',
        params: params
    });
}


// 提现信息
export function takeBase(data) {
    return request({
        url: '/api.php/member/member/tixian',
        method: 'post',
        data: data
    });
}


// 支付宝绑定
export function bindAlipay(data) {
    return request({
        url: '/api.php/member/member/bindAlipay',
        method: 'post',
        data: data
    });
}


// 银行卡绑定
export function bindBank(data) {
    return request({
        url: '/api.php/member/member/bindbank',
        method: 'post',
        data: data
    });
}


// 订单菜单
export function getOrderMenu(params) {
    return request({
        url: '/api.php/member/member/orderMenu',
        method: 'get',
        params: params
    });
}


// 海报获取
export function getHaibao(data) {
    return request({
        url: '/api.php/member/member/getHaibao',
        method: 'post',
        data: data
    });
}

// 个人钱包
export function getWallet(params) {
    return request({
        url: '/api.php/member/member/myPacage',
        method: 'get',
        params: params
    });
}


// 会员收入明细
export function getIncome(data) {
    return request({
        url: '/api.php/member/member/incomedata',
        method: 'post',
        data: data
    });
}

// 会员推广收入明细 贷款与信用卡
export function getShareIncome(data) {
    return request({
        url: '/api.php/member/member/getpromotdata',
        method: 'post',
        data: data
    });
}

// 会员推广征信查询
export function getChaIncome(data) {
    return request({
        url: '/api.php/member/member/tuiguangZX',
        method: 'post',
        data: data
    });
}

// 团队收入贷款
export function getGroupIncome(data) {
    return request({
        url: '/api.php/member/member/teamdata',
        method: 'post',
        data: data
    });
}

// 提现列表
export function getTakeList(data) {
    return request({
        url: '/api.php/member/member/walletdata',
        method: 'post',
        data: data
    });
}

// 支付宝提现接口
export function payTixian(data) {
    return request({
        url: '/api.php/member/member/payTixian',
        method: 'post',
        data: data
    });
}

// 银行卡提现接口
export function bankTixian(data) {
    return request({
        url: '/api.php/member/member/bankTixian',
        method: 'post',
        data: data
    });
}

// 查征信详情
export function getChaList(data) {
    return request({
        url: '/api.php/member/member/zhengxindata',
        method: 'post',
        data: data
    });
}

// 直属团队
export function getGroupList(data) {
    return request({
        url: '/api.php/member/member/getMyTeam',
        method: 'post',
        data: data
    });
}

// 二级团队
export function getSonGroup(data) {
    return request({
        url: '/api.php/member/member/getSonteam',
        method: 'post',
        data: data
    });
}

// 代理价格信息
export function getAgent(params) {
    return request({
        url: '/api.php/member/member/getDaili',
        method: 'get',
        params: params
    });
}

// 代理详情
export function getAgentDetail(data) {
    return request({
        url: '/api.php/member/member/daili_pay',
        method: 'post',
        data: data
    });
}


// 消息通知
export function getMsgNew(params) {
    return request({
        url: '/api.php/member/member/getMsgNew',
        method: 'get',
        params: params
    });
}

// 消息通知详情
export function getMsgDetail(params) {
    return request({
        url: '/api.php/member/member/getMsgDetail',
        method: 'get',
        params: params
    });
}



// 具体类型消息列表
export function getMsgList(data) {
    return request({
        url: '/api.php/member/member/msglist',
        method: 'post',
        data: data
    });
}

// 会员个人信息修改
export function updateMemBase(data) {
    return request({
        url: '/api.php/member/member/save',
        method: 'post',
        data: data
    });
}


// 添加建议
export function addSuggest(data) {
    return request({
        url: '/api.php/member/member/addfk',
        method: 'post',
        data: data
    });
}


// 退出
export function loginOut(data) {
    return request({
        url: '/api.php/user/usercenter/Login_out',
        method: 'post',
        data: data
    });
}

// 密码修改
export function savePassword(data) {
    return request({
        url: '/api.php/member/member/savepassword',
        method: 'post',
        data: data
    });
}


// 找回密码第一步，检查手机是否合法
export function checkVip(params) {
    return request({
        url: '/api.php/user/Register/checkVip',
        method: 'get',
        params: params
    });
}

// 找回密码最后一部，
export function forgetTwo(params) {
    return request({
        url: '/api.php/user/Register/forgetTwo',
        method: 'get',
        params: params
    });
}

// 支付（支付宝、微信、余额支付）
export function payMoney(data) {
    return request({
        url: '/api.php/member/member/paylevel',
        method: 'post',
        data: data
    });
}