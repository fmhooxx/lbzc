<template>
    <div class="send-content">
        <div class="top">
            <input type="text" placeholder="请输入标题" v-model="title">
        </div>
        <BasePlaceholder height="0.1rem"></BasePlaceholder>
        <div class="bottom">
            <textarea placeholder="常来发帖，一起撸钱" maxlength="300" v-model="content"></textarea>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: '',
            content: ''
        };
    }
};
</script>

<style lang="less" scoped>
.send-content {
    > .top {
        padding: 0px 0.3rem;
        height: 1.2rem;
        input {
            display: flex;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            font-size: 0.26rem;
            color: #7f7d7d;
            line-height: normal;
            &::placeholder {
                font-size: 0.26rem;
                color: #a6a6a6;
            }
        }
    }
    > .bottom {
        margin-top: 0.3rem;
        padding: 0px 0.3rem;
        height: 4rem;
        textarea {
            display: flex;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            font-size: 0.26rem;
            color: #7f7d7d;
            line-height: normal;
            &::placeholder {
                font-size: 0.26rem;
                color: #a6a6a6;
            }
        }
    }
}
</style>

