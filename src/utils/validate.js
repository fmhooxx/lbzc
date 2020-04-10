// 验证手机号码是否可用
export function isPhoneNum(val) {
    if (!val) return false;
    let reg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
    if (!reg.test(val)) {
        return false;
    } else {
        return true;
    }
}

export function isPassword(val) {
    let reg = /^[0-9a-zA-Z]{6,16}$/;
    if (reg.test(val)) {
        return true;
    } else {
        return false;
    }
}
