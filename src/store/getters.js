const getters = {
    token: state => state.user.token,
    platform: state => state.native.platform,
    version: state => state.native.version,
    packageName: state => state.native.packageName,
    upgrade:state => state.native.upgrade,
};
export default getters;
