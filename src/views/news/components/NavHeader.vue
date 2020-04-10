<template>
    <div class="nav-header" :style="{height:this.height}">
        <div class="arrow" @click.stop="$goUrl('/news')" v-if="arrow">
            <img src="@images/arrow-3.png" />
        </div>
        <div class="text">
            <slot></slot>
        </div>
        <div class="share" v-if="showShareIcon" @click.stop="share">
            <img src="@images/icon-7.png" />
        </div>
    </div>
</template>
<script>
import { shareLink } from '_native/func';
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
    computed: {
        showShareIcon() {
            if (this.$platform() == 'h5') {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        share() {
            let url = window.location.href;
            shareLink(url);
        }
    }
};
</script>

<style lang="less" scoped>
.nav-header {
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
            width: 0.32rem;
            height: 0.3rem;
        }
    }
}
</style>
