<template>
    <div class="base-reward-pop" @click.stop="$emit('update:show',false)">
        <div @click.stop class="content animated fadeInDown faster">
            <div class="title">{{content.Title}}</div>
            <div class="text" v-html="content.Contents"></div>
            <img class="close" src="@images/close-1.png" @click.stop="$emit('update:show',false)">
        </div>
    </div>
</template>
<script>
import 'animate.css';
export default {
    props: {
        content: {
            type: Object,
            default: null
        }
    }
};
</script>

<style lang="less">
.base-reward-pop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 1, 0.7);
    z-index: 200;
    padding: 0.4rem;
    > .content {
        width: 100%;
        box-sizing: border-box;
        > .title {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1rem;
            font-size: 0.32rem;
            font-weight: bold;
            color: #fff;
            border-bottom: 1px solid #fff;
        }

        > .close {
            display: block;
            margin: 0 auto;
            margin-top: 0.5rem;
            width: 0.6rem;
            height: 0.6rem;
        }
    }
}
.base-reward-pop {
    .text {
        color: #fff !important;
        margin-top: 0.4rem;
        font-size: 0.28rem;
        line-height: 1.6;
        p {
            color: #fff !important;
        }
    }
}
</style>
