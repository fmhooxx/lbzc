<template>
    <div class="group-nav">
        <div class="arrow" @click.stop="$goBack">
            <img src="@images/arrow-3.png">
        </div>
        <div class="text">
            <BaseTabNav v-if="tabs.length>0" :selected.sync="sel" :tabs="tabs"></BaseTabNav>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        selected: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            tabs: ['直属团队', '二级团队'],
            sel: 0
        };
    },
    watch: {
        sel: {
            handler: function() {
                this.$emit('update:selected',this.sel)
            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
.group-nav {
    height: 1.05rem;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-bottom: 1px solid #f7f7f7;
    > .arrow {
        width: 1rem;
        height: 100%;
        position: absolute;
        left: 0.3rem;
        display: flex;
        align-items: center;
        > img {
            width: 0.17rem;
            height: 0.31rem;
        }
    }
    > .text {
        width: 60%;
        font-size: 0.3rem;
    }

    /deep/.base-tab-nav {
        > .content-tab {
            height: 1.05rem;
            &:after {
                border: none;
            }
        }
    }
}
</style>
