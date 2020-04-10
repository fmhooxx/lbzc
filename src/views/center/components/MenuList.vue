<template>
    <div class="menu-list">
        <div
            class="item"
            v-for="item in menus"
            :key="item.ID"
            @click.stop="toPage(item.type,item.url)"
        >
            <div class="itemContent">
                <img class="left" v-lazy="item.icon" />
                <div class="right">
                    <div class="text">{{item.Name}}</div>
                    <img class="arrow" src="@images/arrow-2.png" />
                </div>
            </div>
        </div>
        <div class="item" @click.stop="$goUrl('/suggest')">
            <div class="itemContent">
                <img class="left" src="@images/f-1.png" alt />
                <div class="right">
                    <div class="text">意见反馈</div>
                    <img class="arrow" src="@images/arrow-2.png" />
                </div>
            </div>
        </div>
        <div class="item" @click.stop="$goUrl('/about')">
            <div class="itemContent">
                <img class="left" src="@images/f-2.png" alt />
                <div class="right">
                    <div class="text">关于我们</div>
                    <img class="arrow" src="@images/arrow-2.png" />
                </div>
            </div>
        </div>
        <div class="item" @click.stop="$goUrl('/setting?type=center')">
            <div class="itemContent">
                <img class="left" src="@images/f-3.png" alt />
                <div class="right">
                    <div class="text">系统设置</div>
                    <img class="arrow" src="@images/arrow-2.png" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        menus: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        // type : 1:需要登录 0 ：不需要登录
        toPage(type, url) {
            if (type == 1) {
                if (this.$platform != 'h5') {
                    if (url.indexOf('?') > -1) {
                        this.$open(`${url}&token=${this.$getToken()}&client=1`);
                    } else {
                        this.$open(`${url}?token=${this.$getToken()}&client=1`);
                    }
                } else {
                    if (url.indexOf('?') > -1) {
                        this.$open(`${url}&token=${this.$getToken()}`);
                    } else {
                        this.$open(`${url}?token=${this.$getToken()}`);
                    }
                }
            } else {
                if (this.$platform != 'h5') {
                    if (url.indexOf('?') > -1) {
                        this.$open(`${url}&client=1`);
                    } else {
                        this.$open(`${url}?client=1`);
                    }
                } else {
                    this.$open(url);
                }
            }
        }
    }
};
</script>

<style lang="less">
.menu-list {
    > .item {
        padding: 0px 0.3rem;
        &:active {
            background-color: rgba(244, 244, 244);
        }
        > .itemContent {
            display: flex;
            align-items: center;
            line-height: normal;
            > .left {
                flex: 0 0 0.28rem;
                height: 0.28rem;
            }
            > .right {
                flex: 1;
                margin-left: 0.3rem;
                display: flex;
                align-items: center;
                height: 1.15rem;
                justify-content: space-between;
                border-bottom: 1px solid #e9e9e9;
                > .text {
                    font-size: 0.28rem;
                    color: rgba(41, 47, 61, 1);
                }
                > .arrow {
                    flex: 0 0 0.12rem;
                    height: 0.23rem;
                }
            }
        }
    }
}
</style>
