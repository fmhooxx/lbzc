<template>
    <div class="base-mask" @click.stop @touchmove.prevent>
        <img src="@images/mask-1.png" />
    </div>
</template>
<style lang="less" scoped>
.base-mask {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    > img {
        position: absolute;
        top: 0px;
        right: 0.2rem;
        width: 4.27rem;
        height: 2.49rem;
    }
}
</style>
