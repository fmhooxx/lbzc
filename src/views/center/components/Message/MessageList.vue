<template>
    <div class="sys-list">
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
                <div class="list-item" v-for="(item,index) in listData" :key="`m_l_${index}`">
                    <div class="date">{{item.SendTime.split(" ")[0]}}</div>
                    <div class="content">
                        <div class="wrap">
                            <div class="title">{{item.Title}}</div>
                            <div class="desc" :class="{sysDesc:type==0}" v-html="item.Contents"></div>
                            <div
                                class="see"
                                v-if="type==0"
                                @click.stop="$goUrl(`/messageDetail?id=${item.ID}`)"
                            >
                                <div class="text">点击查看</div>
                                <img src="@images/arrow-2.png">
                            </div>
                            <div v-if="type!=0" style="height:0.3rem;backgroundColor:#fff"></div>
                        </div>
                    </div>
                </div>
                <div style="height:0.4rem;backgroundColor:#f6f7fb"></div>
                <base-drop-up
                    v-if="listData.length>0"
                    :done="done"
                    :nomore="nomore"
                    @dropUp="dropUp"
                ></base-drop-up>
            </div>
        </transition>
        <div v-if="isBaseEmpty">
            <base-bottom></base-bottom>
            <base-bottom></base-bottom>
            <base-empty>
                <div style="color:#a2a2a2;text-align:center;">您还没有消息</div>
            </base-empty>
        </div>
    </div>
</template>
<script>
import { getMsgList } from '_api/center';
export default {
    props: {
        type: {
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
            listData: [],
            isBaseEmpty: false
        };
    },
    mounted() {
        // type 0，系统   1，佣金  2，客户状态消息

        this.getList();
    },
    methods: {
        async getList() {
            this.done = false;
            this.page = this.page + 1;
            try {
                let data = await getMsgList({
                    page: this.page,
                    num: this.num,
                    type: this.type
                });
                this.listData = this.listData.concat(data.data);
                this.done = true;
                if (data.total_page == 1) {
                    this.nomore = true;
                    this.done = false;
                }
            } catch (err) {
                if (this.listData.length == 0) this.isBaseEmpty = true;
                this.nomore = true;
                this.done = false;
            }
        },
        dropUp() {
            this.getList();
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

.sys-list {
    position: relative;
    > .list-content {
        > .list-item {
            > .date {
                height: 0.7rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f6f7fb;
                font-size: 0.22rem;
                color: #a0a0a0;
            }
            > .content {
                padding: 0px 0.3rem;
                background-color: #f6f7fb;
                .wrap {
                    overflow: hidden;
                    background-color: #fff;
                    border-radius: 0.1rem;
                    .title {
                        margin-top: 0.3rem;
                        font-size: 0.3rem;
                        color: #000;
                        padding: 0px 0.3rem;
                    }
                    .desc {
                        margin-top: 0.26rem;
                        font-size: 0.24rem;
                        color: #6e6e6e;
                        line-height: 1.7;
                        padding: 0px 0.3rem;
                    }
                    .sysDesc {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    .see {
                        margin-top: 0.3rem;
                        height: 0.8rem;
                        padding: 0 0.3rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-top: 1px solid #f4f4f4;
                        .text {
                            line-height: normal;
                            font-size: 0.24rem;
                            color: #8b8b8b;
                        }
                        img {
                            width: 0.12rem;
                            height: 0.2rem;
                        }
                    }
                }
            }
        }
    }
}
/deep/ .base-drop-up {
    background-color: #f6f7fb;
}
</style>
