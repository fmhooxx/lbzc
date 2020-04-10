import store from '../store';

export function saveImages(imgUrl, cb) {
    let platform = store.getters.platform;
    if (platform == 'ios') {
        window.webkit.messageHandlers.savePoster.postMessage({
            mainTitle: '零投入',
            subtitle: '零投入，轻创业，零门槛快捷金融分销平台',
            logo: 'http://admin.jinrirong.com/Public/images/login_logo.png',
            url: imgUrl,
            type: 0
        });
    } else if (platform == 'android') {
        window.android.savePoster(imgUrl);
    } else {
        if (cb) {
            cb();
        }
    }
}

export function saveImagesArr(imgUrlArr, cb) {
    let platform = store.getters.platform;
    if (platform == 'ios') {
        window.webkit.messageHandlers.savePosterArr.postMessage({
            mainTitle: '蓝冰众创会员推荐',
            subtitle: '零投入，轻创业，零门槛快捷金融分销平台',
            logo: 'http://svn.xkzdai.com/Public/images/login_logo.png',
            url: imgUrlArr,
            type: 0
        });
    } else if (platform == 'android') {
        window.android.savePosterArr(JSON.stringify(imgUrlArr));
    } else {
        if (cb) {
            cb();
        }
    }
}

export function shareImags(imgUrl, cb) {
    let platform = store.getters.platform;
    if (platform == 'ios') {
        window.webkit.messageHandlers.sharePoster.postMessage({
            mainTitle: '零投入',
            subtitle: '零投入，轻创业，零门槛快捷金融分销平台',
            logo: 'http://admin.jinrirong.com/Public/images/login_logo.png',
            url: imgUrl,
            type: 0
        });
    } else if (platform == 'android') {
        window.android.sharePoster(imgUrl);
    } else {
        if (cb) {
            cb();
        }
    }
}

export function shareLink(url, cb) {
    let platform = store.getters.platform;
    if (platform == 'ios') {
        window.webkit.messageHandlers.shareLinks.postMessage({
            mainTitle: '零投入',
            subtitle: '零投入，轻创业，零门槛快捷金融分销平台',
            logo: 'http://admin.jinrirong.com/Public/images/login_logo.png',
            url: url,
            type: 1
        });
    } else if (platform == 'android') {
        window.android.shareLinks(url);
    } else {
        if (cb) {
            cb();
        }
    }
}

// 将自己的token告诉原生
export function noticeToken(token, cb) {
    let platform = store.getters.platform;
    if (platform == 'ios') {
        window.webkit.messageHandlers.saveToken.postMessage(token);
    } else if (platform == 'android') {
        window.android.saveToken(token);
    } else {
        if (cb) {
            cb();
        }
    }
}

export function forceUpdate(url) {
    let platform = store.getters.platform;
    if (platform == 'ios') {
        window.webkit.messageHandlers.forceUpdate.postMessage(url);
    } else if (platform == 'android') {
        window.android.forceUpdate(url);
    } else {
        if (cb) {
            cb();
        }
    }
}
