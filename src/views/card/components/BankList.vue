<template>
    <div class="bank-list">
        <div class="content">
            <div class="title">
                <div class="item">热门银行</div>
                <div class="item" @click.stop="isRewardPop=true">
                    <div class="text">奖励说明</div>
                    <img src="@images/arrow-1.png">
                </div>
            </div>
            <div class="no-member">
                <div
                    class="item"
                    v-for="item in bankDatas"
                    :key="`bank_${item.ID}`"
                    @click.stop="$goUrl('/Daibeishop/cdetail?id='+item.ID)"
                >
                    <div class="img">
                        <img v-lazy="item.Logurl">
                    </div>
                    <div class="bank-name">{{item.BankName}}</div>
                    <div class="tag">
                        <div class="tagName">{{item.tags[0]}}</div>
                        <div class="tagName" v-if="item.tags[1]">{{item.tags[1]}}</div>
                    </div>
                    <div class="intro">
                        <div>{{item.new_rights[0]}}</div>
                        <div v-if="item.new_rights[1]">{{item.new_rights[1]}}</div>
                    </div>
                </div>
            </div>
        </div>
        <base-reward-pop v-if="isRewardPop" :show.sync="isRewardPop" :content="rewardContent"></base-reward-pop>
    </div>
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
    }
};
</script>

<style lang="less" scoped>
.bank-list {
    margin-top: 0.8rem;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    > .content {
        box-sizing: border-box;
        > .title {
            padding: 0px 0.24rem;
            display: flex;
            justify-content: space-between;
            font-size: 0.32rem;
            color: #333;
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
        > .no-member {
            margin-top: 0.3rem;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            padding: 0rem 0.24rem;
            > .item {
                margin-left: 0.16rem;
                width: 2.22rem;
                height: 3.05rem;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0 0.10666667rem 0.8rem #e8e8e8;
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                overflow: hidden;
                &:nth-child(3n + 1) {
                    margin-left: 0px;
                }
                > .img {
                    margin-top: 0.3rem;
                    display: flex;
                    justify-content: center;
                    > img {
                        width: 0.96rem;
                        height: 0.6rem;
                    }
                }
                > .bank-name {
                    margin-top: 0.2rem;
                    text-align: center;
                    font-size: 0.3rem;
                    color: #333;
                    line-height: 1.15;
                }
                > .tag {
                    margin-top: 0.18rem;
                    display: flex;
                    justify-content: center;
                    padding: 0px 0.1rem;
                    > .tagName {
                        background: #eaf2ff;
                        border-radius: 0.02rem;
                        font-size: 0.2rem;
                        line-height: normal;
                        font-weight: 500;
                        color: #3880f9;
                        padding: 0.02rem 0.06rem;
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
        }
    }
}
</style>
