<template>
    <div class="send-label">
        <div class="title">添加标签</div>
        <div class="label">
            <div
                @click.stop="selLabel(item,index)"
                class="item"
                v-for="(item,index) in labelData"
                :key="index"
                :style="isColor(index)"
            >{{item.name}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        labelData: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            typeid: '',
            selInex: ''
        };
    },
    computed: {
        isColor() {
            return index => {
                if (index === this.selInex) {
                    return {
                        color: '#fff',
                        backgroundColor: '#4564F2'
                    };
                }
            };
        }
    },
    methods: {
        selLabel(item, index) {
            this.selInex = index;
            this.typeid = item.typeid;
            console.log(this.typeid)
        }
    }
};
</script>
<style lang="less" scoped>
.send-label {
    padding: 0px 0.3rem;
    > .title {
        font-size: 0.3rem;
        color: #000;
    }
    > .label {
        margin-top: 0.2rem;
        display: flex;
        flex-wrap: wrap;
        .item {
            margin: 0.1rem 0px;
            margin-right: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 0.38rem;
            font-size: 0.24rem;
            padding: 0px 0.2rem;
            line-height: normal;
            border-radius: 0.08rem;
            color: #626eec;
            background-color: #f1f1f1;
        }
    }
}
</style>


