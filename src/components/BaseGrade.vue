<template>
    <div class="base-grade">
        <img :src="mtype|ruleImageFilter">
        <div class="grade">{{grade}}</div>
    </div>
</template>
<script>
export default {
    props: {
        mtype: {
            require: true
        },
        grade: {
            require: true
        }
    }
};
</script>

<style lang="less" scoped>
.base-grade {
    width: 1.44rem;
    height: 0.34rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    background-color: #fff;
    background-image: linear-gradient(to right, #5f6379, #3c3f4f);
    > img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 0.34rem;
        height: 0.34rem;
        transform: translateX(-50%);
    }
    > .grade {
        color: #fff;
        line-height: normal;
        font-size: 0.2rem;
    }
}
</style>
