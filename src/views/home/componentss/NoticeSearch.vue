<template>
    <div class="notice-search" :class="{'shadow':isShadow}">
        <div class="notice" @click.stop="$goUrl('/message')">
            <img src="@images/icon-2.png">
            <div v-if="isNewMessage" class="point"></div>
        </div>
        <div class="title">蓝冰众创</div>
        <img class="search" src="@images/icon-4.png" @click.stop="$goUrl('/search')">
    </div>
</template>
<script>
export default {
    props: {
        isNewMessage: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShadow: false
        };
    },
    mounted() {
        this.borderShow();
    },
    methods: {
        borderShow() {
            window.addEventListener('scroll', () => {
                let scrolltop = document.documentElement.scrollTop;
                if (scrolltop == 0) {
                    this.isShadow = false;
                } else {
                    this.isShadow = true;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.notice-search {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 0.3rem;
    height: 1.1rem;
    background-color: #fff;
    z-index: 200;
    > .notice {
        width: 0.28rem;
        height: 0.36rem;
        position: relative;
        img {
            display: flex;
            width: 100%;
            height: 100%;
        }
        > .point {
            position: absolute;
            top: -0.1rem;
            right: -0.06rem;
            width: 0.12rem;
            height: 0.12rem;
            background-color: #f52a20;
            border-radius: 100%;
        }
    }
    > .title {
        line-height: normal;
        font-size: 0.32rem;
        font-weight: bold;
        color: rgba(41, 47, 61, 1);
    }
    > .search {
        width: 0.38rem;
        height: 0.33rem;
    }
    &.shadow {
        box-shadow: 0px 0px 0px 1px rgba(167, 167, 180, 0.1);
    }
}
</style>

