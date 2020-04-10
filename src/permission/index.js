import router from '../router';
import { hasInclude } from '../utils/func';
import { getToken, getUser } from '../utils/local';

router.beforeEach((to, from, next) => {
    document.documentElement.style.backgroundColor = '#fff';
    let arr = ['/Daibeishop'];
    if (to.name == 'home' || to.name == 'news') {
        if (!getToken()) {
            return next('/Daibeishop/platweb');
        } else if (getUser().Mtype < 2) {
            return next('/Daibeishop/platweb');
        } else {
            next();
        }
    } else if (hasInclude(arr, to.path) || to.name == 'my') {
        if (getToken() && getUser().Mtype >= 2) {
            return next('/home');
        } else {
            next();
        }
    } else if (to.name == 'chaZheng') {
        if (getToken() && getUser().Mtype >= 2) {
            return next('/zx');
        } else {
            next();
        }
    } else {
        next();
    }
});
