<template>
    <div class="hot-product">
        <base-title>热门推广产品</base-title>
        <base-tab v-if="tabs.length>0" :selected.sync="selected" :tabs="tabs"></base-tab>
        <base-placeholder></base-placeholder>
        <div class="list" ref="list">
            <dai-list v-if="selected==0"></dai-list>
            <card-list v-if="selected==1"></card-list>
        </div>
    </div>
</template>
<script>
import DaiList from './DaiList';
import CardList from './CardList';
export default {
    components: { DaiList, CardList },
    data() {
        return {
            tabs: ['贷款', '信用卡'],
            selected: 0
        };
    },
    mounted() {
        this.$refs.list.style.minHeight = `${document.documentElement.clientHeight - 100}px`;
        window.setTimeout(() => {
            window.scrollTo(0, 0);
        }, 200);
    }
};
</script>



