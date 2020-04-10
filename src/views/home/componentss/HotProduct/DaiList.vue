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
                    @click.stop="goDetail(item.ID)"
                >
                    <img class="left" :src="item.Logurl">
                    <div class="right">
                        <div class="text-left">
                            <div class="top">
                                <div class="name">{{item.Name}}</div>
                                <div class="amount">申请{{item.AppNumbs}}人</div>
                            </div>
                            <div class="bottom">{{item.Intro}}</div>
                        </div>
                        <div class="text-right">
                            <div class="bottom">
                                <div>立即申请</div>
                            </div>
                        </div>
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
import { getDaiList } from '_api/home';
export default {
    data() {
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
                let data = await getDaiList({
                    Itype: 1,
                    page: this.page,
                    rows: this.num
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
        },
        goDetail(id) {
            this.$goUrl(`/shareDetail?id=${id}&type=1`);
        }
    }
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
    padding: 0px 0.3rem;
    > .list-content {
        > .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 1.97rem;
            > .left {
                width: 0.81rem;
                height: 0.81rem;
            }
            > .right {
                flex: 1;
                height: 100%;
                display: flex;
                justify-content: space-between;
                margin-left: 0.3rem;
                border-bottom: 1px solid rgb(241, 241, 241);
                > .text-left {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    > .top {
                        display: flex;
                        align-items: center;
                        > .name {
                            font-size: 0.34rem;
                            font-weight: 500;
                            color: rgba(41, 47, 61, 1);
                        }
                        > .amount {
                            line-height: normal;
                            margin-left: 0.19rem;
                            font-size: 0.19rem;
                            font-weight: 500;
                            color: #f96e4c;
                            border: 1px solid #f96e4c;
                            border-radius: 0.2rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 0.34rem;
                            padding: 0px 0.18rem;
                            white-space: nowrap;
                        }
                    }
                    > .bottom {
                        line-height: normal;
                        width: 3.25rem;
                        font-size: 0.23rem;
                        color: #909090;
                        margin-top: 0.2rem;
                    }
                }
                > .text-right {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    > .bottom {
                        margin-top: 8px;
                        width: 100%;
                        display: flex;
                        justify-content: flex-end;
                        > div {
                            line-height: normal;
                            display: flex;
                            align-items: center;
                            height: 0.45rem;
                            padding: 0px 0.33rem;
                            font-size: 0.23rem;
                            color: #fff;
                            border-radius: 0.3rem;
                            background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
                        }
                    }
                }
            }
        }
    }
}
</style>
