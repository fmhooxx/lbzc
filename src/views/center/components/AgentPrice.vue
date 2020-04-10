<template>
    <div class="agent-price">
        <div class="title">
            <div class="p">推荐好友代理赚佣金</div>
            <div class="s">您的好友购买代理级别</div>
        </div>
        <div class="content">
            <div class="item" style="background: #FF9863;">
                <div class="left">初级代理</div>
                <div class="right">
                    <div class="now">现价{{priceList.level[0].Price}}元</div>
                    <div class="before">原价{{priceList.level[0].old_price}}元</div>
                </div>
            </div>
            <div class="item" style="background: #2BA0FA;">
                <div class="left">中级代理</div>
                <div class="right">
                    <div class="now">现价{{priceList.level[1].Price}}元</div>
                    <div class="before">原价{{priceList.level[1].old_price}}元</div>
                </div>
            </div>
            <div class="item" style="background: #91A1FF;">
                <div class="left">高级代理</div>
                <div class="right">
                    <div class="now">现价{{priceList.level[2].Price}}元</div>
                    <div class="before">原价{{priceList.level[2].old_price}}元</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        priceList: {
            type: Object,
            default: null
        }
    }
};
</script>

<style lang="less" scoped>
.agent-price {
    > .title {
        > .p {
            text-align: center;
            font-size: 0.3rem;
            font-weight: bold;
            color: #292f3d;
        }
        > .s {
            text-align: center;
            line-height: 1em;
            margin-top: 0.23rem;
            font-size: 0.24rem;
            color: #6e6e6e;
        }
    }
    > .content {
        padding: 0 0.3rem;
        margin-top: 0.7rem;
        margin-bottom: 0.4rem;
        > .item {
            display: flex;
            justify-content: space-between;
            height: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 0.4rem;
            > .left {
                line-height: normal;
                display: flex;
                align-items: center;
                margin-left: 0.4rem;
                font-size: 0.28rem;
                font-weight: bold;
                color: #fff;
            }
            > .right {
                margin-right: 0.6rem;
                display: flex;
                align-items: center;
                > .now {
                    line-height: normal;
                    color: #fff;
                    font-size: 0.28rem;
                    font-weight: bold;
                    margin-right: 0.35rem;
                }
                > .before {
                    line-height: normal;
                    color: #fff;
                    font-size: 0.22rem;
                    text-decoration: line-through;
                    color: rgba(255, 255, 255, 0.7);
                }
            }
        }
    }
}
</style>
