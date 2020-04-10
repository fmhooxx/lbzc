<template>
    <div class="share-detail">
        <DaiDetail v-if="productData&&type==1" :productData="productData"></DaiDetail>
        <CardDetail v-if="productData&&type==2" :productData="productData"></CardDetail>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import CardDetail from '../components/CardDetail';
import DaiDetail from '../components/DaiDetail';
import { getProductDetail } from '_api/share';
export default {
    components: { CardDetail, DaiDetail },
    data() {
        return {
            id: 0,
            type: 0,
            productData: null,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            this.id = this.$route.query.id;
            this.type = this.$route.query.type; // type===>1，贷款    2，信用卡
            await this.getProductDetail();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getProductDetail() {
            this.productData = await getProductDetail({
                id: this.id
            });
        }
    }
};
</script>


