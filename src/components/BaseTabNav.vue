<template>
    <div class="base-tab-nav">
        <div class="content-tab" ref="content-tab">
            <div
                v-for="(item,index) in tabs"
                :key="`tabs_${index}`"
                class="tab-item"
                @click.stop="select(index)"
            >
                <div>{{item}}</div>
            </div>
            <div class="line" ref="line"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        tabs: {
            type: Array,
            default: [],
            required: true
        },
        selected: {
            type: Number,
            default: 0,
            required: true
        }
    },
    async mounted() {
        this.select(this.selected);
        this.isFirst = true;
    },
    activated() {
        if (this.isFirst) {
            this.select(this.selected);
        }
    },
    methods: {
        select(index) {
            this.$emit('update:selected', index);
            let el = this.$refs['content-tab'].children[index];
            let width = el.children[0].offsetWidth;
            let left = el.offsetLeft + el.children[0].offsetLeft;
            this.$refs['line'].style.width = `${width + 20}px`;
            this.$refs['line'].style.transform = `translateX(${left - 10}px)`;
        }
    }
};
</script>

<style lang="less">
.base-tab-nav {
    background-color: #fff;
    > .content-tab {
        display: flex;
        height: 0.8rem;
        position: relative;
        &:after {
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 0px;
            content: '';
            border-bottom: 1px solid #e9eaeb;
            height: 1px;
            transform: scaleY(0.5);
            transform-origin: 0 0;
        }
        > .line {
            position: absolute;
            bottom: 1px;
            width: 10%;
            left: 0px;
            right: 0px;
            height: 0.04rem;
            background-color: #5562ec;
            transition: all 0.4s ease;
        }
        > .tab-item {
            height: 100%;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            color: #61697d;
            font-size: 0.29rem;
        }
    }
}
</style>

