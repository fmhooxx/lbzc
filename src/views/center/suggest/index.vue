<template>
    <div class="suggest">
        <BaseNav>意见反馈</BaseNav>
        <BaseTop></BaseTop>
        <div class="content">
            <div class="title">反馈内容</div>
            <div class="center">
                <div class="text" ref="textarea">
                    <textarea
                        @input="input"
                        v-model="content"
                        placeholder="请提出您的宝贵意见和建议"
                        maxlength="500"
                    ></textarea>
                </div>
                <div class="limit">
                    <div>
                        <i>{{wordAmount}}/</i>
                        <i style="color: #5562ee">500</i>
                    </div>
                </div>
            </div>
            <div class="btn" @click.stop="addSuggest">
                <div>提交反馈</div>
            </div>
        </div>
        <BaseLoad v-if="isBaseLoad"></BaseLoad>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { addSuggest } from '_api/center';
export default {
    data() {
        return {
            content: '',
            wordAmount: 0,
            isBaseLoad: false,
            isBaseLoadPage: true
        };
    },
    mounted() {
        try {
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        input() {
            this.wordAmount = this.content.length;
        },
        async addSuggest() {
            try {
                this.isBaseLoad = true;
                await addSuggest({
                    content: this.content
                });
                this.isBaseLoad = false;
                this.content = '';
                this.$textTip('上传成功');
            } catch (err) {
                this.isBaseLoad = false;
                this.$textTip('上传失败');
            }
        }
    }
};
</script>
<style lang="less" scoped>
.suggest {
    > .content {
        padding: 0px 0.3rem;
        .title {
            margin-top: 0.5rem;
            font-size: 0.3rem;
            color: #000;
        }
        > .center {
            margin-top: 0.4rem;
            border-radius: 0.22rem;
            position: relative;
            .text {
                padding: 0.4rem 0.35rem;
                background-color: rgba(246, 247, 251, 1);
                border-radius: 0.22rem;
                > textarea {
                    box-sizing: border-box;
                    border: none;
                    outline: none;
                    width: 100%;
                    height: 3.82rem;
                    resize: none;
                    background-color: rgba(246, 247, 251, 1);
                    &::placeholder {
                        font-size: 0.25rem;
                        color: rgba(178, 178, 178, 1);
                    }
                }
            }
            .limit {
                position: absolute;
                bottom: 0.1rem;
                right: 0.7rem;
                i {
                    font-size: 0.25rem;
                    color: rgba(178, 178, 178, 1);
                }
            }
        }
        .btn {
            margin-top: 0.6rem;
            div {
                height: 0.86rem;
                background: rgba(85, 98, 238, 1);
                box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.22);
                border-radius: 0.06rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.3rem;
                color: #fff;
            }
        }
    }
}
</style>

