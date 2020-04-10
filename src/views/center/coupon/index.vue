<template>
    <div class="coupon">
        <BaseNav>我的优惠卷</BaseNav>
        <BaseTop></BaseTop>
        <div class="content">
            <BaseTabNav v-if="tabs.length>0" :selected.sync="selected" :tabs="tabs"></BaseTabNav>
            <div class="list">
                <keep-alive>
                    <CouponList v-if="selected==0" state="notUse" key="notUse"></CouponList>
                    <CouponList v-if="selected==1" state="yetUse" key="yewUse"></CouponList>
                    <CouponList v-if="selected==2" state="overtime" key="overtime"></CouponList>
                </keep-alive>
            </div>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import CouponList from '../components/CouponList';
export default {
    components: { CouponList },
    data() {
        return {
            tabs: ['未使用', '已使用', '已过期'],
            selected: 0,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        await this.$waitTime(1000);
        this.isBaseLoadPage = false;
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
.coupon {
    > .content {
        position: fixed;
        top: 1.05rem;
        bottom: 0px;
        left: 0px;
        right: 0px;
        > .list {
            position: absolute;
            top: 0.8rem;
            left: 0px;
            right: 0px;
            bottom: 0px;
        }
        /deep/ .base-tab-nav {
            > .content-tab {
                > .tab-item {
                    > div {
                        color: #777;
                    }
                }
                &:after {
                    border: none;
                }
            }
        }
    }
}
</style>


