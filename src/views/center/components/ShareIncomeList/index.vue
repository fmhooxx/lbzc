<template>
    <div class="share-income-list">
        <BaseTabNav v-if="tabs.length>0" :selected.sync="selected" :tabs="tabs"></BaseTabNav>
        <div class="content">
            <keep-alive>
                <IncomeList v-if="selected==0" type="dai" key="dai"></IncomeList>
                <IncomeList v-if="selected==1" type="card" key="card"></IncomeList>
                <ChaIncomList v-if="selected==2"></ChaIncomList>
            </keep-alive>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import IncomeList from './IncomeList';
import ChaIncomList from './ChaIncomList';
export default {
    components: { IncomeList, ChaIncomList },
    data() {
        return {
            tabs: ['网贷收入', '信用卡收入', '征信收入'],
            selected: 0,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        await this.$waitTime(1000);
        this.isBaseLoadPage = false;
    }
};
</script>

<style lang="less" scoped>
.share-income-list {
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
