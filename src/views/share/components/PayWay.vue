<template>
    <div class="pay-way">
        <base-title size="0.32rem" style="border:none">结算方式</base-title>
        <div class="list">
            <div
                class="item"
                v-for="(item,index) in productData.info.AccountType"
                :key="`p_w_${index}`"
            >
                <i></i>
                <div class="text">{{item}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        productData: {
            type: Object,
            default: null
        }
    }
};
</script>
<style lang="less" scoped>
.pay-way {
    > .list {
        > .item {
            display: flex;
            align-items: center;
            padding: 0.1rem 0.36rem;
            > i {
                width: 6px;
                height: 6px;
                flex-shrink: 0;
                border-radius: 50%;
                background-color: #8f8f8f;
            }
            > .text {
                line-height: normal;
                margin-left: 0.2rem;
                font-size: 0.26rem;
                font-weight: 500;
                color: #8f8f8f;
            }
        }
    }
}
</style>