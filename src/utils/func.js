// 版本号比较 curV:当前app版本  reqV：服务器最新版本  compare("1.1","1.2")，将返回 true, 则需要升级
export function compareVersion(curV, reqV) {
    if (curV == reqV) return false;
    if (curV && reqV) {
        //将两个版本号拆成数字
        var arr1 = curV.split('.'),
            arr2 = reqV.split('.');
        var minLength = Math.min(arr1.length, arr2.length),
            position = 0,
            diff = 0;
        //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
        while (
            position < minLength &&
            (diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0
        ) {
            position++;
        }
        diff = diff != 0 ? diff : arr1.length - arr2.length;
        //若curV大于reqV，则返回true
        return !(diff > 0);
    }
}

// 当前域名
export function currentUrl() {
    return window.location.origin;
    // let urlPath = window.document.location.href;
    // let docPath = window.document.location.pathname;
    // let index = urlPath.indexOf(docPath);
    // return urlPath.substring(0, index);
}

// 数组中包含某一项目
export function hasInclude(arr, url) {
    for (let i = 0; i < arr.length; i++) {
        if (url.indexOf(arr[i]) >= 0) {
            return true;
        }
    }
    return false;
}

// 获取地址栏中的参数
export function getQuery() {
    if (document.location.href.split('?').length <= 1) return {};
    let queryString = document.location.href.split('?')[1].split('&');
    let obj = {};
    for (let i in queryString) {
        var name = queryString[i].split('=')[0];
        var value = queryString[i].split('=')[1];
        obj[name] = value;
    }
    return obj;
}

export function wechatRegister(data, cb, err) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
            appId: data.appId, //公众号名称，由商户传入
            timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
            nonceStr: data.nonceStr, //随机串
            package: data.package,
            signType: data.signType, //微信签名方式：MD5
            paySign: data.paySign //微信签名
        },
        function(res) {
            console.log(res);
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
                if (cb) {
                    cb();
                }
            } else {
                err();
            }
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        }
    );
}

export function wechatPay(data, cb, err) {
    if (typeof WeixinJSBridge == 'undefined') {
        if (document.addEventListener) {
            document.addEventListener(
                'WeixinJSBridgeReady',
                function(data, cb, err) {
                    wechatRegister(data, cb, err);
                },
                false
            );
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', function(data, cb, err) {
                wechatRegister(data, cb, err);
            });
            document.attachEvent('onWeixinJSBridgeReady', function(data, cb, err) {
                wechatRegister(data, cb, err);
            });
        }
    } else {
        wechatRegister(data, cb, err);
    }
}
