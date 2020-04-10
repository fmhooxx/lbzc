<template>
    <div class="orders">
        <BaseNav>订单管理</BaseNav>
        <BaseTop></BaseTop>
        <BasePlaceholder></BasePlaceholder>
        <div class="content" v-if="orderMenu.length>0">
            <div class="item" @click.stop="$goUrl('/orderDetail?type=dai')">
                <div class="left">
                    <img src="@images/icon-14.png">
                    <div>
                        <div class="name">贷款订单</div>
                        <div class="desc">{{orderMenu[0].description|threePoints(20)}}</div>
                    </div>
                </div>
                <img class="right" src="@images/arrow-2.png">
            </div>
            <div class="item" @click.stop="$goUrl('/orderDetail?type=card')">
                <div class="left">
                    <img src="@images/icon-15.png">
                    <div>
                        <div class="name">信用卡订单</div>
                        <div class="desc">{{orderMenu[1].description|threePoints(20)}}</div>
                    </div>
                </div>
                <img class="right" src="@images/arrow-2.png">
            </div>
            <div class="item" @click.stop="$goUrl('/orderDetail?type=cha')">
                <div class="left">
                    <img src="@images/icon-16.png">
                    <div>
                        <div class="name">征信订单</div>
                        <div class="desc">{{orderMenu[2].description|threePoints(20)}}</div>
                    </div>
                </div>
                <img class="right" src="@images/arrow-2.png">
            </div>
        </div>

        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getOrderMenu } from '_api/center';
export default {
    data() {
        return {
            orderMenu: [],
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            this.orderMenu = await getOrderMenu();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    }
};
</script>

<style lang="less" scoped>
.orders {
    > .content {
        display: flex;
        flex-direction: column;
        padding: 0px 0.3rem;
        > .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.26rem;
            border-bottom: 1px solid #e7e8ea;
            > .left {
                display: flex;
                align-items: center;
                > img {
                    width: 0.53rem;
                    height: 0.53rem;
                }
                > div {
                    margin-left: 0.26rem;
                    > .name {
                        line-height: normal;
                        font-size: 0.28rem;
                        color: #000;
                    }
                    > .desc {
                        line-height: normal;
                        margin-top: 0.1rem;
                        font-size: 0.22rem;
                        font-weight: 500;
                        color: rgba(132, 142, 158, 1);
                    }
                }
            }
            > .right {
                width: 0.12rem;
                height: 0.23rem;
            }
        }
    }
}
</style>