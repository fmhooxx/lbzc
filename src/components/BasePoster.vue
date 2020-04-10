<template>
    <div class="base-poster" @click.stop="close" leave-to-class="leave" leave-active-class="active">
        <transition
            appear
            appear-active-class="animated bounceInUp"
            leave-active-class="animated bounceOutUp faster"
        >
            <div v-if="isAnimation" class="content" @click.stop>
                <img class="close" @click.stop="close" src="@images/close-1.png">
                <img class="poster" :src="img">
                <div class="btn">
                    <div class="left" @click.stop="sharePic">立即分享</div>
                    <div class="right" @click.stop="savaPic">保存图片</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import 'animate.css';
import { saveImages, shareImags, shareLink } from '_native/func';
export default {
    props: {
        img: {
            type: String,
            default: ''
        },
        isBasePoster: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isAnimation: true
        };
    },
    methods: {
        close() {
            this.isAnimation = false;
            window.setTimeout(() => {
                this.$emit('update:isBasePoster', false);
            }, 400);
        },
        sharePic() {
            shareImags(this.img, () => {
                this.$open(this.img);
            });
        },
        savaPic() {
            saveImages(this.img, () => {
                this.$open(this.img);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.leave {
    opacity: 0;
}
.active {
    transition: all 0.14s ease;
}
.base-poster {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    > .content {
        width: 5.72rem;
        position: relative;
        > .close {
            position: absolute;
            top: -0.5rem;
            right: -0.5rem;
            width: 0.45rem;
            height: 0.45rem;
        }
        > .poster {
            margin: 0 auto;
            width: 100%;
            height: auto;
        }
        > .btn {
            margin-top: 0.32rem;
            display: flex;
            justify-content: space-between;
            > .left {
                flex-shrink: 0;
                width: 2.26rem;
                height: 0.67rem;
                background-color: #4c7fb0;
                border-radius: 0.33rem;
                font-size: 0.26rem;
                font-weight: bold;
                color: #d3e9ff;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            > .right {
                flex-shrink: 0;
                width: 3.2rem;
                height: 0.67rem;
                background-color: #3398fa;
                border-radius: 0.33rem;
                font-size: 0.26rem;
                font-weight: bold;
                color: #f4f4f4;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>

