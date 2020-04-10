<template>
    <div class="bbs">
        <BaseTop height="0.2rem"></BaseTop>
        <BBSNav></BBSNav>
        <BBSPlates style="marginTop:0.8rem;" :plates="plates"></BBSPlates>
        <BaseTop height="0.6rem"></BaseTop>
        <BaseTop height="0.2rem" style="backgroundColor:rgb(246, 246, 246);"></BaseTop>
        <BBSTabNav v-if="tabs" :tabs="tabs" :selected.sync="selected"></BBSTabNav>
        <BBSPostList v-if="selected==0" :type="selected+1" key="p_1"></BBSPostList>
        <BBSPostList v-if="selected==1" :type="selected+1" key="p_2"></BBSPostList>
        <BBSFuncIcon></BBSFuncIcon>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
        <base-bottom></base-bottom>
        <base-bottom-nav-agent></base-bottom-nav-agent>
    </div>
</template>
<script>
import scroll from '_mixins/scroll';
import BBSNav from './components/BBSNav';
import BBSPlates from './components/BBSPlates';
import BBSTabNav from './components/BBSTabNav';
import BBSPostList from './components/BBSPostList';
import BBSFuncIcon from './components/BBSFuncIcon';
import { getPlates, getForumPost } from '_api/bbs';

export default {
    mixins: [scroll],
    components: {
        BBSNav,
        BBSPlates,
        BBSTabNav,
        BBSPostList,
        BBSFuncIcon
    },
    data() {
        return {
            plates: [],
            tabs: null,
            selected: 0,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            await this.getPlates();
            await this.getForumTabList();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getPlates() {
            this.plates = await getPlates();
        },
        async getForumTabList() {
            this.tabs = (await getForumPost()).data;
        }
    },
    beforeRouteEnter(to, from, next) {
        document.documentElement.style.backgroundColor = 'rgb(246, 246, 246)';
        next();
    },
    beforeRouteLeave(to, from, next) {
        document.documentElement.style.backgroundColor = '#fff';
        next();
    }
};
</script>
<style lang="less" scoped>
.bbs {
    /deep/ .base-bottom {
        background-color: rgb(246, 246, 246);
    }
}
</style>


