const state = {
    platform: 'h5',
    version: '1.0.0',
    packageName: 'h5.ceshi',
    upgrade: false,
    serverVersion: null,
    deviceToken: ''
};

const mutations = {
    SET_PLATFORM: (state, newPlatform) => {
        state.platform = newPlatform;
    },
    SET_VERSION: (state, newVersion) => {
        state.version = newVersion;
    },
    set_PACKAGE_NAME(state, newPackageName) {
        state.packageName = newPackageName;
    },
    SET_UPGRADE: (state, newUpgrade) => {
        state.upgrade = newUpgrade;
    },
    SET_SERVER_VERSION: (state, newServerVersion) => {
        state.serverVersion = newServerVersion;
    },
    SET_DEVICETOKEN: (state, newDeviceToken) => {
        state.deviceToken = newDeviceToken;
    },
};

const actions = {
    setPlatform({ commit }, newPlatform) {
        return new Promise(resolve => {
            console.log('set=>' + newPlatform);
            commit('SET_PLATFORM', newPlatform);
            resolve();
        });
    },
    setVersion({ commit }, newVersion) {
        return new Promise(resolve => {
            console.log('set=>' + newVersion);
            commit('SET_VERSION', newVersion);
            resolve();
        });
    },
    setPackageName({ commit }, newPackageName) {
        return new Promise(resolve => {
            console.log('set=>' + newPackageName);
            commit('set_PACKAGE_NAME', newPackageName);
            resolve();
        });
    },
    setUpgrade({ commit }, newUpgrade) {
        return new Promise(resolve => {
            console.log('set=>' + newUpgrade);
            commit('SET_UPGRADE', newUpgrade);
            resolve();
        });
    },
    setServerVersion({ commit }, newServerVersion) {
        return new Promise(resolve => {
            console.log('set=>' + newServerVersion);
            commit('SET_SERVER_VERSION', newServerVersion);
            resolve();
        });
    },
    setDeviceToken({ commit }, newDeviceToken) {
        return new Promise(resolve => {
            console.log('set=>' + newDeviceToken);
            commit('SET_DEVICETOKEN', newDeviceToken);
            resolve();
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
