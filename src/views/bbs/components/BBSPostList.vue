<template>
    <div class="bbs-post-list">
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
                    :key="item.tid"
                    @click.stop="goDetail(item.tid)"
                >
                    <div class="top">
                        <div class="base">
                            <img class="left" :src="item.headImg" />
                            <div class="right">
                                <div class="name" v-if="isNaN(Number(item.jobNum))">{{item.jobNum}}</div>
                                <div class="name" v-else>蓝冰众创-{{item.jobNum}}</div>
                                <div class="date">{{item.friendDate}}</div>
                            </div>
                        </div>
                        <div class="post-content">{{item.subject}}</div>
                        <div class="imgs">
                            <div
                                v-for="(imgItemlist,index) in arrSlice(item.thumb_images)"
                                :key="`i_${index}`"
                            >
                                <img v-lazy="imgItemlist.src" />
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <div class="item">
                                <img src="@images/icon-37.png" />
                                <span class="text">{{item.views}}</span>
                            </div>
                        </div>
                        <div class="right">
                            <div class="item">
                                <img src="@images/icon-38.png" />
                                <span class="text">{{item.sharetimes}}</span>
                            </div>
                            <div class="item" style="marginLeft:0.3rem;">
                                <img src="@images/icon-39.png" />
                                <span class="text">{{item.recommend_add}}</span>
                            </div>
                            <div class="item" style="marginLeft:0.3rem;">
                                <img src="@images/icon-40.png" />
                                <span class="text">{{item.replies}}</span>
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
import { getForumPost } from '_api/bbs';
export default {
    props: {
        type: {
            default: 0,
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
    computed: {
        arrSlice() {
            return arr => {
                if (arr.length > 3) {
                    return arr.slice(0, 3);
                } else {
                    return arr;
                }
            };
        }
    },
    methods: {
        async getList() {
            this.done = false;
            this.page = this.page + 1;
            try {
                let data = await getForumPost({
                    pagesize: this.num,
                    page: this.page,
                    type: this.type
                });
                this.listData = this.listData.concat(data.data.posts);
                this.done = true;
                if (data.pages <= 1) {
                    this.nomore = true;
                    this.done = false;
                }
            } catch (err) {
                this.nomore = true;
                this.done = false;
            }
        },
        dropUp() {
            this.getList();
        },
        goDetail(id) {
            this.$goUrl(`/bbs/postDetials?tid=${id}`)
            // this.$goUrl(`/postDetail?id=${id}`);
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

.bbs-post-list {
    position: relative;
    padding: 0px 0.3rem;
    > .list-content {
        > .item {
            padding-top: 0.6rem;
            border-bottom: 1px solid #e9e9e9;
            > .top {
                .base {
                    display: flex;
                    align-items: center;
                    .left {
                        width: 0.7rem;
                    }
                    .right {
                        margin-left: 0.3rem;
                        .name {
                            line-height: normal;
                            font-size: 0.28rem;
                            color: #5f7ea9;
                        }
                        .date {
                            margin-top: 0.1rem;
                            line-height: normal;
                            font-size: 0.22rem;
                            color: gray;
                        }
                    }
                }
                .post-content {
                    margin-top: 0.2rem;
                    // color: #afafaf;
                    color: #333;
                    font-size: 0.28rem;
                    line-height: normal;
                }
                .imgs {
                    margin-top: 0.4rem;
                    display: flex;
                    justify-content: space-around;
                    img {
                        width: 100%;
                        margin: 0px 0.1rem;
                    }
                }
            }
            // height: 1.97rem;
            > .bottom {
                height: 0.84rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left,
                .right {
                    display: flex;
                    align-items: center;
                }
                .item {
                    display: flex;
                    align-items: center;
                    img {
                        width: 0.34rem;
                    }
                    .text {
                        margin-left: 0.1rem;
                        line-height: normal;
                        font-size: 0.24rem;
                        color: #c2c2c2;
                    }
                }
            }
        }
    }
}
</style>

