<template>
    <div class="notice-detail">
        <BaseNav>平台公告</BaseNav>
        <BaseTop></BaseTop>
        <div class="content" v-if="data">
            <div class="title">{{data.Title}}</div>
            <div class="desc">
                <div class="subTitle">蓝冰众创社区</div>
                <div class="date">{{timeText}}</div>
            </div>
            <div class="article" v-html="data.Contents"></div>
            <BaseBottom></BaseBottom>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getContentDetail } from '_api/func';
import { getMsgDetail } from '_api/center';
export default {
    data() {
        return {
            data: null,
            routeName: '',
            isBaseLoadPage: true
        };
    },
    computed: {
        timeText() {
            if(this.routeName=='noticeDetail'){
                return this.data.Addtime
            }else{
                return this.data.SendTime
            }
        }
    },
    async mounted() {
        try {
            this.id = this.$route.query.id;
            this.routeName = this.$route.name;
            if (this.routeName == 'noticeDetail') {
                this.data = await getContentDetail({
                    id: this.id
                });
            } else {
                this.data = await getMsgDetail({
                    id: this.id
                });
            }
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    }
};
</script>
<style lang="less" scoped>
.notice-detail {
    > .content {
        padding: 0px 0.3rem;
        overflow: hidden;
        > .title {
            margin-top: 0.4rem;
            color: #000;
            font-size: 0.4rem;
            line-height: normal;
        }
        > .desc {
            margin-top: 0.2rem;
            display: flex;
            align-items: center;
            height: 0.8rem;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #e7e8ea;
            > .subTitle {
                font-size: 0.24rem;
                color: #6e6e6e;
            }
            > .date {
                font-size: 0.24rem;
                margin-left: 20px;
                color: #6e6e6e;
            }
        }
        > .article {
            margin-top: 0.4rem;
            font-size: 0.28rem;
            line-height: normal;
            /deep/ img {
                width: 100%;
            }
        }
    }
}
</style>


