<template>
    <div class="base-info">
        <base-nav>基本信息</base-nav>
        <base-top></base-top>
        <transition appear appear-class="enter" appear-active-class="active">
            <div class="content">
                <base-placeholder></base-placeholder>
                <div class="info-list">
                    <div class="item">
                        <div class="item-content">
                            <div class="left">头像</div>
                            <div
                                class="right img"
                                :style="{backgroundImage:`url(${avatarSrcBase64})`}"
                            >
                                <input
                                    @change.stop="startUpload"
                                    name="file"
                                    ref="avatarInput"
                                    type="file"
                                >
                            </div>
                        </div>
                    </div>
                    <div class="real-name-1" v-if="isinfo==0">
                        <div>未实名认证</div>
                    </div>
                    <div class="real-name-2" v-if="isinfo==1">
                        <div>已实名认证</div>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <div class="left">真实姓名</div>
                            <div class="right">
                                <input
                                    type="text"
                                    v-model="trueName"
                                    maxlength="30"
                                    placeholder="输入真实姓名"
                                    :disabled="disabled"
                                >
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <div class="left">身份证号</div>
                            <div class="right">
                                <input
                                    type="text"
                                    v-model="cardNo"
                                    maxlength="30"
                                    placeholder="输入身份证号"
                                    :disabled="disabled"
                                >
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <div class="left">昵称</div>
                            <div class="right">
                                <input type="text" v-model="nickName" maxlength="30">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <div class="left">手机号</div>
                            <div class="right">
                                <input
                                    type="text"
                                    v-model="phoneNum"
                                    maxlength="20"
                                    :disabled="true"
                                >
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <div class="left">推荐人</div>
                            <div class="right">
                                <input
                                    type="text"
                                    v-model="referee"
                                    maxlength="20"
                                    :disabled="true"
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn" @click.stop="submitForm">
                    <div class="content">保存</div>
                </div>
            </div>
        </transition>
        <base-load v-if="isBaseLoad" :isBaseLoad.sync="isBaseLoad"></base-load>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import { uploadFile } from '_api/func';
import { updateUserInfo } from '_api/my';
import { getMemberInfo } from '_api/login';
import { textEncrypt } from '_utils/encrypt';
import { saveUser } from '_utils/local';

export default {
    data: () => {
        return {
            trueName: '',
            cardNo: '',
            nickName: '',
            phoneNum: '',
            referee: '',
            avatarSrcBase64: '',
            avatarSrc: '',
            disabled: '',
            isinfo: 0, // 是否实名
            isBaseLoad: false,
            isBaseLoadPage: true
        };
    },
    mounted() {
        this.userInfo = this.$getUser();
        this.avatarSrc = this.userInfo.HeadImgVal;
        this.avatarSrcBase64 = this.userInfo.HeadImgVal;
        this.nickName = this.userInfo.NickName;
        this.phoneNum = this.userInfo.Mobile;
        this.referee = this.userInfo.Referee ? this.userInfo.Referee : '平台';
        this.isinfo = this.userInfo.isinfo;
        this.cardNo = this.userInfo.CardNo;
        this.trueName = this.userInfo.TrueName;
        this.disabled = this.userInfo.isinfo == 1 ? true : false;
        this.isBaseLoadPage = false;
    },
    methods: {
        async startUpload() {
            try {
                this.isBaseLoad = true;
                let file = event.target.files[0];
                this.avatarSrcBase64 = await this.avatarRead(file);
                this.avatarSrc = await this.avatarUpload(file);
                this.isBaseLoad = false;
                this.$msg.success('上传成功');
            } catch (err) {
                this.isBaseLoad = false;
                this.$msg.fail('上传失败');
            }
        },
        // 头像上传
        avatarRead(file) {
            return new Promise((res, rej) => {
                //限定上传文件的类型，判断是否是图片类型
                if (!/image\/\w+/.test(file.type)) return rej('只能选择图片');
                let reader = new FileReader();
                reader.onload = function(e) {
                    return res(this.result);
                };
                reader.readAsDataURL(file);
            });
        },
        async avatarUpload(file) {
            return new Promise(async (res, rej) => {
                let formdata = new FormData();
                formdata.append('file', file);
                try {
                    let avatarSrc = (await uploadFile(formdata)).FilePath;
                    res(avatarSrc);
                } catch (err) {
                    rej('上传错误');
                }
            });
        },
        async getMemberInfo() {
            let user = await getMemberInfo();
            saveUser(user);
        },
        async submitForm() {
            try {
                this.isBaseLoad = true;
                await updateUserInfo({
                    NickName: this.nickName,
                    HeadImg: this.avatarSrc,
                    TrueName: textEncrypt(this.trueName),
                    CardNo: textEncrypt(this.cardNo)
                });
                await this.getMemberInfo();
                this.isBaseLoad = false;
                this.$msg.success('保存成功', () => {
                    this.$goBack();
                });
            } catch (err) {
                this.isBaseLoad = false;
                this.$textTip(err);
            }
        }
    }
};
</script>
<style lang="less" scoped>
.enter {
    opacity: 0.5;
    transform: translateY(1rem);
}
.active {
    transition: all 0.6s ease;
}
.base-info {
    overflow-x: hidden;
    background-color: #fff;
    > .content {
        > .info-list {
            > .item {
                padding: 0px 0.3rem;
                > .item-content {
                    line-height: normal;
                    height: 1.15rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #e5e5e5;
                    > .left {
                        font-size: 0.28rem;
                        font-weight: 500;
                        color: rgba(68, 77, 97, 1);
                    }
                    > .img {
                        width: 0.75rem;
                        height: 0.75rem;
                        border-radius: 100%;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        > input {
                            width: 100%;
                            height: 100%;
                            border: none;
                            outline: none;
                            box-sizing: border-box;
                            opacity: 0;
                        }
                    }
                    > .right {
                        > input {
                            display: flex;
                            align-items: center;
                            font-size: 0.28rem;
                            font-weight: 500;
                            border: none;
                            outline: none;
                            text-align: right;
                            color: rgba(134, 134, 134, 1);
                            background-color: #fff;
                            &::placeholder {
                                font-size: 0.28rem;
                                font-weight: 500;
                                color: rgba(134, 134, 134, 1);
                            }
                        }
                        > input:disabled,
                        input[disabled] {
                            color: rgba(134, 134, 134, 1) !important;
                            opacity: 1;
                        }
                    }
                }
            }
            > .real-name-1 {
                padding: 0px 0.3rem;
                > div {
                    display: flex;
                    align-items: center;
                    height: 1.15rem;
                    font-size: 0.31rem;
                    font-weight: bold;
                    color: rgba(252, 36, 0, 1);
                    border-bottom: 1px solid #e7e8ea;
                }
            }
            > .real-name-2 {
                padding: 0px 0.3rem;
                > div {
                    display: flex;
                    align-items: center;
                    height: 1.15rem;
                    font-size: 0.31rem;
                    font-weight: bold;
                    color: rgba(85, 98, 236, 1);
                    border-bottom: 1px solid #e7e8ea;
                }
            }
        }
        > .btn {
            margin-top: 1.5rem;
            padding: 0px 0.3rem;
            margin-bottom: 0.6rem;
            > .content {
                height: 0.86rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(85, 98, 238, 1);
                box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.3);
                border-radius: 0.06rem;
                font-size: 0.32rem;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
            }
        }
    }
}
</style>


