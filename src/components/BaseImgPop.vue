<template>
    <div class="base-img-pop" @click.stop="close">
        <transition
            appear
            appear-active-class="animated bounceInDown"
            leave-active-class="animated bounceOutDown faster"
            v-on:after-leave="afterLeave"
        >
            <div v-if="isAnimation" class="content">
                <img class="imgPic" :src="imgSrc">
                <img class="close" @click.stop="close" src="@/assets/miGuan/newMiGuan-close.png">
            </div>
        </transition>
    </div>
</template>
<script>
import 'animate.css';
export default {
    props: {
        imgSrc: {
            type: String,
            required: true
        }
    },
    data: () => {
        return {
            isAnimation: true
        };
    },
    methods: {
        async close() {
            this.isAnimation = false;
        },
        afterLeave() {
            this.$emit('update:isBaseImgPop', false);
        }
    }
};
</script>

<style lang="less" scoped>
.base-img-pop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
    > .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        > .imgPic {
            width: 5.26rem;
            height: 5.97rem;
            border-radius: 0.05rem;
        }
        > .close {
            width: 0.45rem;
            height: 0.45rem;
            margin-top: 0.4rem;
        }
    }
}
</style>

