<template>
    <div class="mem-base">
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
                    <div class="item">
                        <div class="item-content">
                            <div class="left">昵称</div>
                            <div class="right">
                                <input
                                    type="text"
                                    v-model="nickName"
                                    maxlength="30"
                                    placeholder="请输入昵称"
                                >
                            </div>
                        </div>
                    </div>

                    <!-- 实名状态 -->
                    <div class="title no-real" v-if="isinfo==0">
                        <div>未实名认证</div>
                    </div>
                    <div class="title" v-if="isinfo==1">
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

                    <!-- 基本信息 -->
                    <div class="title">
                        <div>基本信息</div>
                    </div>
                    <div class="item" @click.stop="showPicker('position')">
                        <div class="item-content">
                            <div class="left">目前身份</div>
                            <div class="right">{{currentPosition}}</div>
                        </div>
                    </div>
                    <div class="item" @click.stop="showPicker('credit')">
                        <div class="item-content">
                            <div class="left">有无信用卡</div>
                            <div class="right">{{hasCredit}}</div>
                        </div>
                    </div>
                    <div class="item" @click.stop="showPicker('useTime')">
                        <div class="item-content">
                            <div class="left">手机使用时长</div>
                            <div class="right">{{useTimeText}}</div>
                        </div>
                    </div>

                    <!-- 代理信息 -->
                    <div class="title">
                        <div>代理信息</div>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <div class="left">代理级别</div>
                            <div class="right">
                                <div
                                    class="square"
                                    v-if="this.mtype<4"
                                    @click.stop="$goUrl('/agent')"
                                >去升级</div>
                                <div class="text">{{rule}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <div class="left">推荐人</div>
                            <div class="right">{{referee&&referee!=0?referee:"平台"}}</div>
                        </div>
                    </div>
                    <div class="item" @click.stop="showPicker('useTime')">
                        <div class="item-content">
                            <div class="left">会员工号</div>
                            <div class="right">{{id}}</div>
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
import { updateMemBase } from '_api/center';
import { getMemberInfo } from '_api/login';
import { textEncrypt } from '_utils/encrypt';
import { saveUser } from '_utils/local';

export default {
    data: () => {
        return {
            id: '',
            rule: '',
            mtype: 0,
            trueName: '',
            cardNo: '',
            nickName: '',
            phoneNum: '',
            referee: '',
            avatarSrcBase64: '',
            avatarSrc: '',
            disabled: '',
            isinfo: 0, // 是否实名
            position: '', // 身份（学生。。。）
            isCredit: 0, // 是否拥有信用卡
            useTime: 0, // 手机使用时长
            referee: '', // 推荐人
            isBaseLoad: false,
            isBaseLoadPage: true,
            positionData: [
                { text: '学生党', value: 1 },
                { text: '上班族', value: 2 },
                { text: '自主创业', value: 3 },
                { text: '无业', value: 4 }
            ],
            cardData: [{ text: '无', value: 0 }, { text: '有', value: 1 }],
            useTimeData: [
                { text: '一年以下', value: 1 },
                { text: '一年以上', value: 2 },
                { text: '两年以上', value: 3 },
                { text: '三年以上', value: 4 }
            ]
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
        this.position = this.postionText(this.userInfo.Position);
        this.isCredit = this.userInfo.IsCredit == '无' ? 0 : 1;
        this.useTime = this.useTimeTrans(this.userInfo.UseTime);
        this.referee = this.userInfo.Referee;
        this.id = this.userInfo.ID;
        this.mtype = this.userInfo.Mtype;
        this.rule = this.userInfo.Rule;
        this.isBaseLoadPage = false;
    },
    computed: {
        currentPosition() {
            console.log(this.position);
            if (this.position == 1) {
                return '学生党';
            } else if (this.position == 2) {
                return '上班族';
            } else if (this.position == 3) {
                return '自主创业';
            } else if (this.position == 4) {
                return '无业';
            } else {
                return '请选择';
            }
        },
        hasCredit() {
            if (this.isCredit && this.isCredit != 0) {
                return '有';
            } else {
                return '无';
            }
        },
        useTimeText() {
            if (this.useTime == 1) {
                return '一年以下';
            } else if (this.useTime == 2) {
                return '一年以上';
            } else if (this.useTime == 3) {
                return '两年以上';
            } else if (this.useTime == 4) {
                return '三年以上';
            } else {
                return '请选择';
            }
        }
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
                await updateMemBase({
                    NickName: this.nickName,
                    HeadImg: this.avatarSrc,
                    TrueName: textEncrypt(this.trueName),
                    CardNo: textEncrypt(this.cardNo),
                    UseTime: this.useTime,
                    IsCredit: this.isCredit,
                    identity: this.position
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
        },
        postionText(text) {
            if (text == '学生党') {
                return 1;
            } else if (text == '上班族') {
                return 2;
            } else if (text == '自主创业') {
                return 3;
            } else if (text == '无业') {
                return 4;
            } else {
                return 0;
            }
        },
        useTimeTrans(text) {
            if (text == '一年以下') {
                return 1;
            } else if (text == '一年以上') {
                return 2;
            } else if (text == '两年以上') {
                return 3;
            } else if (text == '三年以上') {
                return 4;
            } else {
                return 1;
            }
        },
        showPicker(type) {
            let data;
            let title;
            if (type == 'position') {
                title = '目前身份';
                data = this.positionData;
            } else if (type == 'credit') {
                title = '有无信用卡';
                data = this.cardData;
            } else {
                title = '手机使用时长';
                data = this.useTimeData;
            }
            this.selectType = type;
            if (this.picker) {
                this.picker.$updateProps({
                    title: title,
                    data: [data]
                });
            }

            if (!this.picker) {
                this.picker = this.$createPicker({
                    title: title,
                    data: [data],
                    onSelect: this.selectHandle,
                    onCancel: this.cancelHandle
                });
            }
            this.picker.show();
        },
        selectHandle(selectedVal, selectedIndex, selectedText) {
            if (this.selectType == 'position') {
                this.position = selectedVal.join();
            } else if (this.selectType == 'credit') {
                this.isCredit = selectedVal.join();
            } else {
                this.useTime = selectedVal.join();
            }
            this.$createDialog({
                type: 'warn',
                content: `您选择了：${selectedText.join(' ')}`,
                icon: 'cubeic-alert'
            }).show();
        },
        cancelHandle() {
            this.$createToast({
                type: 'correct',
                txt: '您取消了选择',
                time: 1000
            }).show();
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
.mem-base {
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
                        display: flex;
                        align-items: center;
                        font-size: 0.28rem;
                        color: #868686;
                        > input {
                            display: flex;
                            align-items: center;
                            font-size: 0.28rem;
                            border: none;
                            outline: none;
                            text-align: right;
                            color: #868686;
                            background-color: #fff;
                            &::placeholder {
                                font-size: 0.28rem;
                                color: #868686;
                            }
                        }
                        > input:disabled,
                        input[disabled] {
                            color: #868686 !important;
                            opacity: 1;
                        }
                        .square {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 0.9rem;
                            height: 0.34rem;
                            background-color: #fb5337;
                            font-size: 0.21rem;
                            color: #fff;
                            line-height: normal;
                        }
                        .text {
                            margin-left: 0.2rem;
                            font-size: 0.28rem;
                            color: #868686;
                        }
                    }
                }
            }
            > .title {
                padding: 0px 0.3rem;
                > div {
                    display: flex;
                    align-items: center;
                    height: 1.15rem;
                    font-size: 0.3rem;
                    font-weight: bold;
                    color: rgba(85, 98, 236, 1);

                    border-bottom: 1px solid #e7e8ea;
                }
            }
            > .no-real {
                div {
                    color: rgba(252, 36, 0, 1);
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
.cube-popup-content {
    padding: 0px 0px !important;
}
</style>


