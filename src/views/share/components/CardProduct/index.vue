<template>
    <div class="card-product">
        <div v-stopMove>
            <BaseSlide style="marginTop:.2rem" v-if="slideData.length>0" :slideData="slideData"></BaseSlide>
        </div>
        <card-list
            style="marginTop:.8rem"
            v-if="cardDatas.length>0"
            :cardDatas="cardDatas"
            :rewardContent="rewardDatas"
        ></card-list>
        <bank-list
            v-if="bankDatas.length>0"
            style="marginTop:0.4rem"
            :bankDatas="bankDatas"
            :rewardContent="rewardDatas"
        ></bank-list>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import CardList from './CardList';
import BankList from './BankList';
import scroll from '_mixins/scroll';
import { getIndexRotation } from '_api/func';
import { getCardDatas, getBankDatas, getRewardDatas } from '_api/share';
export default {
    components: { CardList, BankList },
    mixins: [scroll],
    data() {
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
            await this.getIndexRotation();
            await this.getCardDatas();
            await this.getBankDatas();
            await this.getRewardDatas();
            this.isFirst = true;
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isFirst = true;
            this.isBaseLoadPage = false;
        }
    },
    async activated() {
        if (!this.isFirst) return;
        await this.getCardDatas();
        await this.getBankDatas();
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

