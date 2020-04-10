<template>
    <div class="dai-list">
        <transition leave-to-class="leave" leave-active-class="leave-active">
            <base-load-widget
                style="position:absolute;top:1rem;left:0px;right:0px"
                v-if="listData.length==0"
            ></base-load-widget>
        </transition>
        <transition
            appear
            appear-class="enter"
            appear-active-class="done"
            enter-class="enter"
            enter-active-class="done"
        >
            <div v-if="listData.length>0" class="list-content">
                <div
                    class="item"
                    v-for="item in listData"
                    :key="item.ID"
                    @click.stop="$goUrl('/Daibeishop/detail?id='+item.ID)"
                >
                    <div class="left">
                        <img v-lazy="item.Logurl">
                    </div>
                    <div class="center">
                        <div class="top">
                            <span>{{item.Name}}</span>
                            <span>{{item.Intro}}</span>
                        </div>
                        <div class="bottom">
                            <div class="money">
                                <span>最高额度</span>
                                <span>{{item.eduname}}</span>
                            </div>
                            <div class="data">
                                <span>借款期限</span>
                                <span>{{item.Jkdays}}</span>
                            </div>
                            <div class="day">
                                <span>日费率</span>
                                <span>{{item.DayfeeRate}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div>
                            <i>{{item.AppNumbs}}</i>人已申请
                        </div>
                        <div>立即申请</div>
                    </div>
                </div>
                <base-drop-up
                    v-if="listData.length>0"
                    :done="done"
                    :nomore="nomore"
                    @dropUp="dropUp"
                ></base-drop-up>
            </div>
        </transition>
    </div>
</template>
<script>
import { getProList } from '_api/dai';
export default {
    props: {
        cateid: {
            type: String,
            required: true
        }
    },
    data: () => {
        return {
            nomore: false,
            page: 0,
            num: 30,
            done: false,
            listData: []
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        async getList() {
            this.done = false;
            this.page = this.page + 1;
            try {
                let data = await getProList({
                    cateid: this.cateid,
                    page: this.page,
                    num: this.num
                });
                this.listData = this.listData.concat(data.data);
                this.done = true;
                if (data.total_page == 1) this.nomore = true;
            } catch (err) {
                this.nomore = true;
            }
        },
        dropUp() {
            this.getList();
        }
    },
};
</script>
<style lang="less" scoped>
.enter {
    opacity: 0;
    transform: translateY(0.5rem);
    background-color: #fff;
}
.done {
    transition: all 1s ease;
    transition-delay: 0.2s;
}
.leave {
    opacity: 0;
}
.leave-active {
    transition: all 0.5s ease;
}

.dai-list {
    position: relative;
    background-color: #fff;
    > .list-content {
        display: flex;
        flex-direction: column;
        padding: 0px 0.3rem;
        background-color: #fff;
        > .item {
            display: flex;
            padding-top: 0.6rem;
            padding-bottom: 0.3rem;
            border-bottom: 1px solid #ededed;
            position: relative;
            > .left {
                > img {
                    transform: translateY(-0.06rem);
                    width: 0.41rem;
                    height: 0.41rem;
                    vertical-align: text-top;
                }
            }
            > .center {
                margin-left: 0.18rem;
                display: flex;
                flex-direction: column;
                > .top {
                    display: flex;
                    align-items: center;
                    > span {
                        &:first-child {
                            font-size: 0.32rem;
                            font-weight: 500;
                            color: rgba(33, 39, 51, 1);
                        }
                        &:last-child {
                            margin-left: 0.18rem;
                            height: 0.34rem;
                            font-size: 0.22rem;
                            line-height: 0.34rem;
                            font-weight: 500;
                            color: #909090;
                            border: 1px solid rgba(144, 144, 144, 1);
                            opacity: 0.6;
                            border-radius: 0.16rem;
                            padding: 0px 0.18rem;
                        }
                    }
                }
                > .bottom {
                    margin-top: 0.3rem;
                    display: flex;
                    > div {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-right: 0.46rem;
                        > span {
                            &:first-child {
                                font-size: 0.22rem;
                                font-weight: 500;
                                color: rgba(144, 144, 144, 1);
                            }
                            &:last-child {
                                margin-top: 0.15rem;
                            }
                        }
                    }
                    > .money {
                        > span {
                            &:last-child {
                                font-size: 0.22rem;
                                font-weight: 500;
                                color: rgba(255, 105, 39, 1);
                            }
                        }
                    }
                    > .data {
                        > span {
                            &:last-child {
                                font-size: 0.24rem;
                                font-weight: 500;
                                color: rgba(33, 39, 51, 1);
                            }
                        }
                    }
                    > .day {
                        > span {
                            &:last-child {
                                font-size: 0.24rem;
                                font-weight: 500;
                                color: rgba(33, 39, 51, 1);
                            }
                        }
                    }
                }
            }
            > .right {
                position: absolute;
                right: 0px;
                bottom: 0.28rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                > div {
                    &:first-child {
                        font-size: 0.23rem;
                        font-weight: 500;
                        color: #909090;
                        > i {
                            color: rgba(255, 105, 39, 1);
                        }
                    }
                    &:last-child {
                        margin-top: 0.1rem;
                        width: 1.6rem;
                        height: 0.34rem;
                        background: rgba(140, 199, 254, 1);
                        background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
                        border-radius: 0.22rem;
                        font-size: 0.23rem;
                        font-weight: 500;
                        color: rgba(255, 255, 255, 1);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        line-height: normal;
                    }
                }
            }
        }
    }
}
</style>


