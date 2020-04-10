<template>
    <div class="price-chart">
        <base-nav>价格表</base-nav>
        <base-top></base-top>
        <base-placeholder></base-placeholder>
        <AgentPrice
            v-if="priceList&&priceList.level.length>0"
            :priceList="priceList"
            style="marginTop:0.6rem"
        ></AgentPrice>
        <AgentIncome
            v-if="priceList&&priceList.level.length>0"
            :priceList="priceList"
            style="marginTop:1.2rem"
        ></AgentIncome>
        <base-placeholder style="marginTop:0.8rem"></base-placeholder>
        <ChaIncome
            v-if="priceList&&priceList.zenxin"
            :priceList="priceList"
            style="marginTop:0.8rem"
        ></ChaIncome>
        <ShareIncome v-if="priceList" :priceList="priceList" style="marginTop:0.8rem"></ShareIncome>
        <base-bottom></base-bottom>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import AgentPrice from '../components/AgentPrice';
import AgentIncome from '../components/AgentIncome';
import ChaIncome from '../components/ChaIncome';
import ShareIncome from '../components/ShareIncome';
import { getPriceList } from '_api/center';
export default {
    components: { AgentPrice, AgentIncome, ChaIncome, ShareIncome },
    data() {
        return {
            priceList: null,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            await this.getPriceList();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getPriceList() {
            this.priceList = await getPriceList();
        }
    }
};
</script>
