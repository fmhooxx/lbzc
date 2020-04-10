const YXD_ENCRYPT = 'jrr-token';

const YXD_USERINFO = 'jrr-token_2';

const YXD_OPENID = 'OPENID';

const YXD_UID = 'RKD_UID';

//保存登录中服务器回传的 id、iv、key、token
export function saveEncrypt(encrypt = {}) {
    window.localStorage.setItem(YXD_ENCRYPT, JSON.stringify(encrypt));
}

// get encrypt message
export function getEncrypt() {
    return JSON.parse(window.localStorage.getItem(YXD_ENCRYPT));
}

// get token
export function getToken() {
    let encrypt = getEncrypt();
    return encrypt ? encrypt.Token : '';
}

// save user base info
export function saveUser(user = {}) {
    window.localStorage.setItem(YXD_USERINFO, JSON.stringify(user));
}

// get user base info
export function getUser() {
    return JSON.parse(window.localStorage.getItem(YXD_USERINFO));
}

// remove all
export function removeAll() {
    saveUser({});
    saveEncrypt({});
}

export function setOpenId(openId) {
    window.localStorage.setItem(YXD_OPENID, openId);
}

export function getOpenId() {
    try {
        let openid = window.localStorage.getItem(YXD_OPENID);
        if (typeof openid == 'undefined' || openid == 'undefined') {
            return '';
        } else {
            return openid;
        }
    } catch (err) {
        return '';
    }
}

export function saveUID(uid) {
    window.localStorage.setItem(YXD_UID, uid);
}

export function getUID() {
    let uid = window.localStorage.getItem(YXD_UID);
    return uid ? uid : '';
}
