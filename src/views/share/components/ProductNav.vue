<template>
    <div class="product-nav">
        <div
            class="title"
            style="marginLeft:0.2rem"
            @click.stop="swithch('dai')"
            :class="{sel:sel=='dai'}"
        >贷款</div>
        <div
            class="title"
            style="marginLeft:0.7rem"
            @click.stop="swithch('card')"
            :class="{sel:sel=='card'}"
        >信用卡</div>
        <img @click.stop="$goUrl('/search')" class="search" src="@images/search-1.png">
    </div>
</template>
<script>
export default {
    props: {
        sel: {
            type: String,
            default: 'dai'
        }
    },
    methods: {
        swithch(str) {
            this.$goUrl(`/share?type=${str}`)
            this.$emit('update:sel', str);
        }
    }
};
</script>
<style lang="less" scoped>
.product-nav {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 100;
    background-color: #fff;
    height: 1.14rem;
    display: flex;
    align-items: center;
    padding: 0px 0.3rem;
    > .title {
        line-height: normal;
        color: #444d61;
        font-size: 0.31rem;
        font-weight: bold;
    }
    > .sel {
        color: #5461eb;
        font-size: 0.38rem;
    }
    > .search {
        width: 0.38rem;
        height: 0.33rem;
        position: absolute;
        top: 50%;
        right: 0.3rem;
        transform: translateY(-50%);
    }
}
</style>

