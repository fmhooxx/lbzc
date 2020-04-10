<template>
    <div class="agent-task">
        <div class="top">
            <img src="@images/b-1.png">
            <div class="grade">
                <img src="@images/icon-5.png">
                <div class="text">高级代理</div>
            </div>
        </div>
        <div class="center">
            <div class="item">
                <div class="top">
                    <div class="text">邀请好友</div>
                    <div class="tag">条件一</div>
                </div>
                <div class="center">
                    40
                    <i>人</i>
                </div>
                <div class="bottom">邀请注册后的用户</div>
            </div>
            <div class="item">
                <div class="top">
                    <div class="text">邀请好友</div>
                    <div class="tag">条件一</div>
                </div>
                <div class="center">
                    40
                    <i>人</i>
                </div>
                <div class="bottom">邀请注册后的用户</div>
            </div>
            <div class="item">
                <div class="top">
                    <div class="text">邀请好友</div>
                    <div class="tag">条件一</div>
                </div>
                <div class="center">
                    40
                    <i>人</i>
                </div>
                <div class="bottom">邀请注册后的用户</div>
            </div>
        </div>
        <div class="bottom">
            <i>注:</i> 以上条件，完成任意一个，即可免费升级代理
        </div>
    </div>
</template>
<style lang="less" scoped>
.agent-task {
    overflow: hidden;
    > .top {
        > img {
            display: block;
            height: 1.12rem;
        }
        > .grade {
            margin: 0 auto;
            width: 1.8rem;
            height: 0.42rem;
            border-radius: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to right, #7588fd 0%, #a9bfff 100%);
            > img {
                width: 0.3rem;
                height: 0.25rem;
            }
            > .text {
                margin-left: 0.1rem;
                line-height: normal;
                font-size: 0.22rem;
                font-weight: bold;
                color: #fff;
                align-self: center;
            }
        }
    }
    > .center {
        margin-top: 0.3rem;
        display: flex;
        justify-content: space-between;
        padding: 0px 0.3rem;
        > .item {
            width: 2.18rem;
            height: 2.02rem;
            background-color: #fff;
            box-shadow: 0px 0.05rem 0.29rem 0px rgba(50, 164, 246, 0.14);
            border-radius: 0.06rem;
            padding: 0.24rem 0.12rem 0.24rem 0.2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            > .top {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                > .text {
                    color: #121c32;
                    font-size: 0.22rem;
                    font-weight: bold;
                }
                > .tag {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 0.74rem;
                    height: 0.28rem;
                    border-radius: 0.14rem;
                    background-color: rgba(98, 119, 248, 0.1);
                    font-size: 0.2rem;
                    color: #6277f8;
                }
            }
            > .center {
                margin-top: 0.2rem;
                width: 100%;
                font-size: 0.4rem;
                color: #6277f8;
                > i {
                    font-size: 0.24rem;
                    color: #6277f8;
                }
            }
            > .bottom {
                margin-top: 0.2rem;
                width: 100%;
                font-size: 0.2rem;
                color: #808792;
            }
        }
    }
    > .bottom {
        margin-top: 0.32rem;
        text-align: center;
        font-size: 0.2rem;
        color: #121c32;
        > i {
            color: #5562ee;
            font-size: 0.2rem;
            font-weight: bold;
        }
    }
}
</style>
