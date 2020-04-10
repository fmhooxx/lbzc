<template>
    <div class="func-button">
        <div @click.stop="sharePoster">
            <img src="@images/icon-19.png" />
            <div class="text">分享海报</div>
        </div>
        <div @click.stop="shareLink">
            <img src="@images/icon-20.png" />
            <div class="text">分享链接</div>
        </div>
        <div @click.stop="savePoster">
            <img src="@images/icon-21.png" />
            <div class="text">保存海报</div>
        </div>
        <div @click.stop="copyLink">
            <img src="@images/icon-22.png" />
            <div class="text">复制链接</div>
        </div>
    </div>
</template>
<script>
import { saveImages, shareImags, shareLink } from '_native/func';
export default {
    props: {
        slideData: {
            type: Object,
            default: null,
            required: true
        },
        current: {
            type: Number,
            default: 0,
            required: true
        },
        type: {
            type: String,
            default: '',
            required: true
        }
    },
    methods: {
        sharePoster() {
            let imgUrl = this.slideData[this.type][this.current];
            shareImags(imgUrl, () => {
                this.$open(imgUrl);
            });
        },
        shareLink() {
            let url = this.slideData[this.type + 'url'];
            shareLink(url, () => {
                this.$copy(url);
            });
        },
        savePoster() {
            let imgUrl = this.slideData[this.type][this.current];
            saveImages(imgUrl, () => {
                this.$open(imgUrl);
            });
        },
        copyLink() {
            let url = this.slideData[this.type + 'url'];
            this.$copy(url);
        }
    }
};
</script>

<style lang="less" scoped>
.func-button {
    display: flex;
    justify-content: center;
    > div {
        margin-left: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        &:first-child {
            margin-left: 0px;
        }
        > img {
            width: 0.95rem;
            height: 0.95rem;
        }
        > .text {
            margin-top: 0.23rem;
            font-size: 0.23rem;
            font-weight: bold;
            color: rgba(81, 90, 111, 1);
        }
    }
}
</style>
