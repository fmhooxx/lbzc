<template>
    <section class="card-list">
        <div class="content">
            <div class="title">
                <div class="item">热门卡片</div>
                <div class="item" @click.stop="isRewardPop=true">
                    <div class="text">奖励说明</div>
                    <img src="@images/arrow-1.png">
                </div>
            </div>
            <div class="item-list">
                <div
                    class="item"
                    v-for="item in cardDatas"
                    :key="`card_${item.ID}`"
                    @click.stop="goDetail(item.ID)"
                >
                    <div class="top">
                        <div class="img">
                            <img v-lazy="item.Logurl">
                        </div>
                        <div class="card-name">{{item.Name|threePoints}}</div>
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
        cardDatas: {
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
.card-list {
    background-color: #fff;
    > .content {
        > .title {
            color: #000;
            padding: 0rem 0.24rem;
            display: flex;
            justify-content: space-between;
            font-size: 0.32rem;
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
                height: 4.21rem;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0 0.10666667rem 0.8rem #e8e8e8;
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                overflow: hidden;
                &:nth-child(3n + 1) {
                    margin-left: 0px;
                }
                > .top {
                    box-sizing: border-box;
                    overflow: hidden;
                    height: 3.35rem;
                    > .img {
                        margin-top: 0.3rem;
                        display: flex;
                        justify-content: center;
                        > img {
                            width: 0.96rem;
                            height: 0.6rem;
                        }
                    }
                    > .card-name {
                        line-height: 1.15;
                        height: 1rem;
                        font-size: 0.3rem;
                        color: #333;
                        padding: 0px 0.1rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                    }
                    > .tag {
                        margin-top: 0.08rem;
                        display: flex;
                        justify-content: center;
                        padding: 0px 0.1rem;
                        > .tagName {
                            line-height: normal;
                            background-color: #eaf2ff;
                            border-radius: 0.02rem;
                            font-size: 0.2rem;
                            font-weight: 500;
                            color: #3880f9;
                            padding: 0px 0.06rem;
                            margin-left: 0.1rem;
                            border-radius: 0.02rem;
                            &:first-child {
                                margin-left: 0px;
                            }
                        }
                    }
                    > .intro {
                        height: 0.97rem;
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
                        padding: 0px 0.2rem;
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

