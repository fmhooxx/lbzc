<template>
    <div class="base-placeholder" :style="{height:height}"></div>
</template>
<script>
export default {
    props: {
        height: {
            type: String,
            default: '0.2rem'
        }
    }
};
</script>
<style lang="less" scoped>
.base-placeholder {
    background-color: #f6f7fb;
}
</style>


