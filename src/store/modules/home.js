const state = {
    token: ''
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    }
};

const actions = {
    // reset token
    resetToken({ commit }, newToken) {
        return new Promise(resolve => {
            commit('SET_TOKEN', newToken);
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
