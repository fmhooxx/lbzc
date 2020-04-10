<template>
    <div class="bbs-func-icon">
        <div class="add" @click.stop="sendPost">
            <img src="@images/add.svg" />
        </div>
        <div
            class="go-top"
            @click.stop="goTop"
            v-show="isGoTop"
            style="marginTop:0.2rem;background: rgba(0,0,0,.4);"
        >
            <img src="@images/gotop.svg" style="width:0.5rem;height:0.5rem" />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isGoTop: false
        };
    },
    mounted() {
        window.addEventListener('scroll', this._event);
    },
    methods: {
        _event() {
            let y = window.scrollY;
            if (y > 300) {
                this.isGoTop = true;
            } else {
                this.isGoTop = false;
            }
        },
        goTop() {
            window.scrollTo(0, 0);
        },
        sendPost() {
            if (!this.$getToken()) {
                return this.$textTip('您还未登录');
            }
            this.$goUrl('/sendPost');
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this._event);
    }
};
</script>

<style lang="less" scoped>
.bbs-func-icon {
    position: fixed;
    right: 0.4rem;
    bottom: 2rem;
    height: 2.2rem;
    .add,
    .go-top {
        width: 0.86rem;
        height: 0.86rem;
        background: rgba(30, 63, 210, 0.6);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 0.4rem;
            height: 0.4rem;
        }
    }
}
</style>
