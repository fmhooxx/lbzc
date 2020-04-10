const state = {
    replySomeOne: null
};

const mutations = {
    SET_Reply_SOMEONE: (state, someOne) => {
        state.replySomeOne = someOne;
    }
};

const actions = {
    SetReplySomeOne({ commit }, someOne) {
        return new Promise(resolve => {
            commit('SET_Reply_SOMEONE', someOne);
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
