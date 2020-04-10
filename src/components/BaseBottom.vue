<template>
    <div class="base-bottom" :style="{height:this.height}"></div>
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
.base-bottom {
    background-color: #fff;
}
</style>

