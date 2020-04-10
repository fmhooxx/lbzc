<template>
    <div class="layer1">
        <div class="header_banner">
            <img src="@/assets/images/header_banner.png" alt />
            <div class="tiaotiao" style>
                <img src="@/assets/images/header_banner_b.png" alt style />
            </div>
        </div>
        <form action method="post" id="formf">
            <div class="content">
                <div class="reg_input">
                    <div class="reg_dec clearfix">
                        <div class="con_l fl">
                            <span class="num">5%</span>
                            <span>贷款最高返佣</span>
                        </div>
                        <div class="con_m fl">
                            <span class="num">60%</span>
                            <span>邀请好友最高返佣</span>
                        </div>
                        <div class="con_r fl">
                            <span class="num">190元/张</span>
                            <span style>办卡最高返佣</span>
                        </div>
                    </div>
                    <div class="input_area">
                        <div class="reg_input_li" style="border-top: 1px solid #ededed">
                            <span class="icon">
                                <img src="@/assets/images/phone.png" alt class="phone" />
                            </span>
                            <input
                                type="text"
                                v-model="formData.Mobile"
                                placeholder="请输入手机号"
                                name="Mobile"
                                id="Mobile"
                                autocomplete="new-password"
                            />
                        </div>
                        <div class="reg_input_li">
                            <span class="icon">
                                <img src="@/assets/images/password.png" alt class="passwordIcon" />
                            </span>
                            <input
                                type="password"
                                v-model="formData.Password"
                                id="Password"
                                name="Password"
                                placeholder="密码以英文字母开头，与数字的组合且不低于6 位"
                                autocomplete="new-password"
                            />
                        </div>
                        <div class="reg_input_li">
                            <span class="icon">
                                <img src="@/assets/images/imgCode.png" alt class="imgcode_icon" />
                            </span>
                            <input
                                type="text"
                                name="ImgCode"
                                v-model="smsCode"
                                id="ImgCode"
                                placeholder="请输入图像验证码"
                            />
                            <!-- <img class="codeimg" :src="base64Img" @click="getCode" /> -->
                            <div
                                class="codeimg"
                                :style="{backgroundImage:`url(${base64Img})`}"
                                @click="getCode"
                            />
                        </div>
                        <div class="reg_input_li">
                            <span class="icon">
                                <img src="@/assets/images/phoneCode.png" alt class="phonecode_icon" />
                            </span>
                            <input
                                id="MsgCode"
                                v-model="formData.Code"
                                name="MsgCode"
                                type="text"
                                placeholder="请输入手机验证码"
                            />
                            <div
                                class="reg_pcode_btn"
                                id="getcode"
                                @click="sendMobileCode"
                            >{{getCodeTips}}</div>
                        </div>
                        <div class="userAgree">
                            <span
                                class="iconfont"
                                :class="agreeY?'icon-selected':'icon-noselected' "
                                id="tongyi"
                                @click="changeAgree"
                            ></span>

                            <p>
                                我已阅读，并同意
                                <a
                                    @click="$router.push({path:'/agreement', query:{xyId:5,title:'用户注册协议'}})"
                                >《用户注册协议》</a>
                            </p>
                        </div>

                        <div class="reg_btn" @click="register">立即注册</div>
                        <div
                            class="load-url"
                            @click="$open('http://rkd.jinrirong.com/app/')"
                        >我已是注册会员，直接下载app赚钱</div>
                    </div>

                    <div class="huan clearfix" style>
                        <img src="@/assets/images/d_l.png" alt style="float:left;" />
                        <img src="@/assets/images/d_r.png" alt style="float:right;" />
                    </div>
                </div>

                <div class="tuig_item">
                    <div class="tuig_item_dec clearfix">
                        <div class="con_l fl">
                            <span class="words">
                                初级代理费
                                <i>58元</i>
                            </span>
                            <span class="words">
                                直推佣金
                                <i>34.8元</i>
                            </span>
                            <span class="words">
                                团队返佣
                                <i>11.6元</i>
                            </span>
                        </div>
                        <div class="con_m fl">
                            <span class="words">
                                中级代理费
                                <i>88元</i>
                            </span>
                            <span class="words">
                                直推佣金
                                <i>52.8元</i>
                            </span>
                            <span class="words">
                                团队返佣
                                <i>17.6元</i>
                            </span>
                        </div>
                        <div class="con_r fl">
                            <span class="words">
                                高级代理费
                                <i>128元</i>
                            </span>
                            <span class="words">
                                直推佣金
                                <i>76.8元</i>
                            </span>
                            <span class="words">
                                团队返佣
                                <i>25.6元</i>
                            </span>
                        </div>
                    </div>
                    <div class="tuig_content">
                        <div class="tuig_li_con" style="margin-top: 56px">
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/images/icon1.png')})`}"
                            ></div>
                            <!-- <img src="@/assets/images/icon1.png" alt> -->
                            <p>
                                注册贷款返佣最高
                                <i class="num_lineHeight">7元</i>一个，不论是否下款，部分产品提交下款图还有
                                <i class="num_lineHeight">额外佣金</i>
                            </p>
                        </div>
                        <div class="tuig_li_con">
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/images/icon2.png')})`}"
                            ></div>
                            <!-- <img src="@/assets/images/icon2.png" alt> -->
                            <p>
                                网贷下款单笔佣金最高
                                <i class="num_lineHeight">5000元</i>
                            </p>
                        </div>
                        <div class="tuig_li_con">
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/images/icon3.png')})`}"
                            ></div>
                            <!-- <img src="@/assets/images/icon3.png" alt> -->
                            <p>
                                信用卡推广单笔最高佣金
                                <i class="num_lineHeight">190元</i>
                            </p>
                        </div>
                        <div class="tuig_li_con">
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/images/icon4.png')})`}"
                            ></div>
                            <!-- <img src="@/assets/images/icon4.png" alt> -->
                            <p>
                                推荐网黑查询单次佣金
                                <i class="num_lineHeight">5.12元</i>
                            </p>
                        </div>
                        <div class="clearfix huan">
                            <img src="@/assets/images/d_l.png" alt style="float:left;" />
                            <img src="@/assets/images/d_r.png" alt style="float:right;" />
                        </div>
                    </div>
                </div>
                <div class="tuig_item">
                    <div class="t_i_icon_top">
                        <div
                            class="img"
                            :style="{backgroundImage:`url(${require('@/assets/images/tuItem2_h.png')})`}"
                        ></div>
                        <!-- <img src="@/assets/images/tuItem2_h.png" alt> -->
                    </div>
                    <div class="t_i_icon_mid">
                        <div
                            class="img"
                            :style="{backgroundImage:`url(${require('@/assets/images/tuItem2_dec.png')})`}"
                        ></div>
                        <!-- <img src="@/assets/images/tuItem2_dec.png" alt> -->
                    </div>
                    <div class="tuig_content">
                        <div class="tuig_li_con tui_li_one" style>
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/images/icon1.png')})`}"
                            ></div>
                            <!-- <img src="@/assets/images/icon1.png" alt=""> -->
                            <p>推荐口子拿佣金，月入过万小意思</p>
                        </div>
                        <div class="tuig_li_con">
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/images/icon2.png')})`}"
                            ></div>
                            <!-- <img src="@/assets/images/icon2.png" alt=""> -->
                            <p>银行直连通道，下卡佣金高达190/张</p>
                        </div>
                        <div class="tuig_li_con">
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/images/icon3.png')})`}"
                            ></div>
                            <!-- <img src="@/assets/images/icon3.png" alt=""> -->
                            <p>深度监测拒贷风险，发现拒贷的N个理由</p>
                        </div>
                        <div class="tuig_li_con">
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/images/icon4.png')})`}"
                            ></div>
                            <!-- <img src="@/assets/images/icon4.png" alt=""> -->
                            <p>大神爆料无节操，十万老哥聚集地</p>
                        </div>
                    </div>
                </div>
                <div class="bottom_btn" @click="backToTop">立即加入</div>
            </div>
        </form>
    </div>
</template>
<script>
/*手机号验证*/
function isPoneAvailable(pone) {
    var myreg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(pone)) {
        return false;
    } else {
        return true;
    }
}

function getQuery() {
    if (document.location.href.split('?').length <= 1) return {};

    let queryString = document.location.href.split('?')[1].split('&');
    let obj = {};
    for (let i in queryString) {
        var name = queryString[i].split('=')[0];
        var value = queryString[i].split('=')[1];
        obj[name] = value;
    }
    return obj;
}
import { Base64 } from 'js-base64';
import { getImgCode, getMsgCode } from '_api/func';
import { register } from '_api/register';

export default {
    data() {
        return {
            formData: {
                Mobile: '',
                Code: '',
                Password: ''
            },
            getCodeTips: '获取验证码',
            smsCode: '',
            agreeY: true,
            base64Img: '',
            phoneCodesend: false
        };
    },
    created() {
        this.getCode();
    },
    methods: {
        backToTop() {
            var topNo = document.documentElement.scrollTop || document.body.scrollTop;
            var speed = topNo / 30;

            if (speed <= 20) {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                return;
            }
            var timer = setInterval(() => {
                if (topNo <= 0) {
                    clearInterval(timer);
                    return;
                }
                topNo -= speed;
                document.documentElement.scrollTop = topNo;
                document.body.scrollTop = topNo;
            }, 10);
        },
        changeAgree() {
            this.agreeY = !this.agreeY;
        },
        async getCode() {
            let imgBuffer = await getImgCode();
            let imgString = new Buffer(imgBuffer, 'binary').toString('base64');
            this.base64Img = `data:image/png;base64,${imgString}`;
        },
        async register() {
            if (!this.agreeY) {
                this.$textTip('请同意注册协议');
                return;
            }
            console.log(isPoneAvailable(this.formData.Mobile));
            if (this.formData.Mobile == '' || !isPoneAvailable(this.formData.Mobile)) {
                this.$textTip('手机号错误');
                return;
            }
            if (this.formData.Password == '') {
                this.$textTip('密码不能为空');
                return;
            }

            if (this.formData.Code == '') {
                this.$textTip('验证码不能为空');
                return;
            }

            // var uid = getQuery()['ui'] ? getQuery()['ui'] : '';
            let uid = getQuery()['ui'] ? getQuery()['ui'] : getQuery()['uid'];
            if (typeof uid == 'undefined' || uid == null || uid == '') {
                uid = '';
            }
            let puser = getQuery()['puser'] ? getQuery()['puser'] : '';
            let result = await register({
                Mobile: this.formData.Mobile,
                Code: this.formData.Code,
                Password: Base64.encode(this.formData.Password),
                uid: uid,
                puser: puser,
                sign: 3 // 标识   1：金融日  2：郁金香  3：蓝冰众创
            });
            if (result.result == 100000) {
                this.$msg.success('注册成功', () => {
                    this.$open('http://rkd.jinrirong.com/app');
                });
                return true;
            } else if (result.result == 100007) {
                this.$textTip(result.message);
                setTimeout(() => {
                    this.$open('http://rkd.jinrirong.com/app');
                }, 1500);
            } else {
                this.$textTip(result.message);
                return false;
            }
            this.getCode(); //刷新验证码
        },
        // 发送短信验证码
        async sendMobileCode() {
            var self = this;
            if (this.phoneCodesend) return;
            if (!this.agreeY) {
                this.$textTip('请同意注册协议');
                return;
            }
            if (this.formData.Mobile == '' && !isPoneAvailable(this.formData.Mobile)) {
                this.$textTip('手机号错误');
                return;
            }
            if (this.formData.Password == '') {
                this.$textTip('密码不能为空');
                return;
            }
            if (this.smsCode == '') {
                this.$textTip('图片验证码为空');
                return;
            }
            getMsgCode({
                mobile: this.formData.Mobile,
                smsCode: this.smsCode
            });
            this.$textTip('短信已发送');
            let num = 60;
            this.phoneCodesend = true;
            let timer = setInterval(() => {
                if (num <= 0) {
                    clearInterval(timer);
                    self.getCodeTips = '获取验证码';
                    self.phoneCodesend = false;
                    return false;
                }
                self.getCodeTips = num + 's';
                num--;
            }, 1000);
            this.getCode(); //刷新验证码
        }
    }
};
</script>
<style lang="less" scoped>
@font-face {
    font-family: 'iconfont';
    /* project id 803290 */
    src: url('//at.alicdn.com/t/font_803290_qm7dgjb71ie.eot');
    src: url('//at.alicdn.com/t/font_803290_qm7dgjb71ie.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_803290_qm7dgjb71ie.woff') format('woff'),
        url('//at.alicdn.com/t/font_803290_qm7dgjb71ie.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_803290_qm7dgjb71ie.svg#iconfont') format('svg');
}
.iconfont {
    font-family: 'iconfont' !important;
    font-size: 0.16rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-selected:before {
    content: '\ef00';
    font-size: 0.48rem;
    color: #565656;
}
.icon-noselected:before {
    content: '\eefa';
    font-size: 0.48rem;
    color: #565656;
}
* {
    margin: 0;
    padding: 0;
}
i {
    font-style: normal;
}

input::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #bababa;
    font-size: 0.26rem;
}
input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #bababa;
    font-size: 0.26rem;
}
input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #bababa;
    font-size: 0.26rem;
}
input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #bababa;
    font-size: 0.26rem;
}
input {
    font-size: 0.26rem;
    color: #272d39;
    background: #fff;
    outline: none;
    border: 0;
}
input:-webkit-autofill {
    box-shadow: 0 0 0 1000px white inset;
}
a {
    text-decoration: none;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.clearfix:after {
    content: '';
    height: 0;
    display: block;
    clear: both;
    zoom: 1;
}
.layer1 {
    max-width: 7.5rem;
    margin: 0 auto;
}
.content {
    overflow: hidden;
    padding: 0 0.4rem;
    box-sizing: border-box;
    background: #f7585e;
}
.header_banner {
    width: 100%;
    font-size: 0;
    position: relative;
}
.header_banner > .tiaotiao {
    position: absolute;
    left: 0;
    bottom: -0.3rem;
    font-size: 0;
    z-index: 99;
    & > img {
        height: 0.54rem;
        width: 100%;
    }
}
.header_banner > img {
    width: 100%;
    border: none;
}
.reg_input {
    padding: 0.64rem 0 1.04rem;
    background: #fff;
    border-radius: 0.2rem;
    position: relative;
}
.reg_input > .input_area {
    padding: 0 0.3rem;
}
.reg_input > .input_area > .reg_input_li {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #ededed;
    .codeimg {
        width: 1.8rem;
        height: 0.56rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        // align-self: center;
    }
}
.reg_input > .input_area > .reg_input_li > .icon {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0;
    margin-right: 0.14rem;
    img {
        vertical-align: middle;
    }
    img.phone {
        width: 0.19rem;
    }
    img.passwordIcon {
        width: 0.25rem;
    }
    img.imgcode_icon {
        width: 0.26rem;
    }
    img.phonecode_icon {
        width: 0.25rem;
    }
}
.reg_input > .input_area > .reg_input_li > input {
    flex-grow: 1;
    outline: none;
    height: 100%;
    background: #fff;
    border: 0;
}
.reg_pcode_btn {
    height: 0.6rem;
    display: inline-block;
    padding: 0 0.26rem;
    line-height: 0.6rem;
    color: #fff;
    background: #f86951;
    text-align: center;
    font-size: 0.26rem;
    border-radius: 0.3rem;
}
.reg_input > .reg_dec {
    margin-bottom: 0.54rem;
    padding: 0 0.12rem;
}
.reg_input > .reg_dec > .con_l {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 2rem;
    height: 1.4rem;
    background: url('../../assets/images/reg_decBg_l.png') left center no-repeat;
    background-size: 100% 100%;
    span {
        line-height: normal;
        font-size: 0.22rem;
        color: #fff;
    }
    span.num {
        font-size: 0.28rem;
        color: #ffe361;
    }
}
.reg_input > .reg_dec > .con_m {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 2.44rem;
    height: 1.4rem;
    font-size: 0.22rem;
    background: url('../../assets/images/reg_decBg_m.png') left center no-repeat;
    background-size: 100% 100%;
    span {
        line-height: normal;
        font-size: 0.22rem;
        color: #fff;
    }
    span.num {
        font-size: 0.28rem;
        color: #ffe361;
        font-weight: 600;
    }
}
.reg_input > .reg_dec > .con_r {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 2rem;
    height: 1.4rem;
    font-size: 0.22rem;
    background: url('../../assets/images/reg_decBg_r.png') left center no-repeat;
    background-size: 100% 100%;
    span {
        line-height: normal;
        font-size: 0.22rem;
        color: #fff;
    }
    span.num {
        font-size: 0.28rem;
        color: #ffe361;
        font-weight: 600;
    }
}
.userAgree {
    display: flex;
    width: 100%;
    width: 5.7rem;
    margin: 0.3rem 0;
    height: 0.3rem;
    & > span {
        align-self: center;
    }
    & > p {
        color: #565656;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.23rem;
        a {
            font-size: 0.23rem;
            color: #000;
        }
    }
}
.huan {
    width: 5.9rem;
    height: 0.92rem;
    position: absolute;
    bottom: -0.63rem;
    left: 0.36rem;
    z-index: 99;
    img {
        width: 0.19rem;
    }
}
.reg_btn {
    height: 0.76rem;
    line-height: 0.76rem;
    border-radius: 0.38rem;
    text-align: center;
    padding: 0 0.3rem;
    font-size: 0.32rem;
    color: #fff;
    background: -webkit-linear-gradient(left, #fdc60a, #f86852);
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #fdc60a, #f86852);
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #fdc60a, #f86852);
    /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #fdc60a, #f86852);
    /* 标准的语法 */
}
.load-url {
    margin-top: 0.4rem;
    display: flex;
    justify-content: flex-end;
    font-size: 0.28rem;
    color: #5562ec;
}
.tuig_item {
    padding: 0.68rem 0 0.9rem;
    background: #fff;
    border-radius: 0.2rem;
    margin-top: 0.3rem;
    position: relative;
    .t_i_icon_top {
        text-align: center;
        height: 0.9rem;
        font-size: 0;
        img {
            height: 0.9rem;
        }
        > .img {
            margin: 0 auto;
            width: 4.44rem;
            height: 0.9rem;
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    }
    .t_i_icon_mid {
        text-align: center;
        height: 0.4rem;
        font-size: 0;
        img {
            height: 0.4rem;
        }
        > .img {
            margin: 0 auto;
            width: 4.33rem;
            height: 0.41rem;
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    }
}
.tuig_item > .tuig_item_dec {
    padding: 0 0.12rem;
}
.tuig_item > .tuig_item_dec > .con_l {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 2.13rem;
    height: 1.78rem;
    font-size: 0.22rem;
    padding-top: 0.2rem;
    box-sizing: border-box;
    color: #fff;
    background: url('../../assets/images/tuItem_l_bg.png') left center no-repeat;
    background-size: 100% 100%;
}
.tuig_item > .tuig_item_dec > .con_m {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 2.13rem;
    height: 1.78rem;
    font-size: 0.22rem;
    padding-top: 0.2rem;
    box-sizing: border-box;
    color: #fff;
    background: url('../../assets/images/tuItem_m_bg.png') left center no-repeat;
    background-size: 100% 100%;
}
.tuig_item > .tuig_item_dec > .con_r {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 2.13rem;
    height: 1.78rem;
    font-size: 0.22rem;
    padding-top: 0.2rem;
    box-sizing: border-box;
    color: #fff;
    background: url('../../assets/images/tuItem_r_bg.png') left center no-repeat;
    background-size: 100% 100%;
}
.tuig_item > .tuig_item_dec .words {
    font-size: 0.18rem;
    line-height: 1em;
    margin-bottom: 0.16rem;
    color: #fff;
}
.tuig_item > .tuig_item_dec .words > i {
    color: #fff;
    font-size: 0.26rem;
    vertical-align: middle;
}
.tuig_item > .tuig_content {
    padding: 0 0.3rem;
}
.tuig_item > .tuig_content > .tuig_li_con {
    height: 1.1rem;
    background: #fffaec;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 0.55rem;
    padding: 0 0.55rem;
    margin-top: 0.36rem;
}
.tuig_item > .tuig_content > .tuig_li_con.tuig_li_one {
    margin-top: 0.56rem;
}
.tuig_item > .tuig_content > .tuig_li_con > img {
    width: 0.86rem;
    margin-right: 0.24rem;
}

.tuig_item > .tuig_content > .tuig_li_con > .img {
    width: 0.99rem;
    flex: 0 0 0.99rem;
    height: 0.86rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-right: 24px;
}
.tuig_item > .tuig_content > .tuig_li_con > p {
    font-size: 0.22rem;
    flex-grow: 1;
    color: #888888;
    line-height: normal;
}
.bottom_btn {
    height: 1.05rem;
    width: 6.8rem;
    margin: 0.5rem auto;
    background: url('../../assets/images/bottom_btn.png') left center no-repeat;
    background-size: 100% 100%;
    font-size: 0.36rem;
    font-weight: bold;
    color: #fff;
    line-height: 0.8rem;
    text-align: center;
}
.num_lineHeight {
    color: #ff6000;
    font-size: 0.28rem;
    font-weight: 600;
}
</style>
