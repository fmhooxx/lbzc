<template>
    <section class="bank-list">
        <div class="content">
            <div class="title">
                <div class="item">热门银行</div>
                <div class="item" @click.stop="isRewardPop=true">
                    <div class="text">奖励说明</div>
                    <img src="@images/arrow-1.png">
                </div>
            </div>
            <div class="item-list">
                <div
                    class="item"
                    v-for="item in bankDatas"
                    :key="`bank_${item.ID}`"
                    @click.stop="goDetail(item.ID)"
                >
                    <div class="top">
                        <div class="bank-name">
                            <img class="img" v-lazy="item.Logurl">
                            <div class="name">{{item.BankName}}</div>
                        </div>
                        <div class="tag">
                            <div class="tagName">{{item.tags[0]}}</div>
                            <div class="tagName" v-if="item.tags[1]">{{item.tags[1]}}</div>
                        </div>
                        <div class="intro">
                            <div>{{item.new_rights[0]}}</div>
                            <div v-if="item.new_rights[1]">{{item.new_rights[1]}}</div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="btn">
                            <div class="text">奖励 {{item.money}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <base-reward-pop v-if="isRewardPop" :show.sync="isRewardPop" :content="rewardContent"></base-reward-pop>
    </section>
</template>
<script>
export default {
    props: {
        bankDatas: {
            type: Array,
            default: () => {
                return [];
            }
        },
        rewardContent: {
            type: Object,
            default: null
        }
    },
    data: () => {
        return {
            isRewardPop: false
        };
    },
    methods: {
        goDetail(id) {
            this.$goUrl(`/shareDetail?id=${id}&type=2`);
        }
    }
};
</script>

<style lang="less" scoped>
.bank-list {
    background-color: #fff;
    > .content {
        > .title {
            padding: 0px 0.24rem;
            display: flex;
            justify-content: space-between;
            font-size: 0.32rem;
            color: #000;
            > .item {
                display: flex;
                align-items: center;
                > .text {
                    color: #5461eb;
                    margin-right: 0.1rem;
                }
                > img {
                    width: 0.11rem;
                    height: 0.21rem;
                }
            }
        }
        > .item-list {
            margin-top: 0.3rem;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            padding: 0px 0.24rem;
            > .item {
                margin-left: 0.16rem;
                width: 2.22rem;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0 0.10666667rem 0.8rem #e8e8e8;
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                box-sizing: border-box;
                &:nth-child(3n + 1) {
                    margin-left: 0px;
                }
                > .top {
                    height: 2.18rem;
                    overflow: hidden;
                    > .bank-name {
                        margin-top: 0.3rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        > .img {
                            width: 0.48rem;
                            height: 0.3rem;
                        }
                        > .name {
                            margin-left: 0.2rem;
                            font-size: 0.26rem;
                            font-weight: 600;
                            color: rgba(41, 47, 61, 1);
                        }
                    }
                    > .tag {
                        margin-top: 0.18rem;
                        display: flex;
                        justify-content: center;
                        padding: 0px 0.1rem;
                        > .tagName {
                            line-height: normal;
                            background: rgba(84, 97, 235, 0.1);
                            border-radius: 0.02rem;
                            font-size: 0.2rem;
                            font-weight: 500;
                            color: rgba(84, 97, 235, 1);
                            padding: 0px 0.06rem;
                            margin-left: 0.1rem;
                            border-radius: 0.02rem;
                            &:first-child {
                                margin-left: 0px;
                            }
                        }
                    }
                    > .intro {
                        height: 1.07rem;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        box-sizing: border-box;
                        padding: 0px 0.1rem;
                        > div {
                            text-align: center;
                            font-size: 0.22rem;
                            font-weight: 500;
                            color: rgba(161, 169, 182, 1);
                            margin-top: 0.1rem;
                            &:first-child {
                                margin-top: 0px;
                            }
                        }
                    }
                }
                > .bottom {
                    height: 0.86rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-top: 1px solid #e9eaeb;
                    > .btn {
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        white-space: nowrap;
                        width: 1.8rem;
                        height: 0.38rem;
                        border-radius: 0.32rem;
                        background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
                        > .text {
                            line-height: normal;
                            font-size: 0.2rem;
                            font-weight: 500;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                }
            }
        }
    }
}
</style>

