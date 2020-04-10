import store from '../store';
import { getVersion } from '../api/func';
import { compareVersion } from '../utils/func';

export default async function(platform, version) {
    try {
        let serverVersion = await getVersion({
            type: platform == 'android' ? 1 : 2 // 类型  1： android  2：ios
        });
        await store.dispatch('native/setUpgrade', compareVersion(version, serverVersion.Ver));
        await store.dispatch('native/setServerVersion', serverVersion);
    } catch (err) {
        console.log(err);
    }
}
