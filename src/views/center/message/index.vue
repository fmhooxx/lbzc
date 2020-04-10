<template>
    <div class="message">
        <BaseNav>消息中心</BaseNav>
        <BaseTop></BaseTop>
        <BasePlaceholder></BasePlaceholder>
        <div class="content" v-if="newData">
            <div class="item" @click.stop="$goUrl('/messageCate?cate=0')">
                <div class="left">
                    <div class="img">
                        <img src="@images/icon-50.png">
                        <i v-if="parseInt(newData.sys_num)>0"></i>
                    </div>
                    <div class="text">系统公告</div>
                </div>
                <img class="right" src="@images/arrow-2.png">
            </div>
            <div class="item" @click.stop="$goUrl('/messageCate?cate=1')">
                <div class="left">
                    <div class="img">
                        <img src="@images/icon-51.png">
                        <i v-if="parseInt(newData.money_num)>0"></i>
                    </div>
                    <div class="text">佣金消息</div>
                </div>
                <img class="right" src="@images/arrow-2.png">
            </div>
            <div class="item" @click.stop="$goUrl('/messageCate?cate=2')">
                <div class="left">
                    <div class="img">
                        <img src="@images/icon-52.png">
                        <i v-if="parseInt(newData.custom_num)>0"></i>
                    </div>
                    <div class="text">客户状态消息</div>
                </div>
                <img class="right" src="@images/arrow-2.png">
            </div>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getMsgNew } from '_api/center';
export default {
    data() {
        return {
            newData: null,
            isBaseLoadPage: true
        };
    },
    mounted() {
        try {
            this.getMsgNew();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getMsgNew() {
            this.newData = await getMsgNew({
                type: 2
            });
        }
    }
};
</script>

<style lang="less" scoped>
.message {
    > .content {
        padding: 0px 0.3rem;
        .item {
            height: 1.26rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e7e8ea;
            > .left {
                display: flex;
                align-items: center;
                .img {
                    width: 0.53rem;
                    height: 0.53rem;
                    position: relative;
                    img {
                        display: flex;
                        width: 100%;
                        height: 100%;
                    }
                    i {
                        position: absolute;
                        top: -0.08rem;
                        right: -0.06rem;
                        width: 5px;
                        height: 5px;
                        border-radius: 50%;
                        background-color: #f52a20;
                    }
                }
                .text {
                    margin-left: 0.4rem;
                    font-size: 0.3rem;
                    color: #000;
                }
            }
            > .right {
                width: 0.12rem;
                height: 0.23rem;
            }
        }
    }
}
</style>

