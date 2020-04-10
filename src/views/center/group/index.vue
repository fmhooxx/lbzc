<template>
    <div class="group">
        <GroupNav :selected.sync="selected"></GroupNav>
        <BaseTop></BaseTop>
        <div class="content">
            <keep-alive>
                <GroupList v-if="selected==0" type="direct" key="direct"></GroupList>
                <GroupList v-if="selected==1" type="indirect" key="indirect"></GroupList>
            </keep-alive>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import GroupNav from '../components/GroupNav';
import GroupList from '../components/GroupList';
export default {
    components: { GroupNav, GroupList },
    data() {
        return {
            selected: 0,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        await this.$waitTime(2000);
        this.isBaseLoadPage = false;
    }
};
</script>
<style lang="less" scoped>
.group {
    > .content {
        position: fixed;
        top: 1.05rem;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
}
</style>
