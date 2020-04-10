<template>
    <div class="order-detail">
        <BaseNav>{{filterTitle}}</BaseNav>
        <BaseTop></BaseTop>
        <div class="content">
            <orderList v-if="type=='dai'" type="dai"></orderList>
            <orderList v-if="type=='card'" type="card"></orderList>
            <orderList v-if="type=='cha'" type="cha"></orderList>
        </div>
    </div>
</template>
<script>
import orderList from '../components/orderList';
export default {
    components: { orderList },
    data() {
        return {
            type: ''
        };
    },
    mounted() {
        this.type = this.$route.query.type;
    },
    computed: {
        filterTitle() {
            if (this.type == 'dai') {
                return '贷款订单';
            } else if (this.type == 'card') {
                return '信用卡订单';
            } else if (this.type == 'cha') {
                return '征信订单';
            } else {
                return '';
            }
        }
    }
};
</script>
<style lang="less" scoped>
.order-detail {
    > .content {
        position: fixed;
        top: 1.05rem;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }
}
</style>
