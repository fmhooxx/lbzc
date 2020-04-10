<template>
    <div class="help-list">
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
                    @click.stop="goDetail(item.ID)"
                    v-for="item in listData"
                    :key="`h_l_${item.ID}`"
                >
                    <div class="title">{{item.Title}}</div>
                    <img src="@images/arrow-2.png">
                </div>
                <base-drop-up
                    v-if="listData.length>0"
                    :done="done"
                    :nomore="nomore"
                    @dropUp="dropUp"
                ></base-drop-up>
            </div>
        </transition>
        <HelpDetail v-if="isHelpDetail" :isHelpDetail.sync="isHelpDetail" :id="parseInt(id)"></HelpDetail>
    </div>
</template>
<script>
import { getHelpList } from '_api/center';
import HelpDetail from '../components/HelpDetail';
export default {
    components: { HelpDetail },
    props: {
        type: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            id: 0,
            nomore: false,
            page: 0,
            num: 30,
            done: false,
            listData: [],
            isHelpDetail: false
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
                let data = await getHelpList({
                    type: this.type,
                    page: this.page,
                    num: this.num
                });
                this.listData = this.listData.concat(data.data);
                this.done = true;
                if (data.pages == 1) this.nomore = true;
            } catch (err) {
                this.nomore = true;
            }
        },
        dropUp() {
            this.getList();
        },
        goDetail(id) {
            this.id = id;
            this.isHelpDetail = true;
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
.help-list {
    position: relative;
    padding: 0px 0.3rem;
    > .list-content {
        > .item {
            min-height: 1.16rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e5e5e5;
            > .title {
                padding: 0.2rem 0px;
                line-height: normal;
                font-size: 0.29rem;
                color: #726f6f;
            }
            > img {
                margin-left: 0.2rem;
                width: 0.12rem;
                height: 0.23rem;
            }
        }
    }
}
</style>

