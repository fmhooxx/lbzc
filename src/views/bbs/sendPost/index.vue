<template>
    <div class="send-post">
        <SendNav @submit="submit">发布帖子</SendNav>
        <BaseTop></BaseTop>
        <SendContent ref="sendContent"></SendContent>
        <BasePlaceholder height="0.1rem"></BasePlaceholder>
        <UploadImg ref="uploadImg"></UploadImg>
        <BasePlaceholder height="0.1rem"></BasePlaceholder>
        <SendLabel ref="sendLabel" :labelData="labelData" style="marginTop:0.3rem"></SendLabel>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getLabel, sendPost } from '_api/bbs';
import SendNav from '../components/SendPost/SendNav';
import SendContent from '../components/SendPost/SendContent';
import SendLabel from '../components/SendPost/SendLabel';
import UploadImg from '../components/SendPost/UploadImg';
export default {
    components: { SendNav, SendContent, SendLabel, UploadImg },
    data() {
        return {
            labelData: [],
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            await this.getLabel();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    computed: {
        isTrue() {
            let sendContent = this.$refs.sendContent;
            let sendLabel = this.$refs.sendLabel;
            if (!sendContent.title) {
                throw '请输入标题';
            } else if (!sendContent.content) {
                throw '请输入内容';
            } else if (!/^\d+$/.test(sendLabel.typeid)) {
                throw '请选择标签';
            } else {
                return true;
            }
        }
    },
    methods: {
        async getLabel() {
            this.labelData = await getLabel();
            console.log(this.labelData);
        },
        submit() {
            try {
                if (this.isTrue) {
                    let sendContent = this.$refs.sendContent;
                    let uploadImg = this.$refs.uploadImg;
                    let sendLabel = this.$refs.sendLabel;
                    this.contentFilter(sendContent.content, uploadImg.imageSrc);
                    sendPost({
                        subject: sendContent.title,
                        content: this.contentFilter(sendContent.content, uploadImg.imageSrc),
                        typeid: sendLabel.typeid,
                        imagelength: uploadImg.imageSrc.length
                    });
                    this.$msg.success('发帖成功', () => {
                        this.$goBack();
                    });
                }
            } catch (err) {
                this.$textTip(err);
            }
        },
        contentFilter(content, imgsrc) {
            for (let i in imgsrc) {
                content += `<img src="${imgsrc[i]}"/>`;
            }
            return content;
        }
    }
};
</script>

