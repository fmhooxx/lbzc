import store from '../store';
import router from '../router';
import statusBar from './statusBar';
import upgrade from './upgrade';

document.addEventListener('deviceready', async function() {
    statusBar();
    let platform = device.platform.toLowerCase();
    let version = await cordova.getAppVersion.getVersionNumber();
    await store.dispatch('native/setPlatform', platform);
    await store.dispatch('native/setVersion', version);
    upgrade(platform, version);
});

function andPreload() {
    try {
        window.android.requsetAppInfo();
    } catch (err) {
        console.log(err.message);
    }
}

// 推送消息功能，app通知我，我再进行项目跳转
function messageNotice() {
    window.TellMeNotification = message => {
        let msg = JSON.parse(message);
        if (msg.type == 2) {
            window.open(msg.url, '_blank');
        }
    };
}

// 接受app通知消息（佣金排行榜），进行页面跳转
function jumpProject() {
    window.TellMeProjectURL = url => {
        router.push(url);
    };
}

// android告诉我基本信息
function andTellMeBase() {
    window.TellMeAppInfo = async device => {
        const deviceInfo = JSON.parse(device);
        let client = deviceInfo.client;
        let deviceId = deviceInfo.deviceId;
        let version = deviceInfo.version;
        await store.dispatch('native/setPlatform', client);
        await store.dispatch('native/setVersion', version);
        await store.dispatch('native/setDeviceToken', deviceId);
        upgrade(client, version);
    };
}

// ios告诉我基本信息
async function iosTellBase() {
    try {
        const deviceInfo = JSON.parse(JSON.stringify(window.sendClientPramas));
        let client = deviceInfo.client;
        let deviceId = deviceInfo.deviceId;
        let version = deviceInfo.version;
        await store.dispatch('native/setPlatform', client);
        await store.dispatch('native/setVersion', version);
        await store.dispatch('native/setDeviceToken', deviceId);
        upgrade(client, version);
    } catch (err) {
        console.log(err.message);
    }
}

function appInit() {
    andTellMeBase();
    iosTellBase();
    andPreload(); // 向android发送信息，之后android调用TellMeAppInfo方法
    messageNotice(); // 用户点击消息推送之后项目进行跳转
    jumpProject(); // 外联h5发送跳转通知，跳转到项目内
}

appInit();
