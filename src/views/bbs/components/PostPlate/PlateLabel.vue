<template>
    <div class="post-label">
        <div
            class="item"
            @click.stop="selLabel(index)"
            v-for="(item,index) in label"
            :key="index"
            :style="bgColor(index)"
        >{{item.name}}</div>
        <div class="place"></div>
    </div>
</template>
<script>
export default {
    props: {
        label: {
            type: Array,
            required: true
        },
        selIndex: {
            required: true
        }
    },
    data() {
        return {};
    },
    computed: {
        bgColor(index) {
            return index => {
                if (this.selIndex == index) {
                    return {
                        backgroundColor: '#5461eb'
                    };
                } else {
                    return {
                        backgroundColor: '#ccc'
                    };
                }
            };
        }
    },
    methods: {
        selLabel(index) {
            this.$emit('update:selIndex', index);
        }
    }
};
</script>

<style lang="less" scoped>
.post-label {
    height: 1rem;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    -webkit-overflow-scrolling: auto;
    padding-right: 0.2rem;
    background-color: #e6e6e6;
    &::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
    }
    .item {
        flex-shrink: 0;
        min-width: 1.8rem;
        height: 0.5rem;
        padding: 0px 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.28rem;
        white-space: nowrap;
        color: #fff;
        line-height: normal;
        margin: 0px 0.2rem;
    }
    .place{
        flex-shrink: 0;
        width: 0.1rem;
        height: 100%;
    }
}
</style>

