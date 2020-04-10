<template>
    <div class="dai-prodcut">
        <recommend
            style="marginTop:0.2rem"
            v-if="recommendData.length>0"
            :recommendData="recommendData"
            @getRecommend="getRecommend"
        ></recommend>
        <base-placeholder></base-placeholder>
        <large-cps
            style="marginTop:0.4rem"
            v-if="largeCpsData.length>0"
            :largeCpsData="largeCpsData"
        ></large-cps>
        <small-cps v-if="smallCpsData" :smallCpsData="smallCpsData"></small-cps>
        <small-cpa v-if="smallCpaData.length>0" :smallCpaData="smallCpaData"></small-cpa>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import Recommend from './Recommend';
import largeCps from './largeCps';
import smallCps from './smallCps';
import smallCpa from './smallCpa';
import scroll from '_mixins/scroll';
import { getRecommend, getDaiProduct } from '_api/share';
export default {
    components: { Recommend, largeCps, smallCps, smallCpa },
    data() {
        return {
            recommendData: [],
            largeCpsData: [],
            smallCpsData: null,
            smallCpaData: [],
            isBaseLoadPage: true
        };
    },
    mixins: [scroll],
    async mounted() {
        try {
            await this.getRecommend();
            await this.getLargeCps();
            await this.getSmallCps();
            await this.getSmallCpa();
            this.isFist = true;
            this.isBaseLoadPage = false;
        } catch (err) {
            console.log(err);
            this.isFist = true;
            this.isBaseLoadPage = false;
        }
    },
    async activated() {
        if (!this.isFist) return;
        await this.getRecommend();
        await this.getLargeCps();
        await this.getSmallCps();
        await this.getSmallCpa();
    },
    methods: {
        // 获取推荐商品
        async getRecommend() {
            this.recommendData = (await getRecommend({
                num: 7,
                type: 1
            })).data;
        },

        // 获取大额cps商品
        async getLargeCps() {
            this.largeCpsData = (await getDaiProduct({
                type: 3
            })).data;
        },
        async getSmallCps() {
            this.smallCpsData = (await getDaiProduct({
                type: 1
            })).data;
        },
        async getSmallCpa() {
            let r = await getDaiProduct({
                type: 2
            });
            if (Object.prototype.toString.call(r) == '[object Array]') {
                return;
            } else {
                this.smallCpaData = r.data;
            }
            // console.log(r);
            // this.smallCpaData = (await getDaiProduct({
            //     type: 2
            // })).data;
            // console.log(this.smallCpaData)
        }
    }
};
</script>


