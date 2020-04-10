<template>
    <div class="task-progress">
        <div class="icon-p" :style="{backgroundImage:`url(${require('@images/icon-1.png')})`}"></div>
        <div class="title">
            <div class="text">任务</div>
            <div class="text">进度</div>
            <div class="line"></div>
        </div>
        <div class="item">
            <div class="rate">2/3人</div>
            <div class="desc">贷款</div>
        </div>
        <div class="item">
            <div class="rate">5/3张</div>
            <div class="desc">信用卡</div>
        </div>
        <div class="item">
            <div class="rate">5/20人</div>
            <div class="desc">邀请好友</div>
        </div>
        <div class="btn">立即升级</div>
    </div>
</template>
<style lang="less" scoped>
.task-progress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.25rem;
    padding: 0px 0.3rem;
    padding-left: 0.6rem;
    background-color: #fff;
    // background-color: yellow;
    position: relative;
    > .icon-p {
        position: absolute;
        top: 0px;
        left: 0.3rem;
        width: 0.16rem;
        height: 0.28rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    > .title {
        width: 1rem;
        position: relative;
        > .text {
            font-size: 0.32rem;
            font-weight: 800;
            color: rgba(255, 126, 24, 1);
            line-height: 1.3;
        }
        > .line {
            position: absolute;
            top: 50%;
            right: 0px;
            width: 1px;
            height: 0.5rem;
            background-color: #d1d1d1;
            transform: translateY(-50%);
        }
    }
    > .item {
        > .rate {
            text-align: center;
            font-size: 0.3rem;
            line-height: 1.4;
            font-weight: 500;
            color: rgba(84, 97, 235, 1);
        }
        > .desc {
            line-height: 1.4;
            text-align: center;
            font-size: 0.24rem;
            font-weight: 500;
            color: rgba(152, 159, 170, 1);
        }
    }
    > .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: normal;
        width: 1.5rem;
        height: 0.5rem;
        background: rgba(140, 199, 254, 1);
        border-radius: 26px;
        font-size: 0.28rem;
        color: #fff;
        background: linear-gradient(to right, #496af3 0%, #86befd 100%);
    }
}
</style>
