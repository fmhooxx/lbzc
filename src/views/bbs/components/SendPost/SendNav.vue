<template>
    <div class="send-nav" :style="{height:this.height}">
        <div class="arrow" @click.stop="$goBack" v-if="arrow">
            <img src="@images/arrow-3.png">
        </div>
        <div class="text">
            <slot></slot>
        </div>
        <div class="share" @click.stop="submit">
            <img src="@images/icon-48.png">
        </div>
    </div>
</template>
<script>
export default {
    props: {
        height: {
            type: String,
            default: '1.05rem'
        },
        arrow: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        submit() {
            this.$emit('submit');
        }
    }
};
</script>

<style lang="less" scoped>
.send-nav {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-bottom: 1px solid #f7f7f7;
    > .arrow {
        width: 1rem;
        height: 100%;
        position: absolute;
        left: 0.3rem;
        display: flex;
        align-items: center;
        > img {
            width: 0.17rem;
            height: 0.31rem;
        }
    }
    > .text {
        line-height: normal;
        font-size: 0.3rem;
    }
    > .share {
        width: 1rem;
        height: 100%;
        position: absolute;
        right: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        > img {
            width: 0.4rem;
        }
    }
}
</style>
