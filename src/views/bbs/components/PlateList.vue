<template>
    <div class="plate-list">
        <div
            class="item"
            v-for="(item,index) in data"
            :key="index"
            @click.stop="$goUrl(`/postPlate?fid=${item.fid}`)"
        >
            <div class="left">
                <img :src="item.icons" />
                <div class="text">
                    <div class="name">{{item.name}}</div>
                    <div class="base">
                        <div class="topic-num">主题数：{{item.threads}}</div>
                        <i>|</i>
                        <div class="post-num">帖子数：{{item.posts}}</div>
                    </div>
                    <!-- <div class="desc">{{item.description==''?'暂无描述信息':item.description}}</div> -->
                </div>
            </div>
            <div class="right">
                <div
                    v-if="item.isfavorite===0"
                    class="noFollow"
                    @click.stop="follow(item,'confirm')"
                >关注</div>
                <div
                    v-if="item.isfavorite===1"
                    class="follow"
                    @click.stop="follow(item,'cancel')"
                >已关注</div>
            </div>
        </div>
        <BaseLoad v-if="isBaseload"></BaseLoad>
    </div>
</template>
<script>
import { followPlate } from '_api/bbs';
export default {
    props: {
        data: {
            type: Array,
            default: [],
            required: true
        }
    },
    data() {
        return {
            isBaseload: false
        };
    },
    methods: {
        async follow(item, status) {
            try {
                this.isBaseload = true;
                await followPlate({
                    idtype: 'fid',
                    id: item.fid,
                    status: status == 'confirm' ? 1 : 0
                });
                this.isBaseload = false;
                if (status == 'confirm') {
                    this.$msg.success('关注成功', () => {
                        this.$emit('reload');
                    });
                } else {
                    this.$msg.success('取消成功', () => {
                        this.$emit('reload');
                    });
                }
            } catch (err) {
                this.isBaseload = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.plate-list {
    padding: 0px 0.3rem;
    > .item {
        padding: 0.2rem 0.1rem;
        height: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;
        > .left {
            display: flex;
            align-items: center;
            img {
                width: 1rem;
                height: 1rem;
            }
            .text {
                margin-left: 0.2rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .name {
                    line-height: normal;
                    font-size: 0.28rem;
                    color: #000;
                }
                .base {
                    margin-top: 0.06rem;
                    display: flex;
                    align-items: center;
                    i {
                        font-size: 0.28rem;
                        line-height: normal;
                        padding: 0px 0.2rem;
                        color: #7b7979;
                    }
                    .topic-num,
                    .post-num {
                        line-height: normal;
                        font-size: 0.24rem;
                        color: #7b7979;
                    }
                }
                .desc {
                    margin-top: 0.08rem;
                    line-height: normal;
                    color: #7b7979;
                    font-size: 0.24rem;
                }
            }
        }
        > .right {
            display: flex;
            align-items: center;
            div {
                width: 1.4rem;
                height: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.28rem;
                color: #fff;
                line-height: normal;
            }
            .noFollow {
                background-color: #5461eb;
            }
            .follow {
                background-color: #c9c9c9;
            }
        }
    }
}
</style>

