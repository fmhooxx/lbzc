<template>
    <div class="take-zhi">
        <base-nav>{{type=='zhi'?'支付宝提现':'银行卡提现'}}</base-nav>
        <base-top></base-top>
        <div class="content">
            <TakeBrand style="marginTop:0.6rem" v-if="userData" :type="type" :userData="userData"></TakeBrand>
            <TakeApply
                style="marginTop:1.2rem"
                v-if="userData"
                :type="type"
                :userData="userData"
                :cost="parseInt(cost)"
            ></TakeApply>
        </div>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import TakeBrand from '../components/TakeBrand';
import TakeApply from '../components/TakeApply';
import { takeBase } from '_api/center';
export default {
    components: { TakeBrand, TakeApply },
    data() {
        return {
            type: '',
            cost: 0,
            userData: null,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            this.type = this.$route.query.type ? this.$route.query.type : 'zhi';
            this.userData = this.$getUser();
            let res = await takeBase({ type: this.type == 'zhi' ? 1 : 2 });
            this.cost = res.data.cost;
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    beforeRouteEnter(to, from, next) {
        document.documentElement.style.backgroundColor = '#f6f7fb';
        next();
    },
    beforeRouteLeave(to, from, next) {
        document.documentElement.style.backgroundColor = '#fff';
        next();
    }
};
</script>
<style lang="less" scoped>
.take-zhi {
    > .content {
        background-color: #fff;
    }
}
</style>


