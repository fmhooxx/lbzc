<template>
    <div class="coupon-pop" @click.stop="close">
        <div
            class="content"
            @click.stop
            :style="{backgroundImage:`url(${require('@images/b-8.png')})`}"
        >
            <div class="item-list">
                <div
                    class="item"
                    @click.stop="goBuy(item.type)"
                    v-for="item in couponData"
                    :key="item.id"
                    :style="{backgroundImage:`url(${require('@images/icon-31.png')})`}"
                >
                    <div class="left">
                        <div class="left">
                            <span class="number">
                                ¥
                                <i>{{item.price.split('.')[0]}}</i>
                            </span>
                            <span class="lijian">立减券</span>
                        </div>
                        <div class="right">
                            <span class="gaoji">{{item.title}}</span>
                            <span class="daili">{{item.addtime}}~{{item.endtime}}</span>
                        </div>
                    </div>
                    <div class="right">
                        <div>立</div>
                        <div>即</div>
                        <div>使</div>
                        <div>用</div>
                    </div>
                </div>
            </div>
            <img class="close" src="@images/close-1.png" @click.stop="close"/>
            <img class="bg-1" src="@images/icon-54.png" />
            <img class="bg-2" src="@images/icon-55.png" />
            <img class="bg-2" src="@images/icon-56.png" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        couponData: {
            type: Array,
            default: []
        },
        isCouponPop: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit('update:isCouponPop', false);
        },
        // 2 去代理  3 去征信
        goBuy(type) {
            if (type == 2) {
                this.$goUrl('/agent');
            } else {
                this.$goUrl('zx');
            }
            this.close();
        }
    }
};
</script>

<style lang="less" scoped>
.coupon-pop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    > .content {
        width: 5.3rem;
        height: 7.7rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        > .item-list {
            margin-top: 3rem;
            width: 100%;
            height: 4.1rem;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            > .item {
                margin-left: 0.35rem;
                width: 4.62rem;
                height: 1.3rem;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                margin-bottom: 0.1rem;
                position: relative;
                overflow: hidden;
                > .left {
                    display: flex;
                    margin-left: 0.1rem;
                    margin-top: 0.1rem;
                    > .left {
                        width: 1.05rem;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border-right: 1px solid #e9e9e9;
                        > .number {
                            font-size: 0.18rem;
                            color: #f96951;
                            > i {
                                color: #f96951;
                                font-size: 0.42rem;
                                font-weight: bold;
                            }
                        }
                        > .lijian {
                            margin-top: 0.1rem;
                            font-size: 0.24rem;
                            font-weight: bold;
                            color: #929292;
                        }
                    }
                    > .right {
                        margin-left: 0.12rem;
                        display: flex;
                        flex-direction: column;
                        > .gaoji {
                            margin-top: 0.1rem;
                            font-size: 0.2rem;
                            font-weight: bold;
                            color: rgba(41, 47, 61, 1);
                        }
                        > .daili {
                            margin-top: 0.28rem;
                            font-size: 0.2rem;
                            color: rgba(146, 146, 146, 1);
                        }
                    }
                }
                > .right {
                    position: absolute;
                    top: -0.05rem;
                    height: 1.3rem;
                    right: 0.22rem;
                    font-size: 0.2rem;
                    line-height: 0.2rem;
                    font-weight: bold;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    > div {
                        color: #fff;
                        margin: 0.03rem 0px;
                    }
                    > div:first-child {
                        margin-top: 0px;
                    }
                    > div:last-child {
                        margin-bottom: 0px;
                    }
                }
            }
        }
        > .close {
            width: 0.45rem;
            height: 0.45rem;
            position: absolute;
            top: 0px;
            right: -0.4rem;
        }
        > .bg-1 {
            width: 0.5rem;
            height: 0.41rem;
            position: absolute;
            top: 2rem;
            left: -0.4rem;
        }
        > .bg-2 {
            width: 0.63rem;
            height: 0.53rem;
            position: absolute;
            bottom: 0.15rem;
            right: -0.55rem;
        }
        > .bg-3 {
            width: 0.98rem;
            height: 1.12rem;
            position: absolute;
            bottom: 0.3rem;
            left: -0.55rem;
        }
    }
}
</style>

