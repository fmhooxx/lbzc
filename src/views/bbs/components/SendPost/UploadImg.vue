<template>
    <div class="upload-img">
        <div
            class="item"
            v-for="(item,index) in base64Imgs"
            :key="`img_${index}`"
            :style="{backgroundImage:`url(${item})`}"
        >
            <img src="@images/delete-1.png" @click.stop="removeImg(index)">
        </div>
        <div class="btn" :style="{backgroundImage:`url(${uploadLogo})`}">
            <input ref="imgInput" type="file" @change.stop="startUpload" name="file">
        </div>
        <base-load v-if="isBaseLoad" :isBaseLoad.sync="isBaseLoad"></base-load>
    </div>
</template>
<script>
import { uploadImage } from '_api/bbs';
export default {
    data() {
        return {
            isBaseLoad: false,
            base64Imgs: [],
            imageSrc: [],
            uploadLogo: require('@images/icon-49.png')
        };
    },
    methods: {
        async startUpload() {
            if (this.base64Imgs.length >= 3) {
                return this.$textTip('只允许上传三张图片');
            }

            try {
                this.isBaseLoad = true;
                let imgInput = this.$refs.imgInput;
                let file = imgInput.files[0];
                let base64 = await this.imgRead(file);
                let base64Compression = await this.$imageCompression(base64);
                let imgFileName = await this.uploadImage(base64Compression);
                this.imageSrc.push(imgFileName);
                this.base64Imgs.push(base64Compression);
                imgInput.value = '';
                this.isBaseLoad = false;
                this.$msg.success('上传成功');
            } catch (err) {
                console.log(err);
                this.isBaseLoad = false;
                this.$msg.fail('上传失败');
            }
        },
        imgRead(file) {
            return new Promise((res, rej) => {
                //限定上传文件的类型，判断是否是图片类型
                if (!/image\/\w+/.test(file.type)) return rej('只能选择图片');
                let reader = new FileReader();
                reader.onerror = function(err) {
                    return rej(err);
                };
                reader.onload = function(e) {
                    return res(this.result);
                };
                reader.readAsDataURL(file);
            });
        },
        removeImg(index) {
            this.base64Imgs.splice(index, 1);
            this.imageSrc.splice(index, 1);
        },
        async uploadImage(base64) {
            return (await uploadImage({
                base64: base64
            })).file;
        }
    }
};
</script>

<style lang="less" scoped>
.upload-img {
    height: 2rem;
    display: flex;
    align-items: center;
    padding: 0px 0.3rem;
    .item {
        margin-right: 0.3rem;
        width: 1.5rem;
        height: 1.5rem;
        background-color: #ddd;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        img {
            width: 0.34rem;
            height: 0.34rem;
            position: absolute;
            top: -0.2rem;
            right: -0.1rem;
        }
    }
    .btn {
        margin-right: 0.1rem;
        width: 1.5rem;
        height: 1.5rem;
        border: 1px dashed #747474;
        background-repeat: no-repeat;
        background-size: 50% 50%;
        background-position: center center;
        input {
            border: none;
            outline: none;
            width: 100%;
            height: 100%;
            display: flex;
            opacity: 0;
            background-color: #ddd;
        }
    }
}
</style>
