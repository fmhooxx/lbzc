<template>
    <div class="base-top" :style="{height:this.height}"></div>
</template>
<script>
export default {
    props: {
        height: {
            type: String,
            default: '1.05rem'
        }
    }
};
</script>
<style lang="less" scoped>
.base-top {
    background-color: #fff;
}
</style>


