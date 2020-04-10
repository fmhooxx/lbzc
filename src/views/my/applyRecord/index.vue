<template>
    <div class="apply-record">
        <base-nav>申请记录</base-nav>
        <base-top></base-top>
        <base-tab-nav v-if="tabs.length>0" :selected.sync="selected" :tabs="tabs"></base-tab-nav>
        <apply-list key="commit" v-if="selected==0" :state="'commit'" :Itype="1"></apply-list>
        <apply-list key="done" v-if="selected==1" :state="'done'" :Itype="2"></apply-list>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import ApplyList from '../components/ApplyList';
export default {
    components: { ApplyList },
    data: () => {
        return {
            tabs: ['贷款申请', '信用卡申请'],
            isBaseLoadPage: false,
            selected: 0
        };
    }
};
</script>

<style lang="less" scoped>
.apply-record {
    background-color: #fff;
}
</style>
