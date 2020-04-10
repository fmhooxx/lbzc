import Vue from 'vue';
import Router from 'vue-router';
import { currentUrl } from '../utils/func';
import register from '../views/register';
import chaDetail from '../views/cha/chaDetail';

Vue.use(Router);

const modulesFiles = require.context('./modules', true, /index\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    modules.push(...modulesFiles(modulePath).default);
    return modules;
    // return modules.push(modulesFiles(modulePath).default);
}, []);

let router = new Router({
    mode: process.env.VUE_APP_TARGET === 'cordova' ? 'hash' : 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (!to.meta.keepAlive) {
            return { x: 0, y: 0 };
        }
    }
});

router.onError(() => {
    console.log('----------');
    console.log('重新拉去资源');
    console.log('----------');
    window.location.reload(true);
});

let officialRoutes = [
    {
        path: '/register',
        component: register
    },
    {
        path: '/chaDetail',
        component: chaDetail
    },
    {
        path: '*',
        redirect: '/register'
    }
];

let allRoutes = [
    {
        path: '/',
        redirect: '/home'
    },
    ...modules,
    {
        path: '*',
        redirect: '/home'
    }
];
if (currentUrl().indexOf('jrr9') != -1) {
    router.addRoutes(officialRoutes);
} else {
    router.addRoutes(allRoutes);
}

export default router;
