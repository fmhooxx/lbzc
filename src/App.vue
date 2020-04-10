<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
        <base-upgrade-pop v-if="getUpgrade"></base-upgrade-pop>
        <BaseMask v-if="isBaseMask==1"></BaseMask>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { getBaseicInfo } from '_api/func';
export default {
    computed: {
        ...mapState({
            getUpgrade: state => {
                return state.native.upgrade;
            }
        })
    },
    data() {
        return {
            isBaseMask: 0
        };
    },
    mounted() {
        this.getMask();
        console.log('----------');
    },
    methods: {
        async getMask() {
            try {
                if (this.$isWeiXin()) {
                    this.isBaseMask = (await getBaseicInfo({
                        name: 'wx_show'
                    })).wx_show;
                } else {
                    document.title = '蓝冰众创';
                }
            } catch (err) {
                this.isBaseMask = 0;
            }
        }
    }
};
</script>



