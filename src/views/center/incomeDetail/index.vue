<template>
    <div class="income-detail">
        <BaseNav>{{filterTitle}}</BaseNav>
        <BaseTop></BaseTop>
        <div class="content">
            <MemIncomeList v-if="type=='mem'"></MemIncomeList>
            <ShareIncomeList v-if="type=='share'"></ShareIncomeList>
            <GroupIncomeList v-if="type=='group'"></GroupIncomeList>
        </div>
    </div>
</template>
<script>
import MemIncomeList from '../components/MemIncomeList';
import ShareIncomeList from '../components/ShareIncomeList';
import GroupIncomeList from '../components/GroupIncomeList';
export default {
    components: { MemIncomeList, ShareIncomeList, GroupIncomeList },
    data() {
        return {
            type: ''
        };
    },
    mounted() {
        this.type = this.$route.query.type;
    },
    computed: {
        filterTitle() {
            if (this.type == 'mem') {
                return '会员收入';
            } else if (this.type == 'share') {
                return '推广收入';
            } else if (this.type == 'group') {
                return '团队收入';
            } else {
                return '';
            }
        }
    }
};
</script>

<style lang="less" scoped>
.income-detail {
    > .content {
        position: fixed;
        top: 1.05rem;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }
}
</style>

