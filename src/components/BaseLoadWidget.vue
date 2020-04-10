<template>
    <div class="base-load-widget">
        <div v-if="type=='square'" class="square-spin">
            <div></div>
        </div>
        <div v-if="type=='ball'" class="ball-scale-multiple">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
<script>
import 'loaders.css';
export default {
    props: {
        type: {
            type: String,
            default: 'ball'
        }
    }
};
</script>
<style lang="less" scoped>
.base-load-widget {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.2rem;
}
.square-spin {
    > div {
        width: 0.8rem;
        height: 0.8rem;
        border: none;
        background-color: rgba(127, 119, 234, 0.4);
        animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
    }
}
@keyframes square-spin {
    25% {
        transform: perspective(1rem) rotateX(180deg) rotateY(0);
    }

    50% {
        transform: perspective(1rem) rotateX(180deg) rotateY(180deg);
    }
    75% {
        transform: perspective(1rem) rotateX(0) rotateY(180deg);
    }
    100% {
        transform: perspective(1rem) rotateX(0) rotateY(0);
    }
}

.ball-scale-multiple {
    position: relative;
    transform: translateY(-0.6rem);
}
.ball-scale-multiple {
    > div {
        position: absolute;
        left: -0.6rem;
        top: 0;
        opacity: 0;
        margin: 0;
        width: 1.2rem;
        height: 1.2rem;
        background-color: rgba(155, 143, 230, 0.5);
        animation: ball-scale-multiple 1s 0s linear infinite;
        &:nth-child(2) {
            animation-delay: -0.4s;
        }
        &:nth-child(3) {
            animation-delay: -0.2s;
        }
    }
}
@keyframes ball-scale-multiple {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    5% {
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>

