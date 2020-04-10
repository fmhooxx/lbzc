<template>
    <section class="income">
        <BaseNav>收入明细</BaseNav>
        <BaseTop></BaseTop>
        <BasePlaceholder></BasePlaceholder>
        <div class="content">
            <div class="item" @click.stop="$goUrl('/incomeDetail?type=mem')">
                <div class="left">
                    <img src="@images/icon-25.png">
                    <div>会员收入</div>
                </div>
                <img class="right" src="@images/arrow-2.png">
            </div>
            <div class="item" @click.stop="$goUrl('/incomeDetail?type=share')">
                <div class="left">
                    <img src="@images/icon-26.png">
                    <div>推广收入</div>
                </div>
                <img class="right" src="@images/arrow-2.png">
            </div>
            <div class="item" @click.stop="$goUrl('/incomeDetail?type=group')">
                <div class="left">
                    <img src="@images/icon-27.png">
                    <div>团队收入</div>
                </div>
                <img class="right" src="@images/arrow-2.png">
            </div>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </section>
</template>
<script>
export default {
    data() {
        return {
            isBaseLoadPage: true
        };
    },
    mounted() {
        this.isBaseLoadPage = false;
    }
};
</script>
<style lang="less" scoped>
.income {
    > .content {
        padding: 0px 0.3rem;
        > .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 1.26rem;
            border-bottom: 1px solid #e7e8ea;
            > .left {
                display: flex;
                align-items: center;
                img {
                    width: 0.53rem;
                    height: 0.53rem;
                }
                > div {
                    line-height: normal;
                    margin-left: 0.26rem;
                    font-size: 0.29rem;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 1);
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

