<template>
    <div class="card-detail">
        <base-nav>{{productData.info.Name?productData.info.Name:''}}</base-nav>
        <base-top></base-top>
        <card-base v-if="productData" style="marginTop:0.4rem" :productData="productData"></card-base>
        <join-way v-if="productData" style="marginTop:0.6rem" :productData="productData"></join-way>
        <base-placeholder v-if="productData" style="marginTop:0.6rem"></base-placeholder>
        <SalaryIntro v-if="productData" style="marginTop:0.4rem" :productData="productData"></SalaryIntro>
        <PayWay style="marginTop:0.4rem" v-if="productData" :productData="productData"></PayWay>
        <ShareIcon :productData="productData" type="card"></ShareIcon>
        <base-bottom height="2rem"></base-bottom>
    </div>
</template>
<script>
import CardBase from './CardBase';
import JoinWay from '../JoinWay';
import SalaryIntro from '../SalaryIntro';
import PayWay from '../PayWay';
import ShareIcon from '../ShareIcon';
export default {
    components: { CardBase, JoinWay, SalaryIntro, PayWay, ShareIcon },
    props: {
        productData: {
            type: Object,
            default: null
        }
    }
};
</script>

