<template>
    <div class="apply-list">
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
                <div class="list-item" v-for="(item,index) in listData" :key="`apply_${index}`">
                    <div
                        class="date"
                        v-show="dateFilter(item.Addtime,index)"
                    >{{item.Addtime.split(" ")[0]}}</div>
                    <div class="content">
                        <div class="item" :class="{line:!dateFilter(item.Addtime,index)}">
                            <div class="left" :style="{backgroundImage:`url(${item.Logurl})`}"></div>
                            <div class="right">
                                <div class="text">{{item.goodname}}</div>
                                <div class="date">{{item.Addtime}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="marginTop:0.4rem"></div>
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
                <div style="color:#a2a2a2;text-align:center;" v-if="Itype==1">您还没有贷款申请记录</div>
                <div style="color:#a2a2a2;text-align:center;" v-if="Itype==2">您还没有信用卡申请记录</div>
            </base-empty>
        </div>
    </div>
</template>
<script>
import { getApplyList } from '_api/my';

export default {
    props: {
        Itype: {
            type: Number,
            required: true
        },
        state: {
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
        this.getApplyList();
    },
    methods: {
        async getApplyList() {
            this.done = false;
            this.page = this.page + 1;
            try {
                let data = await getApplyList({
                    Itype: this.Itype,
                    page: this.page,
                    num: this.num
                });
                this.listData = this.listData.concat(data.data);
                this.done = true;
                if (data.total_page == 1) this.nomore = true;
            } catch (err) {
                if (this.listData.length == 0) this.isBaseEmpty = true;
                this.nomore = true;
            }
        },
        dropUp() {
            this.getApplyList();
        },
        cellNameFilter() {
            if (this.state == 'commit') {
                return '状态';
            } else {
                return '佣金';
            }
        },
        cellValueFilter(Ymoney) {
            if (this.state == 'commit') {
                return '待达标';
            } else {
                return Ymoney + '元';
            }
        },
        cellValueColorFilter() {
            if (this.state == 'commit') {
                return 'commit';
            } else {
                return 'done';
            }
        },
        // 是否显示日期，循环遍历之前的数据，若没有与自己一样的日期则显示本组日期
        dateFilter(time, index) {
            time = time.split(' ')[0];
            for (var i = 0; i < index; i++) {
                if (this.listData[i].Addtime.split(' ')[0] == time) {
                    return false;
                }
            }
            return true;
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

.apply-list {
    position: relative;
    background-color: #fff;
    > .list-content {
        > .list-item {
            > .date {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 0.7rem;
                font-size: 0.22rem;
                font-weight: 500;
                color: rgba(160, 160, 160, 1);
            }
            > .content {
                margin-top: 0.2rem;
                box-sizing: border-box;
                padding: 0px 0.3rem;
                > .item {
                    height: 1.68rem;
                    background: rgba(255, 255, 255, 1);
                    box-shadow: 0.02rem 0.03rem 0.1rem 1px rgba(120, 120, 120, 0.1);
                    border-radius: 0.16rem;
                    display: flex;
                    align-items: center;
                    > .left {
                        margin-left: 0.53rem;
                        width: 0.75rem;
                        height: 0.75rem;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                    > .right {
                        margin-left: 0.38rem;
                        > .text {
                            font-size: 0.3rem;
                            font-weight: bold;
                            color: rgba(37, 49, 70, 1);
                        }
                        > .date {
                            margin-top: 0.16rem;
                            font-size: 0.24rem;
                            font-weight: 500;
                            color: rgba(151, 159, 179, 1);
                        }
                    }
                }
            }
        }
    }
}
</style>
