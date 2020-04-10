import Vue from 'vue';

let filters = {
    capitalize: function(value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
    },
    threePoints: function(value, num = 10) {
        if (!value) return '';
        value = value.toString();
        let regText = `^(\\S{${num}})(\\S+)$`;
        return value.replace(new RegExp(regText), '$1...');
    },
    nameHide: function(value) {
        if (!value) return;
        let num = 0;
        for (var i = 0; i < value.length; i++) {
            if (/[\u4e00-\u9fa5]{1}/.test(value[i])) {
                num = num + 3;
            } else {
                num = num + 1;
            }
        }
        if (num > 21) {
            return `${value.substring(0, 8)}...`;
        } else {
            return value;
        }
    },
    mobileHide: function(value) {
        if (!value) return '';
        return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    // 会员等级图标过滤
    ruleImageFilter(Mtype) {
        if (Mtype == 1) {
            return require('@images/g-1.png');
        } else if (Mtype == 2) {
            return require('@images/g-2.png');
        } else if (Mtype == 3) {
            return require('@images/g-3.png');
        } else if (Mtype == 4) {
            return require('@images/g-4.png');
        } else {
            return require('@images/g-1.png');
        }
    },
    // 支付宝和银行提现
    takeWay(text) {
        if (text == '支付宝') {
            return require('@images/zhi-2.png');
        } else {
            return require('@images/bank-1.png');
        }
    },
    // 状态单元格标题
    stateName(state) {
        if (state == 'commit') {
            return '状态';
        } else if (state == 'useless') {
            return '原因';
        } else {
            return '佣金';
        }
    },

    // 状态单元格值
    stateVal(state, money, type, remark) {
        if (state == 'commit') {
            if (type == 'dai') {
                return '待达标';
            } else {
                return '提交中';
            }
        } else if (state == 'useless') {
            return remark;
        } else {
            return money + '元';
        }
    },
    // 根据状态返回字体颜色
    stateColor(state) {
        if (state == 'commit') {
            return 'color: rgba(85, 98, 236, 1);';
        } else if (state == 'done') {
            return 'color: rgba(249, 105, 81, 1);';
        } else if (state == 'useless') {
            return 'color: #ff8a35';
        } else {
            return 'color: #000;';
        }
    }
};

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
