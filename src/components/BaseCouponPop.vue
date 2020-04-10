<template>
    <div class="base-coupon-pop" @click.stop="close">
        <transition
            appear
            appear-class
            appear-active-class="animated bounceInUp"
            leave-active-class="animated bounceOutDown"
        >
            <div v-if="isAnimation" class="content">
                <div class="title">
                    <div class="text">选择优惠卷</div>
                    <div class="img" @click.stop="close">
                        <img src="@/assets/images/close-2.png" />
                    </div>
                </div>
                <div class="content">
                    <CouponList :type="type" current="pay" state="notUse" @select="close"></CouponList>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import 'animate.css';
import CouponList from '../views/center/components/CouponList';
export default {
    components: { CouponList },
    props: {
        type: {
            default: 0
        },
        isBaseCouponPop: {
            type: Boolean
        }
    },
    data() {
        return {
            isAnimation: true
        };
    },
    methods: {
        close() {
            this.isAnimation = false;
            window.setTimeout(() => {
                this.$emit('update:isBaseCouponPop', false);
            }, 600);
        }
    }
};
</script>

<style lang="less" scoped>
.base-pay-enter {
    opacity: 0;
}
.base-pay-active {
    transition: all 0.4s ease;
}
.base-coupon-pop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0);
    > .content {
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        height: 70%;
        background-color: #fff;
        > .title {
            height: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid rgb(241, 241, 241);
            background-color: #fff;
            position: relative;
            > .text {
                font-size: 0.34rem;
                font-weight: bold;
                color: rgba(18, 28, 50, 1);
            }
            > .img {
                width: 1.2rem;
                height: 100%;
                position: absolute;
                top: 0px;
                right: 0px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                > img {
                    margin-right: 0.3rem;
                    width: 0.25rem;
                    height: 0.25rem;
                }
            }
        }
        > .content {
            position: absolute;
            top: 1.1rem;
            bottom: 0px;
            left: 0px;
            right: 0px;
        }
    }
}
</style>

