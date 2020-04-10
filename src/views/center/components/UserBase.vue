<template>
    <div class="user-base">
        <img class="left" @click.stop="$goUrl('/memBase')" :src="userInfoData.HeadImgVal">
        <div class="right">
            <div class="top">
                <div class="name">{{userInfoData.NickName|nameHide}}</div>
                <BaseGrade
                    style="margin-left: 0.32rem;"
                    :mtype="userInfoData.Mtype"
                    :grade="userInfoData.Rule"
                ></BaseGrade>
                <div class="notice" @click.stop="$goUrl('/message')">
                    <img src="@images/icon-12.png">
                    <div v-if="isNewMessage" class="red"></div>
                </div>
            </div>
            <div class="bottom">{{userInfoData.Tjcode}}{{`（工号${userInfoData.ID}）`}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        userInfoData: {
            type: Object,
            default: null
        },
        isNewMessage: {
            type: Boolean,
            default: false
        }
    }
};
</script>
<style lang="less" scoped>
.user-base {
    display: flex;
    align-items: center;
    padding: 0px 0.3rem;
    position: relative;
    > .left {
        width: 1.11rem;
        height: 1.11rem;
        border-radius: 50%;
    }
    > .right {
        flex: 1;
        margin-left: 0.3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 0.34rem;
        > .top {
            display: flex;
            align-items: center;
            position: relative;
            > .name {
                line-height: normal;
                font-size: 0.35rem;
                font-weight: bold;
            }
            > .notice {
                position: absolute;
                right: 0px;
                width: 0.3rem;
                height: 0.36rem;
                img{
                    display: flex;
                    width: 100%;
                    height: 100%;
                }
                > .red {
                    position: absolute;
                    top: -0.1rem;
                    right: -0.06rem;
                    width: 6px;
                    height: 6px;
                    background-color: #f52a20;
                    border-radius: 50%;
                }
            }
        }
        > .bottom {
            margin-top: 0.1rem;
            display: flex;
            line-height: normal;
            font-size: 0.25rem;
            color: #949494;
        }
    }
}
</style>


