<template>
    <div class="bbs-tab-nav">
        <div class="content-tab" ref="content-tab">
            <div
                v-for="(item,index) in tabs.forums"
                :key="`tabs_${index}`"
                class="tab-item"
                @click.stop="select(index)"
            >
                <div class="item">
                    <img v-show="selected!=index" :src="item.active_icons">
                    <img v-show="selected==index" :src="item.icons">
                    <div class="text">{{item.name}}</div>
                </div>
            </div>
            <div class="line" ref="line"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        tabs: {
            type: Object,
            default: null,
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
.bbs-tab-nav {
    padding: 0px 0.3rem;
    background-color: rgb(246, 246, 246, 0);
    > .content-tab {
        display: flex;
        height: 0.8rem;
        position: relative;
        background-color: #fff;
        box-shadow: 0 0.05rem 0.05rem #f5f5f5;
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
            > .item {
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 0.36rem;
                }
                .text {
                    line-height: normal;
                    color: #61697d;
                    font-size: 0.26rem;
                    margin-left: 0.1rem;
                }
            }
        }
    }
}
</style>

