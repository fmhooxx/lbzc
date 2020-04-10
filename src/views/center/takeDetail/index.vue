<template>
    <div class="take-detail">
        <BaseNav>提现明细</BaseNav>
        <div class="content">
            <TakeList></TakeList>
        </div>
    </div>
</template>
<script>
import TakeList from '../components/TakeList';
export default {
    components: { TakeList }
};
</script>
<style lang="less" scoped>
.take-detail {
    > .content {
        position: fixed;
        top: 1.05rem;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }
}
</style>
