<template>
    <div class="base-img-pre" @click.stop="close">
        <cube-slide ref="slide" :data="imgs" :auto-play="false">
            <cube-slide-item v-for="(item, index) in imgs" :key="`center_slide_${index}`">
                <div class="img-content">
                    <img :src="item">
                </div>
            </cube-slide-item>
            <template slot="dots" slot-scope="props">
                <div class="my-dot">{{props.current+1}} / {{props.dots.length}}</div>
            </template>
        </cube-slide>
    </div>
</template>
<script>
export default {
    props: {
        imgs: {
            type: Array,
            default: []
        },
        isBaseImgPre: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit('update:isBaseImgPre', false);
        }
    }
};
</script>

<style lang="less" scoped>
.base-img-pre {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    .cube-slide {
        height: 80%;
    }

    .img-content {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            height: 10rem;
        }
    }
    .my-dot {
        color: #fff;
        font-size: 0.28rem;
        transform: translateY(-0.2rem);
    }
}
</style>

