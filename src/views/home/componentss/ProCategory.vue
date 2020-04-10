<template>
    <div class="pro-category">
        <div
            class="item"
            @click.stop="goCate(item.name)"
            v-for="item in categoryData"
            :key="item.name"
        >
            <img v-lazy="item.img">
            <div class="name">{{item.name}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        categoryData: {
            type: Array,
            default: []
        }
    },
    methods: {
        goCate(name) {
            if (name.indexOf('贷款') > -1) {
                this.$goUrl('/share');
            } else if (name.indexOf('信用') > -1) {
                this.$goUrl('/share?type=card');
            } else if (name.indexOf('网黑') > -1) {
                this.$goUrl('/zx');
            } else {
                this.$goUrl('/material');
            }
        }
    }
};
</script>
<style lang="less" scoped>
.pro-category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.46rem;
    padding: 0px 0.3rem;
    border-top: 1px solid #f4f4f4;
    > .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        > img {
            width: 0.94rem;
            height: 0.94rem;
        }
        > .name {
            font-size: 0.28rem;
            font-weight: 500;
            color: rgba(97, 105, 125, 1);
            margin-top: 0.3rem;
        }
    }
}
</style>


