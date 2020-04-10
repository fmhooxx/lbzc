const state = {
    coupon: null
};

const mutations = {
    SET_COUPON: (state, coupon) => {
        state.coupon = coupon;
    }
};

const actions = {
    setCoupon({ commit }, coupon) {
        return new Promise(resolve => {
            commit('SET_COUPON', coupon);
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
