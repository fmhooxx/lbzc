const state = {
    openId: ''
};

const mutations = {
    SET_OPENID: (state, id) => {
        state.openId = id;
    }
};

const actions = {
    // reset token
    setOpenId({ commit }, newId) {
        return new Promise(resolve => {
            commit('SET_OPENID', newId);
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
