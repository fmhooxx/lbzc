<template>
    <div class="card">
        <div v-stopMove>
            <BaseSlide style="marginTop:.2rem" v-if="slideData.length>0" :slideData="slideData"></BaseSlide>
        </div>
        <card-list
            style="marginTop:0.8rem"
            v-if="cardDatas.length>0"
            Mtype="1"
            :cardDatas="cardDatas"
            :rewardContent="rewardDatas"
        ></card-list>
        <bank-list
            v-if="bankDatas.length>0"
            Mtype="1"
            :bankDatas="bankDatas"
            :rewardContent="rewardDatas"
        ></bank-list>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
        <base-bottom></base-bottom>
        <base-bottom-nav></base-bottom-nav>
    </div>
</template>
<script>
import CardList from './components/CardList';
import BankList from './components/BankList';
import scroll from '_mixins/scroll';
import { getIndexRotation } from '_api/func';
import { getCardDatas, getBankDatas, getRewardDatas } from '_api/card';
export default {
    components: { CardList, BankList },
    mixins: [scroll],
    data: () => {
        return {
            slideData: [],
            cardDatas: [],
            bankDatas: [],
            rewardDatas: null,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            this.$initUid(this.$route.query.uid);
            await this.getIndexRotation();
            await this.getCardDatas();
            await this.getBankDatas();
            await this.getRewardDatas();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getIndexRotation() {
            this.slideData = await getIndexRotation({
                rows: 4,
                aid: 10
            });
        },
        async getCardDatas() {
            let card = await getCardDatas({ type: 1 });
            this.cardDatas = card.data;
        },
        async getBankDatas() {
            let bank = await getCardDatas({ type: 2 });
            this.bankDatas = bank.data;
        },
        async getRewardDatas() {
            this.rewardDatas = await getRewardDatas({ id: 11 });
        }
    }
};
</script>

<style lang="less" scoped>
.card {
    background-color: #fff;
}
</style>

