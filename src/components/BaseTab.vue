<template>
    <div class="base-tab">
        <div class="content-tab" ref="content-tab">
            <div
                v-for="(item,index) in tabs"
                :key="`b_t_${index}`"
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
.base-tab {
    background-color: #fff;
    > .content-tab {
        display: flex;
        height: 0.98rem;
        position: relative;
        padding: 0px 0.3rem;
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
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            color: #61697d;
            white-space: nowrap;
            font-size: 0.29rem;
            margin-right: 1rem;
        }
    }
}
</style>
