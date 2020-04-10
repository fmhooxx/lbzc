<template>
    <div class="answer-list" @click.stop="openAnswer">
        <div class="title">
            <div class="titleContent">
                <div class="left">Q{{num+1}} {{answer.Title}}</div>
                <img class="right" :class="{rotate:showAnswer}" src="@images/arrow-5.png">
            </div>
        </div>

        <transition
            appear
            appear-class="enter"
            appear-active-class="active"
            appear-to-class="done"
            enter-class="enter"
            enter-active-class="active"
            enter-to-class="done"
            leave-active-class="active"
            leave-class="done"
            leave-to-class="enter"
        >
            <div v-if="showAnswer" class="content">
                <div class="answer">
                    <div class="answer-content" v-html="answer.Contents"></div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    props: {
        num: {
            type: Number,
            required: true
        },
        answer: {
            type: Object,
            required: true
        }
    },
    data: () => {
        return {
            showAnswer: false
        };
    },
    methods: {
        openAnswer() {
            this.showAnswer = !this.showAnswer;
        }
    }
};
</script>

<style lang="less" scoped>
.enter {
    max-height: 0px;
}
.done {
    max-height: 10rem;
}
.active {
    transition: all 0.4s ease;
}
.answer-list {
    > .title {
        padding: 0px 0.3rem;
        > .titleContent {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 1.1rem;
            > .left {
                line-height: normal;
                font-size: 0.28rem;
                color: rgba(29, 40, 48, 1);
            }
            > .right {
                margin-left: 0.2rem;
                flex: 0 0 0.31rem;
                height: 0.17rem;
                transform: rotate(-90deg);
                transform-origin: center center;
                transition: all 0.2s ease-in-out;
            }
            .rotate {
                transform: rotate(0deg);
            }
        }
    }
    > .content {
        overflow: hidden;
        > .answer {
            padding: 0.3rem;
            min-width: 1.4rem;
            background-color: #f6f7fb;
            > .answer-content {
                font-size: 0.26rem;
                font-weight: 400;
                color: rgba(124, 130, 138, 1);
                line-height: 1.6 !important;

                p {
                    word-wrap: break-word;
                    word-break: break-all;
                }
            }
        }
    }
}
</style>
