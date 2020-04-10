<template>
    <div class="news">
        <base-tab
            style="position:fixed;top:0;left:0;right:0;z-index:200"
            v-if="tabs.length>0"
            :tabs="tabs"
            :selected.sync="selected"
        ></base-tab>
        <base-top height="0.98rem"></base-top>
        <new-slide v-if="slideData.length>0" :slideData="slideData"></new-slide>
        <div v-for="(item,index) in cate" :key="`n_l_${item.ID}`">
            <new-list :cate="parseInt(item.ID)" v-if="index == selected"></new-list>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
        <base-bottom></base-bottom>
        <base-bottom-nav-agent></base-bottom-nav-agent>
    </div>
</template>
<script>
import scroll from '_mixins/scroll';
import NewSlide from './components/NewSlide';
import NewList from './components/NewList';
import { getNewsCate, getNewSlide } from '_api/news';
export default {
    components: { NewSlide, NewList },
    data() {
        return {
            cate: [],
            tabs: [],
            selected: 0,
            slideData: [],
            isBaseLoadPage: true
        };
    },
    mixins: [scroll],
    async mounted() {
        try {
            await this.getNewsCate();
            await this.getNewSlide();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getNewsCate() {
            this.cate = await getNewsCate();
            this.tabs = this.cate.map(val => val.Name);
        },
        async getNewSlide() {
            this.slideData = await getNewSlide();
        }
    }
};
</script>

