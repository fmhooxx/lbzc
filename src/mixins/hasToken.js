import { getToken } from '_utils/local';

export default {
    beforeRouteEnter(to, from, next) {
        if (getToken()) {
            next({ path: '/', replace: true });
        } else {
            next();
        }
    }
};
