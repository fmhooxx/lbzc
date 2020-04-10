<template>
    <transition leave-to-class="leave" leave-active-class="active">
        <div class="base-yj-pop" @click.stop="close">
            <transition
                appear
                appear-active-class="animated bounceInUp"
                leave-active-class="animated bounceOutUp faster"
            >
                <div class="wrap" v-if="isAnimation" @click.stop>
                    <div v-if="cpaText" class="content">
                        <div class="title">
                            <div class="text">保证金</div>
                            <img @click.stop="close" class="close" src="@images/close-2.png" />
                        </div>
                        <div class="bottom">
                            <div class="desc">{{cpaText.cpa_desc}}</div>
                            <div class="condition">
                                <h4>使用条款如下:</h4>
                                <div
                                    class="item"
                                    v-for="(item,index) in cpaText.cpa_limit"
                                    :key="index"
                                >
                                    <span class="dot"></span>
                                    <span class="limit">{{item}}</span>
                                </div>
                            </div>
                            <div class="btn" @click.stop="close('pay')">{{cpaText.price}} 元 开通专区权限</div>
                        </div>
                    </div>
                </div>
            </transition>
            <BaseLoad v-if="isBaseLoad"></BaseLoad>
        </div>
    </transition>
</template>
<script>
import 'animate.css';
import { getCpaText } from '_api/func';
export default {
    data() {
        return {
            cpaText: null,
            isBaseLoad: true,
            isAnimation: true
        };
    },
    async mounted() {
        try {
            await this.getCpaText();
            this.isBaseLoad = false;
        } catch (err) {
            this.$textTip(err);
            this.isBaseLoad = false;
        }
    },
    methods: {
        async getCpaText() {
            this.cpaText = await getCpaText();
        },
        close(type) {
            this.isAnimation = false;
            window.setTimeout(() => {
                console.dir(type);
                this.$emit('closeBaseYjPop', { type: type, price: this.cpaText.price });
            }, 400);
        }
    }
};
</script>
<style lang="less" scoped>
.leave {
    opacity: 0;
}
.active {
    transition: all 0.14s ease;
}
.base-yj-pop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    > .wrap {
        width: 100%;
        padding: 0px 0.6rem;
        > .content {
            background-color: #fff;

            > .title {
                height: 0.94rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #e7e8ea;
                position: relative;
                .text {
                    font-size: 0.3rem;
                    color: rgba(85, 98, 238, 1);
                }
                .close {
                    position: absolute;
                    top: 50%;
                    right: 0.3rem;
                    transform: translateY(-50%);
                    width: 0.25rem;
                    height: 0.25rem;
                }
            }
            > .bottom {
                padding: 0px 0.4rem;
                padding-bottom: 0.4rem;
                > .desc {
                    line-height: 1.6;
                    margin-top: 0.3rem;
                    font-size: 0.24rem;
                    color: #777777;
                }
                > .condition {
                    > h4 {
                        margin-top: 0.2rem;
                        margin-bottom: 0.2rem;
                        font-size: 0.25rem;
                        color: #5562ee;
                    }
                    > .item {
                        display: flex;
                        align-items: center;
                        margin: 0.1rem 0px;
                        > .dot {
                            flex-shrink: 0;
                            width: 5px;
                            height: 5px;
                            border-radius: 50%;
                            background-color: #000;
                            margin-right: 0.24rem;
                        }
                        > .limit {
                            line-height: 1.6;
                            font-size: 0.24rem;
                            color: #333;
                        }
                    }
                }
                > .btn {
                    margin-top: 0.56rem;
                    height: 0.85rem;
                    background: rgba(85, 98, 238, 1);
                    box-shadow: 0px 0.12rem 0.28rem 0.01rem rgba(85, 98, 238, 0.22);
                    border-radius: 0.42rem;
                    font-size: 0.3rem;
                    font-weight: bold;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
}
</style>


