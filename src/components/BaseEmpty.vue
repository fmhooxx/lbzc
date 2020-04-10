<template>
    <transition
        appear
        appear-class="enter"
        appear-active-class="done"
        enter-class="enter"
        enter-active-class="done"
    >
        <div class="base-empty">
            <img class="empty" v-if="!type" src="@images/empty.png">
            <img class="group" v-if="type=='group'" src="@images/b-4.png">
            <div class="content">
                <slot>
                    <div class="complex" v-if="url">
                        <div class="txt">{{text}}...</div>
                        <div class="btn" @click.stop="$goUrl(url)">
                            <div>{{btnText}}</div>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: ''
        },
        url: {
            type: String
        },
        text: {
            type: String
        },
        btnText: {
            type: String,
            default: '去推广'
        }
    }
};
</script>

<style lang="less" scoped>
.enter {
    opacity: 0;
    transform: translateY(0.5rem) translateZ(0);
    background-color: #fff;
}
.done {
    transition: all 1s ease;
    transition-delay: 0.2s;
}
.base-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > .empty {
        width: 3.74rem;
        height: 2.88rem;
    }
    > .group {
        width: 4.77rem;
        height: 2.38rem;
    }
    > .content {
        width: 100%;
        margin-top: 0.3rem;
        font-size: 0.28rem;
        > .simple {
            color: #a2a2a2;
        }
        > .complex {
            > .txt {
                text-align: center;
                color: #a2a2a2;
                font-size: 0.28rem;
            }
            > .btn {
                margin-top: 1.5rem;
                padding: 0px 0.3rem;
                > div {
                    height: 0.86rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #5562ee;
                    box-shadow: 0px 0.12rem 0.28rem 0.01rem rgba(85, 98, 238, 0.22);
                    border-radius: 0.06rem;
                    font-size: 0.28rem;
                    font-weight: bold;
                    color: #fff;
                }
            }
        }
    }
}
</style>
