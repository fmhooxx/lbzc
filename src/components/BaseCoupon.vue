<template>
    <div class="base-coupon" @click.stop :style="{backgroundImage:`url(${getBGC})`}">
        <div class="left">
            <div class="left">
                <div class="money" :style="{color:state=='notUse'?'#f96951':''}">
                    ¥
                    <i :style="{color:state=='notUse'?'#f96951':''}">{{data.price}}</i>
                </div>
                <div class="text">立减券</div>
            </div>
            <div class="right">
                <div class="name">{{data.type_name}}</div>
                <div class="time">{{data.start_time}} ~ {{data.endtime}}</div>
            </div>
        </div>
        <div class="right" v-if="state=='overtime'||state=='notUse'">
            <div>未</div>
            <div>使</div>
            <div>用</div>
        </div>
        <div class="right" v-if="state=='notUse'" @click.stop="goUse(data)">
            <div>立</div>
            <div>即</div>
            <div>使</div>
            <div>用</div>
        </div>
        <div class="right" v-if="state=='yetUse'">
            <div>已</div>
            <div>使</div>
            <div>用</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        state: {
            type: String,
            required: true
        },
        data: {
            type: Object,
            required: true
        },
        current: {
            type: String,
            default: 'all'
        }
    },
    mounted() {
        console.log(this.state);
    },
    computed: {
        getBGC() {
            if (this.state == 'notUse') {
                return require('@images/icon-29.png');
            } else if (this.state == 'yetUse') {
                return require('@images/icon-30.png');
            } else if (this.state == 'overtime') {
                return require('@images/icon-30.png');
            } else {
                return require('@images/icon-31.png');
            }
        }
    },
    methods: {
        goUse(item) {
            if (this.current == 'all') {
                if (item.type == 2) {
                    this.$goUrl('/agent');
                } else {
                    this.$goUrl('/zx');
                }
            } else {
                this.$store.dispatch('func/setCoupon', item);
                this.$emit('select');
            }
        }
    }
};
</script>

<style lang="less" scoped>
.base-coupon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 7.39rem;
    height: 2.32rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    > .left {
        display: flex;
        margin-top: -0.12rem;
        margin-left: 0.4rem;
        > .left {
            width: 1.4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-right: 1px solid #e9e9e9;
            > .money {
                line-height: normal;
                font-size: 0.18rem;
                color: #929292;
                > i {
                    font-size: 0.34rem;
                    font-weight: bold;
                    color: #929292;
                }
            }
            > .text {
                line-height: normal;
                margin-top: 0.1rem;
                font-size: 0.24rem;
                font-weight: bold;
                color: #929292;
            }
        }
        > .right {
            margin-left: 0.4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            > .name {
                color: #292f3d;
                font-weight: bold;
                font-size: 0.32rem;
            }
            > .time {
                margin-top: 0.22rem;
                color: #929292;
                font-size: 0.24rem;
            }
        }
    }
    > .right {
        margin-top: -0.12rem;
        display: flex;
        flex-direction: column;
        margin-right: 0.6rem;
        > div {
            color: #fff;
            font-size: 0.24rem;
            font-weight: bold;
            margin-bottom: 0.1rem;
        }
    }
}
</style>
