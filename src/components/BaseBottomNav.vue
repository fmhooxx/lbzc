<template>
    <div class="base-bottom-nav">
        <div @click.stop="$goUrl('/Daibeishop/platweb')" class="item">
            <img v-show="select!='dai'" src="@images/nav-1.png">
            <img v-show="select=='dai'" src="@images/nav-1-1.png">
            <div class="text" :class="{sel:select=='dai'}">贷款</div>
        </div>
        <div @click.stop="$goUrl('/Daibeishop/xinTui')" class="item">
            <img v-show="select!='card'" src="@images/nav-2.png">
            <img v-show="select=='card'" src="@images/nav-2-1.png">
            <div class="text" :class="{sel:select=='card'}">信用卡</div>
        </div>
        <div @click.stop="$goUrl('/chaZheng')" class="item">
            <img v-show="select!='chaZheng'" src="@images/nav-3.png">
            <img v-show="select=='chaZheng'" src="@images/nav-3-1.png">
            <div class="text" :class="{sel:select=='chaZheng'}">查网黑</div>
        </div>
        <div @click.stop="visit" class="item">
            <img v-show="select!='my'" src="@images/nav-4.png">
            <img v-show="select=='my'" src="@images/nav-4-1.png">
            <div class="text" :class="{sel:select=='my'}">我的</div>
        </div>
        <base-login-pop v-if="isBaseLoginPop" :isBaseLoginPop.sync="isBaseLoginPop"></base-login-pop>
    </div>
</template>
<script>
export default {
    data() {
        return {
            select: 'dai',
            isBaseLoginPop: false
        };
    },
    methods: {
        visit() {
            if (this.$getToken()) {
                this.$goUrl('/my');
            } else {
                this.isBaseLoginPop = true;
                // this.$goUrl('/login');
            }
        }
    },
    watch: {
        '$route.name': {
            handler: function(newV, oldV) {
                switch (newV) {
                    case 'dai':
                        this.select = 'dai';
                        break;
                    case 'card':
                        this.select = 'card';
                        break;
                    case 'chaZheng':
                        this.select = 'chaZheng';
                        break;
                    default:
                        this.select = 'my';
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
    justify-content: space-around;
    align-items: center;
    z-index: 100;
    > .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > img {
            width: 0.36rem;
            height: 0.36rem;
        }
        > .text {
            font-size: 0.2rem;
            font-weight: 400;
            margin-top: 0.1rem;
            color: rgba(157, 161, 172, 1);
        }
        > .sel {
            color: #5461eb;
        }
    }
}
</style>
