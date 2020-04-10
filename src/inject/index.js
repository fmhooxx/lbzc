import Vue from 'vue';

// vconsole debug mode mobile phone tool
// import VConsole from 'vconsole';
// new VConsole();

// image lazy load tool
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
    preLoad: 1.3,
    // loading: require('_images/zhanwei.png'),
    attempt: 1
});

import VueScroller from 'vue-scroller';
Vue.use(VueScroller);

