<template>
    <div class="com-post-list">
        <transition leave-to-class="leave" leave-active-class="leave-active">
            <base-load-widget
                style="position:absolute;top:1rem;left:0px;right:0px"
                v-if="listData.length==0&&!isBaseEmpty"
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
                                <div
                                    class="name"
                                    v-if="item.jobNum&&isNaN(Number(item.jobNum))"
                                >{{item.jobNum}}</div>
                                <div
                                    class="name"
                                    v-else-if="item.jobNum&&!isNaN(Number(item.jobNum))"
                                >蓝冰众创-{{item.jobNum}}</div>
                                <div class="name" v-else>{{item.author}}</div>
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
        <transition
            appear
            appear-class="enter"
            appear-active-class="done"
            enter-class="enter"
            enter-active-class="done"
        >
            <BaseEmpty v-if="isBaseEmpty" style="paddingTop:2rem;"></BaseEmpty>
        </transition>
    </div>
</template>
<script>
import { getMyPost, getPlatePost, getSearch } from '_api/bbs';
export default {
    props: {
        type: {
            type: String,
            required: true
        },
        label: {
            type: Object
        },
        keywords: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            nomore: false,
            page: 0,
            num: 30,
            done: false,
            listData: [],
            isBaseEmpty: false
        };
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
    mounted() {
        this.getList();
    },
    watch: {
        keywords: {
            handler: function() {
                if (this.keywords) {
                    this.isBaseEmpty = false;
                    this.getList(true);
                }
            }
        }
    },
    methods: {
        async getList(refresh) {
            this.done = false;
            if (refresh) {
                this.page = 1;
            } else {
                this.page = this.page + 1;
            }
            let params = this.paramsResult(this.type);
            try {
                let data;
                if (this.type == 'plate') {
                    data = await getPlatePost({
                        pagesize: this.num,
                        page: this.page,
                        ...params
                    });
                } else if (this.type == 'search') {
                    data = await getSearch({
                        pagesize: this.num,
                        page: this.page,
                        ...params
                    });
                } else {
                    data = await getMyPost({
                        pagesize: this.num,
                        page: this.page,
                        ...params
                    });
                }
                if (refresh) {
                    this.listData = data.data;
                } else {
                    this.listData = this.listData.concat(data.data);
                }
                this.done = true;
                if (data.pages <= 1) {
                    this.nomore = true;
                    this.done = false;
                    // if (this.type == 'search' && data.pages < 1) {
                    //     this.isBaseEmpty = true;
                    // }
                    if (data.pages < 1) {
                        this.isBaseEmpty = true;
                    }
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
            // this.$goUrl(`/postDetail?id=${id}`);
            this.$goUrl(`/bbs/postDetials?tid=${id}`);
        },
        paramsResult(type) {
            if (type == 'myPost') {
                return {
                    type: 'topic',
                    idtype: 'tid'
                };
            } else if (type == 'postCollection') {
                return {
                    type: 'favorite',
                    idtype: 'tid'
                };
            } else if (type == 'search') {
                return {
                    keywords: this.keywords
                };
            } else if (type == 'plate') {
                return {
                    typeid: this.label.typeid,
                    fid: this.label.fid
                };
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

.com-post-list {
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

