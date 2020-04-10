<template>
    <div class="bbs-plates">
        <div v-for="(item,index) in plates" :key="index" @click="linkToForum(item)">
            <img :src="item.icons" style="width:0.7rem;" />
            <span style="margin-top: 0.26rem;font-size: 0.28rem;color:#6d6d72">{{item.name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        plates: {
            type: Array,
            default: []
        }
    },
    methods: {
        linkToForum(item) {
            if (!item.fid) {
                if (!this.$getToken()) {
                    return this.$textTip('您还未登录');
                }
                this.$goUrl('/allPlates');
            } else {
                this.$goUrl(`/postPlate?fid=${item.fid}`);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.bbs-plates {
    display: flex;
    justify-content: space-around;
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>
