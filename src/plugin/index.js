import Vue from 'vue';
import router from '../router';
import store from '../store';
import { getStaticUrl } from '../config';
import { getToken, getUser, saveUID, getUID } from '../utils/local';

const plugin = {
    install(Vue, options) {
        Vue.prototype.$goUrl = args => {
            router.push(args);
        };
        Vue.prototype.$goBack = goBack;

        Vue.prototype.$goReplace = args => {
            router.replace(args);
        };
        Vue.prototype.$getToken = () => {
            return getToken();
        };
        Vue.prototype.$getUser = () => {
            return getUser();
        };

        Vue.prototype.$basePath = basePath;

        Vue.prototype.$textTip = textTip;

        Vue.prototype.$waitTime = waitTime;

        Vue.prototype.$open = open;

        Vue.prototype.$platform = () => {
            return store.getters.platform;
        };

        Vue.prototype.$copy = copy;

        Vue.prototype.$isDate = isDate;

        Vue.prototype.$preloadImg = preloadImg;

        Vue.prototype.$imageCompression = imageCompression;

        Vue.prototype.$isNull = isNull;

        Vue.prototype.$reloadPage = reloadPage;

        Vue.prototype.$isWeiXin = isWeiXin;

        Vue.prototype.$initUid = initUid;

        Vue.prototype.$sendMsg = sendMsg;

        Vue.prototype.$callPhone = callPhone;

        Vue.prototype.$tabTitle = tabTitle;
    }
};

Vue.use(plugin);

function goBack() {
    let length = window.history.length;
    if (length > 1) {
        router.go(-1);
    } else {
        router.replace('/');
    }
}

function textTip(args) {
    let time;
    let type;
    let txt;
    if (typeof args == 'string') {
        time = 2000;
        type = 'txt';
        txt = args;
    } else if (Object.prototype.toString.call(args) == '[object Error]') {
        time = args.time || 2000;
        type = args.type || 'txt';
        txt = '网络超时，请稍后重试';
    } else {
        time = args.time || 2000;
        type = args.type || 'txt';
        txt = args.txt;
    }
    const toast = window.vm.$createToast({
        time,
        type,
        txt
    });
    toast.show();
    let dom = document.getElementsByClassName('cube-popup-content')[0];
    if (!dom) return;
    dom.style.padding = '0.12rem 0.2rem';
    dom.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
}

function waitTime(time = 1000) {
    return new Promise((res, rej) => {
        clearTimeout(window.timer);
        window.timer = window.setTimeout(() => {
            res();
        }, time);
    });
}

function open(url) {
    let platform = store.getters.platform;
    if (platform == 'h5') {
        return (window.location.href = url);
    } else {
        window.open(url, '_blank');
    }
}

function sendMsg(phoneNum) {
    window.location.href = `sms:${phoneNum}`;
}

function callPhone(phoneNum) {
    window.location.href = `tel:${phoneNum}`;
}

function basePath() {
    // if (store.getters.platform != 'h5') {
    //     return getStaticUrl();
    // }
    return window.location.origin;
}

function copy(text) {
    let client = store.getters.platform;
    if (client == 'h5' || client == 'android') {
        const input = document.createElement('input');
        input.setAttribute('readonly', 'readonly');
        input.setAttribute('value', text);
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, 9999);
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            textTip('复制成功');
        }
        document.body.removeChild(input);
    } else {
        window.webkit.messageHandlers.saveText.postMessage(text);
    }
}

function isDate(time, index, data, field = 'UpdateTime') {
    if (index == 0) return true;
    time = time.split(' ')[0];
    if (data[index - 1][field].split(' ')[0] == time) {
        return false;
    } else {
        return true;
    }
}

function preloadImg(src) {
    return new Promise(async (res, rej) => {
        if (!src) return rej();
        let img = new Image();
        img.onload = () => {
            res();
        };
        img.onerror = err => {
            rej(err);
        };
        img.src = src;
    });
}

function imageCompression(src) {
    return new Promise(async (res, rej) => {
        let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
        image.onload = function() {
            let canvas = document.createElement('canvas'),
                context = canvas.getContext('2d'),
                imageWidth = image.width / 2, //压缩后图片的大小
                imageHeight = image.height / 2,
                data = '';

            canvas.width = imageWidth;
            canvas.height = imageHeight;

            context.drawImage(image, 0, 0, imageWidth, imageHeight);
            data = canvas.toDataURL('image/jpeg');
            res(data);
        };
        image.onerror = err => {
            rej(err);
        };
        image.src = src;
    });
}

function isNull(arg) {
    if (arg && typeof arg != 'undefined' && arg !== '') {
        return false;
    } else {
        return true;
    }
}

function reloadPage(url) {
    router.replace(`/redirect?url=${encodeURIComponent(url)}`);
}

// 是否是微信内部浏览器打开
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger';
}

function initUid(uid) {
    if (!this.$isNull(uid)) {
        saveUID(uid);
    } else {
        uid = getUID();
    }
    return uid;
}

function tabTitle(title) {
    document.title = title ? title : '';
}
