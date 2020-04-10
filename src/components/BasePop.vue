<template>
    <section class="base-pop">
        <div class="content animated bounceIn">
            <div class="top">{{text}}</div>
            <div class="bottom">
                <div class="cancel" @click.stop="cancel">取消</div>
                <div class="confirm" @click.stop="confirm">
                    <slot>确定</slot>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import 'animate.css';
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        isBasePop: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        cancel() {
            if (this.$listeners.cancel) {
                this.$emit('cancel');
            } else {
                this.$emit('update:isBasePop', false);
            }
        },
        confirm() {
            this.$emit('confirm');
        }
    }
};
</script>

<style lang="less" scoped>
.base-pop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 1, 0.6);
    > .content {
        width: 4.76rem;
        height: 2.78rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.1rem;
        position: relative;
        > .top {
            display: flex;
            height: 1.8rem;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #e7e8ea;
            font-size: 0.29rem;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
        }
        > .bottom {
            height: 0.98rem;
            display: flex;
            justify-content: space-around;
            > div {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.3rem;
                font-weight: bold;
                color: rgba(96, 96, 96, 1);
            }
            > .cancel {
                border-right: 1px solid #e7e8ea;
            }
            > .confirm {
                color: #5461eb;
            }
        }
    }
}
</style>
