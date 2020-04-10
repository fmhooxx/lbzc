<template>
    <div class="dai-detail">
        <BaseNav>{{productData.info.Name?productData.info.Name:''}}</BaseNav>
        <BaseTop></BaseTop>
        <DaiBase v-if="productData" :productData="productData" style="marginTop:0.4rem"></DaiBase>
        <JoinWay v-if="productData" style="marginTop:0.4rem" :productData="productData"></JoinWay>
        <ApplyCond v-if="productData" style="marginTop:0.4rem" :productData="productData"></ApplyCond>
        <base-placeholder v-if="productData" style="marginTop:0.6rem"></base-placeholder>
        <SalaryIntro v-if="productData" style="marginTop:0.4rem" :productData="productData"></SalaryIntro>
        <PayWay style="marginTop:0.4rem" v-if="productData" :productData="productData"></PayWay>
        <ShareIcon :productData="productData" type="dai"></ShareIcon>
        <base-bottom height="2rem"></base-bottom>
    </div>
</template>
<script>
import DaiBase from './DaiBase';
import JoinWay from '../JoinWay';
import ApplyCond from './ApplyCond';
import SalaryIntro from '../SalaryIntro';
import PayWay from '../PayWay';
import ShareIcon from '../ShareIcon';
export default {
    components: { DaiBase, JoinWay, ApplyCond, SalaryIntro, PayWay, ShareIcon },
    props: {
        productData: {
            type: Object,
            default: null
        }
    }
};
</script>
