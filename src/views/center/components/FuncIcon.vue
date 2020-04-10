<template>
    <div class="func-icon">
        <div class="top">
            <div class="item" @click.stop="$goUrl('/agent')">
                <img src="@images/c-1.png">
                <div>升级代理</div>
            </div>
            <div class="item" @click.stop="$goUrl('/poster')">
                <img src="@images/c-2.png">
                <div>推荐海报</div>
            </div>
            <div class="item" @click.stop="$goUrl('/group')">
                <img src="@images/c-3.png">
                <div>我的团队</div>
            </div>
            <div class="item" @click.stop="$goUrl('/orders')">
                <img src="@images/c-4.png">
                <div>订单管理</div>
            </div>
        </div>
        <div class="bottom" style="marginTop:0.6rem">
            <div class="item" @click.stop="$router.push('/wallet')">
                <img src="@images/c-5.png">
                <div>我的钱包</div>
            </div>
            <div class="item" @click.stop="$goUrl('/priceChart')">
                <img src="@images/c-6.png">
                <div>价格表</div>
            </div>
            <div class="item" @click.stop="$goUrl('/coupon')">
                <img src="@images/c-7.png">
                <div>优惠券</div>
            </div>
            <div class="item" @click.stop="$goUrl('/helpCenter')">
                <img src="@images/c-8.png">
                <div>新手帮助</div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.func-icon {
    padding: 0px 0.3rem;
    > .top,
    .bottom {
        display: flex;
        justify-content: space-between;
        > .item {
            display: flex;
            align-items: center;
            flex-direction: column;
            > img {
                width: 0.84rem;
                height: 0.84rem;
            }
            > div {
                font-size: 0.26rem;
                color: rgba(97, 105, 125, 1);
            }
        }
    }
}
</style>

