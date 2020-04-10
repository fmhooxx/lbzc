<template>
    <div class="group-income-list">
        <BaseTabNav v-if="tabs.length>0" :selected.sync="selected" :tabs="tabs"></BaseTabNav>
        <div class="content">
            <keep-alive>
                <IncomeList v-if="selected==0" type="dai" key="dai"></IncomeList>
                <IncomeList v-if="selected==1" type="card" key="card"></IncomeList>
            </keep-alive>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import IncomeList from './IncomeList';
export default {
    components: { IncomeList },
    data() {
        return {
            tabs: ['网贷收入', '信用卡收入'],
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
.group-income-list {
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
