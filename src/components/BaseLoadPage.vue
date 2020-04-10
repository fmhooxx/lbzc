<template>
    <transition
        leave-active-class="active"
        leave-to-class="done"
    >
        <div class="base-load-page" @touchmove.prevent>
            <div class="line-scale">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </transition>
</template>
<script>
import 'loaders.css';
export default {};
</script>
<style lang="less" scoped>
.done {
    opacity: 0 !important;
}
.active {
    transition: all 0.4s ease-in !important;
}
.base-load-page {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    > .line-scale {
        transform: translateY(-100%);
        display: flex;
        align-items: center;
        justify-content: center;
        > div {
            background-color: #a59df5;
            width: 0.08rem;
            height: 0.7rem;
            border-radius: 0.05rem;
            margin: 0.05rem;
        }
    }
}
</style>


