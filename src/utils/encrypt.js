import md5 from 'js-md5';
import { Base64 } from 'js-base64';
import CryptoJS from 'crypto-js';
import { getEncrypt } from './local';

// token encrypt
export function tokenEncrypt(mobile, Val, ticksid, client, pwd) {
    let name = md5(md5(mobile.toString())).substr(2, 30);
    let token =
        md5(name + Val).substr(0, 30) + md5(client + pwd + ticksid.toString()).substr(2, 30);
    return token;
}

// 普通md5加密
export function md5Encrypt(val) {
    if (!val) return '';
    return md5(val);
}

// 信息文本加密传输
export function textEncrypt(data) {
    let _encrypt = getEncrypt();
    let key = CryptoJS.enc.Utf8.parse(_encrypt.KEY);
    let iv = CryptoJS.enc.Utf8.parse(_encrypt.IV);
    let encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

// Base64 加密

export function base64(data) {
    return Base64.encode(data);
}

export function takeEncrypt(userData, money, type='zhi') {
    let timestamp = Date.parse(new Date());
    let CardNo;
    let CardName;
    if (type != 'bank') {
        CardNo = userData.Alipay;
        CardName = userData.AlipayName;
    } else {
        CardNo = userData.Bank;
        CardName = userData.BankName;
    }
    let Money = money;
    let key = '380c22d5d4e721053df5fc4b73a318e0';
    let sign = md5(timestamp + CardNo + CardName + Money + key);
    return {
        sign: sign,
        timestamp: timestamp
    };
}
