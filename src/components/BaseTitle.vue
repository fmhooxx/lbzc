<template>
    <div class="base-title">
        <i></i>
        <div :style="{fontSize:size}">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        size: {
            type: String,
            default: '0.28rem'
        }
    }
};
</script>

<style lang="less" scoped>
.base-title {
    display: flex;
    align-items: center;
    height: 1.08rem;
    padding: 0px 0.3rem;
    border-bottom: 1px solid #f4f4f4;
    > i {
        width: 0.05rem;
        height: 0.28rem;
        background-color: #5461eb;
    }
    > div {
        line-height: normal;
        font-weight: bold;
        color: rgba(41, 47, 61, 1);
        margin-left: 0.2rem;
    }
}
</style>

