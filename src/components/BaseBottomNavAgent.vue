<template>
    <div class="base-bottom-nav">
        <div @click.stop="$goUrl('/home')" class="item">
            <img v-show="select!='home'" src="@/assets/images/n-1.png">
            <img v-show="select=='home'" src="@/assets/images/n-1-1.png">
            <div class="text" :class="{sel:select=='home'}">首页</div>
        </div>
        <div @click.stop="$goUrl('/share')" class="item">
            <img v-show="select!='share'" src="@/assets/images/n-2.png">
            <img v-show="select=='share'" src="@/assets/images/n-2-1.png">
            <div class="text" :class="{sel:select=='share'}">推广</div>
        </div>
        <!-- <div @click.stop="$goUrl('/bbs')" class="item">
            <img v-show="select!='bbs'" src="@/assets/images/n-3.png">
            <img v-show="select=='bbs'" src="@/assets/images/n-3-1.png">
            <div class="text" :class="{sel:select=='bbs'}">社区</div>
        </div> -->
        <div @click.stop="$goUrl('/news')" class="item">
            <img v-show="select!='news'" src="@/assets/images/n-4.png">
            <img v-show="select=='news'" src="@/assets/images/n-4-1.png">
            <div class="text" :class="{sel:select=='news'}">资讯</div>
        </div>
        <div @click.stop="visit" class="item">
            <img v-show="select!='center'" src="@/assets/images/n-5.png">
            <img v-show="select=='center'" src="@/assets/images/n-5-1.png">
            <div class="text" :class="{sel:select=='center'}">我的</div>
        </div>
        <base-login-pop v-if="isBaseLoginPop" :isBaseLoginPop.sync="isBaseLoginPop"></base-login-pop>
    </div>
</template>
<script>
export default {
    data() {
        return {
            select: 'home',
            isBaseLoginPop: false
        };
    },
    methods: {
        visit() {
            if (this.$getToken()) {
                this.$goUrl('/center');
            } else {
                // this.isBaseLoginPop = true;
                this.$goUrl('/login');
            }
        }
    },
    watch: {
        '$route.name': {
            handler: function(newV, oldV) {
                switch (newV) {
                    case 'home':
                        this.select = 'home';
                        break;
                    case 'share':
                        this.select = 'share';
                        break;
                    case 'bbs':
                        this.select = 'bbs';
                        break;
                    case 'news':
                        this.select = 'news';
                        break;
                    default:
                        this.select = 'center';
                }
            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
.base-bottom-nav {
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 1.1rem;
    background-color: #fff;
    box-shadow: 0px 0.03rem 0.29rem 0px rgba(153, 153, 153, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 100;
    > .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        > img {
            width: 0.36rem;
            height: 0.36rem;
        }
        > .text {
            margin-top: 0.1rem;
            font-size: 0.24rem;
            font-weight: 400;
            color: rgba(157, 161, 172, 1);
        }
        > .sel {
            color: #5461eb;
        }
    }
}
</style>
