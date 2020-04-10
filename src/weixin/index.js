import { setOpenId, getOpenId } from '_utils/local';
import { getQuery } from '_utils/func';
import store from '../store';
import getRequsetUrl from '../utils/requestUrl';

function isWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger';
}

async function insideWeixin() {
    if (isWeiXin()) {
        let openId = getOpenId();
        console.log('openId==>' + openId);
        if (openId) {
            await store.dispatch('weixin/setOpenId', openId);
        } else {
            let query = getQuery();
            console.log(query);
            if (query['already']) {
                setOpenId(query['openid']);
                return await store.dispatch('weixin/setOpenId', query['openid']);
            } else {
                let url = location.href;
                if (url[url.length - 1] === '/') {
                    url = url.slice(0, url.length - 1);
                }
                if (url.indexOf('?') > -1) {
                    url = `${url}&already=1`;
                } else {
                    url = `${url}?already=1`;
                }
                console.log(url);
                url =
                    getRequsetUrl() +
                    '/api.php/common/wxinfo/index?from_app=4&return_url=' +
                    encodeURIComponent(url);
                window.location.href = url;
            }
        }
    }
}

insideWeixin();
