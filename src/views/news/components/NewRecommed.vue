<template>
    <div class="new-recommed">
        <base-tab-nav
            style="marginTop:0.2rem"
            v-if="tabs.length>0"
            :selected.sync="selected"
            :tabs="tabs"
        ></base-tab-nav>
        <div class="list">
            <new-list :cate="parseInt(cate)" v-if="selected==0"></new-list>
            <new-best :cate="parseInt(cate)" v-if="selected==1"></new-best>
        </div>
    </div>
</template>
<script>
import NewList from './NewList';
import NewBest from './NewBest';
export default {
    components: { NewList, NewBest },
    props: {
        cate: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            tabs: ['相关推荐', '精华推荐'],
            selected: 0
        };
    }
};
</script>
<style lang="less" scoped>
.new-recommed {
    /deep/ .base-tab-nav {
        > .content-tab {
            height: 1rem;
            > .tab-item {
                > div {
                    font-size: 0.32rem;
                    font-weight: bold;
                }
            }
        }
    }
    > .list {
        min-height: 10rem;
    }
}
</style>
