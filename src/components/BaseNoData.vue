<template>
    <div class="base-no-data">
        <div class="line">
            <i></i>
        </div>
        <div class="content">
            <slot>暂无数据</slot>
        </div>
        <div class="line">
            <i></i>
        </div>
    </div>
</template>
<style lang="less" scoped>
.base-no-data {
    display: flex;
    .line {
        flex: 1;
        position: relative;
        i {
            height: 1px;
            border-bottom: 1px dashed #ccc;
            position: absolute;
            left: 0px;
            right: 0px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .content {
        padding: 0px 0.2rem;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.28rem;
        color: #ccc;
        line-height: normal;
    }
}
</style>

