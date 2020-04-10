import BaseSuccess from './BaseSuccess';
import Vue from 'vue';

const FAIL = 'FAIL';
const SUCCESS = 'SUCCESS';
const BASESUCCESS = {
    install(Vue, options) {
        Vue.component('BaseSuccess', BaseSuccess);

        // 挂载到vue原型上，暴露四个方法
        Vue.prototype.$msg = {
            success(ops, callBack) {
                if (!ops) return;
                tip(SUCCESS, ops, callBack);
            },
            fail(ops, callBack) {
                if (!ops) return;
                tip(FAIL, ops, callBack);
            }
        };
    }
};

function tip(type, ops, callBack) {
    let text;
    let mask;
    let time;
    if (typeof ops === 'string') {
        text = ops;
        mask = false;
        time = 2000;
    } else if (ops instanceof Object) {
        text = ops.text || '操作成功';
        mask = ops.mask || false;
        time = ops.time || 2000;
    }
    let VueBaseSuccess = Vue.extend({
        render(h) {
            let props = {
                type: type,
                text: text,
                mask: mask,
                show: this.show
            };
            return h('BaseSuccess', { props });
        },
        data() {
            return {
                show: false
            };
        }
    });

    let newBaseSuccess = new VueBaseSuccess();
    let vm = newBaseSuccess.$mount();
    let el = vm.$el;
    document.body.appendChild(el); // 把生成的提示的dom插入body中
    vm.show = true;
    let t1 = setTimeout(() => {
        clearTimeout(t1);
        vm.show = false; //隐藏提示组件，此时会有300ms的动画效果，等动画效果过了再从body中移除dom
        let t2 = setTimeout(() => {
            clearTimeout(t2);
            document.body.removeChild(el); //从body中移除dom
            newBaseSuccess.$destroy();
            vm = null; // 设置为null，好让js垃圾回收算法回收，释放内存
            callBack && typeof callBack === 'function' && callBack();
        }, 200);
    }, time);
}

Vue.use(BASESUCCESS);
