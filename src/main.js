import './styles/index.less';
import Vue from 'vue';
import './cube-ui';


import App from './App.vue';
import router from './router';
import store from './store';


import './permission'; // router management (beforeEach...)
import './utils/rem'; // rem adapter (750px)
import './inject'; // third-party plugin (vconsole、v-touch)
import './register'; // components register (base components)
import './filter'; // custom filter
import './directive' // custom directive
import './native';
import './plugin'; // custom vue plugin ($GoBack、$GoReplace)
import './plugin/BaseSuccess';
import './weixin'





window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
