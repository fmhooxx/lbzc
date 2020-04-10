<template>
    <div class="take-brand">
        <div class="content">
            <div class="title">到账账号</div>
            <div class="account" v-if="type=='zhi'">{{userData.Alipay}}</div>
            <div class="account" v-if="type=='bank'">{{userData.Bank}}</div>
            <div class="name">{{type=="zhi"?userData.AlipayName:userData.BankName}}</div>
            <div class="update" @click.stop="$goUrl(`/accountBind?type=${type}`)">
                {{type=='zhi'?'更改支付宝绑定':'更改银行卡绑定'}}
                <img src="@images/arrow-7.png">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'zhi',
            required: true
        },
        userData: {
            type: Object,
            default: null,
            required: true
        }
    }
};
</script>

<style lang="less">
.take-brand {
    padding: 0px 0.3rem;
    > .content {
        overflow: hidden;
        height: 3.27rem;
        background-image: linear-gradient(to right bottom, rgb(52, 129, 255), rgb(55, 181, 255));
        border-top-left-radius: 0.16rem;
        border-top-right-radius: 0.16rem;
        position: relative;
        > .title {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.86rem;
            height: 0.58rem;
            line-height: normal;
            margin-top: 0.34rem;
            font-size: 0.28rem;
            font-weight: bold;
            color: rgba(46, 126, 246, 1);
            border-top-right-radius: 0.3rem;
            border-bottom-right-radius: 0.3rem;
            background-color: rgb(242, 248, 255);
        }
        > .account {
            margin-left: 0.92rem;
            margin-top: 0.3rem;
            font-size: 0.4rem;
            font-weight: bold;
            line-height: normal;
            color: rgba(255, 255, 255, 1);
            > i {
                margin-right: 0.3rem;
            }
        }
        > .name {
            margin-left: 0.92rem;
            margin-top: 0.15rem;
            font-size: 0.3rem;
            font-weight: bold;
            line-height: normal;
            color: rgba(211, 229, 255, 1);
        }
        > .update {
            height: 0.5rem;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #d8ecfe;
            position: absolute;
            bottom: 0.35rem;
            right: 0.56rem;
            font-size: 0.25rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            > img {
                margin-left: 0.2rem;
                width: 0.12rem;
                height: 0.22rem;
            }
        }
    }
}
</style>
