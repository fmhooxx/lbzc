<template>
    <section class="card-list">
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
                    <div class="left">
                        <img v-lazy="item.Logurl">
                        <div class="text">
                            <div class="name">{{item.Name|threePoints(7)}}</div>
                            <div class="intro">{{item.Intro|threePoints(12)}}</div>
                            <div class="apply">
                                <i>{{item.AppNumbs}}</i>人已申请
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="bottom">立即申请</div>
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
    </section>
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
                    Itype: 2,
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
            this.$goUrl(`/shareDetail?id=${id}&type=2`);
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
.card-list {
    position: relative;
    padding: 0px 0.3rem;
    > .list-content {
        > .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 1.97rem;
            border-bottom: 1px solid rgb(241, 241, 241);
            > .left {
                display: flex;
                align-items: center;
                > img {
                    width: 1.5rem;
                    height: 1.09rem;
                }
                > .text {
                    margin-left: 0.25rem;
                    > .name {
                        line-height: normal;
                        font-size: 0.32rem;
                        font-weight: 500;
                        color: rgba(41, 47, 61, 1);
                    }
                    > .intro {
                        line-height: normal;
                        font-size: 0.23rem;
                        font-weight: 500;
                        color: #909090;
                        margin: 0.1rem 0rem;
                    }
                    > .apply {
                        line-height: normal;
                        font-size: 0.23rem;
                        font-weight: 500;
                        color: #909090;
                        > i {
                            color: #ff6927;
                        }
                    }
                }
            }
            > .right {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                > .bottom {
                    line-height: normal;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 0.1rem;
                    height: 0.45rem;
                    padding: 0px 0.33rem;
                    font-size: 0.23rem;
                    color: #fff;
                    border-radius: 0.3rem;
                    background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>

