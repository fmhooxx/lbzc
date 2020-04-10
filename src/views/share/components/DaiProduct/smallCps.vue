<template>
    <div class="small-cps">
        <div class="title">
            <base-title size="0.32rem" style="border:none">小额CPS</base-title>
            <div class="sub">（共{{smallCpsData.remark.length+smallCpsData.unremark.length}}款）</div>
        </div>
        <div class="content">
            <div class="report">
                <div class="title" v-if="smallCpsData.remark.length>0">下款佣金需报备：</div>
                <div class="list">
                    <div
                        class="item"
                        @click.stop="goDetail(item.ID)"
                        v-for="(item,index) in smallCpsData.remark"
                        :key="`s_r_cps_${index}`"
                    >
                        <div class="set-time">{{item.Settletime}}</div>
                        <div class="top">
                            <img v-lazy="item.Logurl" />
                            <div class="text">
                                <div class="name">{{item.Name}}</div>
                                <div class="rate" v-html="rateFilter(item.ReferMoney)"></div>
                            </div>
                        </div>
                        <div class="bottom">{{item.Intro}}</div>
                    </div>
                </div>
            </div>
            <div class="no-report">
                <div class="title" v-if="smallCpsData.unremark.length>0">下款佣金无需报备：</div>
                <div class="list">
                    <div
                        class="item"
                        @click.stop="goDetail(item.ID)"
                        v-for="(item,index) in smallCpsData.unremark"
                        :key="`s_nr_cps_${index}`"
                    >
                        <div class="set-time">{{item.Settletime}}</div>
                        <div class="top">
                            <img v-lazy="item.Logurl" />
                            <div class="text">
                                <div class="name">{{item.Name}}</div>
                                <div class="rate" v-html="rateFilter(item.ReferMoney)"></div>
                            </div>
                        </div>
                        <div class="bottom">{{item.Intro}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        smallCpsData: {
            type: Object,
            default: null
        }
    },
    methods: {
        rateFilter(str) {
            if (!str) return '';
            let arr = str.split('');
            let reg = /^[0-9]+.?[0-9]*$/;
            let domStr = '';
            for (var i = 0; i < arr.length; i++) {
                if (reg.test(arr[i])) {
                    domStr = domStr + `<i style="font-size:0.28rem;color: #4564f2">${arr[i]}</i>`;
                } else {
                    domStr = domStr + `${arr[i]}`;
                }
            }
            return domStr;
        },
        goDetail(id) {
            this.$goUrl(`/shareDetail?id=${id}&type=1`);
        }
    }
};
</script>

<style lang="less" scoped>
.small-cps {
    > .title {
        display: flex;
        align-items: center;
        > .sub {
            font-size: 0.23rem;
            color: rgba(168, 168, 168, 1);
        }
    }
    > .content {
        padding: 0px 0.3rem;
        margin-bottom: 0.8rem;

        > .report,
        .no-report {
            margin-top: 0.2rem;
            > .title {
                display: flex;
                font-size: 0.23rem;
                color: rgba(168, 168, 168, 1);
            }
            > .list {
                margin-top: 0.4rem;
                display: flex;
                flex-wrap: wrap;
                > .item {
                    margin-bottom: 0.3rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-left: 22px;
                    padding-right: 5px;
                    flex: 0 0 3.34rem;
                    height: 1.77rem;
                    border-radius: 0.2rem;
                    box-shadow: 0 0.1rem 0.42rem 0.18rem rgba(169, 185, 221, 0.1);
                    position: relative;
                    &:nth-child(2n) {
                        margin-left: 0.2rem;
                    }
                    > .set-time {
                        width: 0.44rem;
                        height: 0.44rem;
                        line-height: 0.44rem;
                        text-align: center;
                        border-radius: 100%;
                        background-image: linear-gradient(to left bottom, #f9734c, #fcab1f);
                        font-size: 0.16rem;
                        font-weight: 500;
                        color: rgba(255, 255, 255, 1);
                        position: absolute;
                        top: 0.18rem;
                        right: 0.18rem;
                    }
                    > .top {
                        display: flex;
                        > img {
                            width: 0.75rem;
                            height: 0.77rem;
                        }
                        > .text {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            margin-left: 0.09rem;
                            > .name {
                                font-size: 0.27rem;
                                color: rgba(41, 41, 41, 1);
                            }
                            > .rate {
                                margin-top: 0.1rem;
                                font-size: 0.2rem;
                                color: rgba(159, 159, 159, 1);
                            }
                        }
                    }
                    > .bottom {
                        line-height: 1.2;
                        margin-top: 0.2rem;
                        font-size: 0.22rem;
                        color: rgba(159, 159, 159, 1);
                    }
                }
            }
        }
    }
}
</style>
