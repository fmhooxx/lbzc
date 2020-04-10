<template>
    <div class="order-detail-list">
        <BaseTabNav v-if="tabs.length>0" :selected.sync="selected" :tabs="tabs"></BaseTabNav>
        <div class="content">
            <keep-alive>
                <DetailList
                    v-if="selected==0&&type!='cha'"
                    :type="type"
                    state="commit"
                    key="commit"
                ></DetailList>
                <DetailList v-if="selected==1&&type!='cha'" :type="type" state="done" key="done"></DetailList>
                <DetailList v-if="selected==2&&type!='cha'" :type="type" state="useless" key="useless"></DetailList>
                <ChaDetailList
                    v-if="selected==0&&type=='cha'"
                    :type="type"
                    state="commit"
                    key="c_commit"
                ></ChaDetailList>
                <ChaDetailList
                    v-if="selected==1&&type=='cha'"
                    :type="type"
                    state="useless"
                    key="c_useless"
                ></ChaDetailList>
                <ChaDetailList
                    v-if="selected==2&&type=='cha'"
                    :type="type"
                    state="done"
                    key="c_done"
                ></ChaDetailList>
            </keep-alive>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import DetailList from './DetailList';
import ChaDetailList from './ChaDetailList';
export default {
    components: { DetailList, ChaDetailList },
    props: {
        type: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            tabs: [],
            selected: 0,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        if (this.type == 'dai') {
            this.tabs = ['待达标', '已达标', '已失效'];
        } else if (this.type == 'card') {
            this.tabs = ['已提交', '已结算', '已失效'];
        } else {
            this.tabs = ['已提交', '已失效', '已结算'];
        }
        await this.$waitTime(1000);
        this.isBaseLoadPage = false;
    }
};
</script>

<style lang="less" scoped>
.order-detail-list {
    height: 100%;
    position: relative;
    > .content {
        position: absolute;
        top: 0.8rem;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
    /deep/ .base-tab-nav {
        > .content-tab {
            > .tab-item {
                > div {
                    color: #777;
                }
            }
            &:after {
                border: none;
            }
        }
    }
}
</style>
