<template>
    <div class="new-list">
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
            <div v-if="listData.length>0" class="list">
                <div
                    class="item"
                    v-for="item in listData"
                    :key="`new_${item.ID}`"
                    @click.stop="goDetail(item.ID,item.level_name)"
                >
                    <div class="content">
                        <div class="left">
                            <div class="top">{{item.Title|threePoints(24)}}</div>
                            <div class="bottom">
                                <div class="level">{{item.level_name}}</div>
                                <div class="add-time">{{item.Addtime}}</div>
                                <div class="view-amount">{{item.ViewCounk}}阅读</div>
                            </div>
                        </div>
                        <img class="right" v-lazy="item.CoverImage" />
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
import { getNewList } from '_api/news';

export default {
    props: {
        cate: {
            type: Number,
            required: true
        }
    },
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
                let data = await getNewList({
                    page: this.page,
                    cate: this.cate,
                    num: this.num
                });
                this.listData = this.listData.concat(data.data);
                this.done = true;
                if (data.page_total == 1) this.nomore = true;
            } catch (err) {
                this.nomore = true;
            }
        },
        dropUp() {
            this.getList();
        },
        goDetail(id, levelName) {
            let r = this.canView(this.$getUser().Rule, levelName);
            if (r) {
                this.$goUrl(`/newDetail?id=${id}&cate=${this.cate}`);
            } else {
                this.$textTip('您需要升级到' + levelName);
            }
        },
        conversion(levelName) {
            if (levelName == '初级代理') {
                return 2;
            } else if (levelName == '中级代理') {
                return 3;
            } else if (levelName == '高级代理') {
                return 4;
            } else {
                return 1;
            }
        },
        canView(myLevel, reqLeavel) {
            if (this.conversion(myLevel) >= this.conversion(reqLeavel)) {
                return true;
            } else {
                return false;
            }
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
.new-list {
    position: relative;
    > .list {
        > .item {
            padding: 0px 0.3rem;
            > .content {
                display: flex;
                justify-content: space-between;
                padding: 0.4rem 0px;
                border-bottom: 1px solid #f5f5f5;
                > .left {
                    width: 3.94rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    > .top {
                        color: #292f3d;
                        line-height: 1.2;
                        font-size: 0.28rem;
                    }
                    > .bottom {
                        margin-top: 0.3rem;
                        display: flex;
                        align-items: center;
                        > .level {
                            line-height: normal;
                            font-size: 0.22rem;
                            color: #fff;
                            background-color: #ffb1ae;
                            padding: 0.02rem 0.08rem;
                        }
                        > .add-time {
                            margin-left: 0.2rem;
                            color: #69727e;
                            font-size: 0.24rem;
                        }
                        > .view-amount {
                            margin-left: 0.2rem;
                            color: #69727e;
                            font-size: 0.24rem;
                        }
                    }
                }
                > .right {
                    width: 2.5rem;
                    height: 1.15rem;
                }
            }
        }
    }
}
</style>

