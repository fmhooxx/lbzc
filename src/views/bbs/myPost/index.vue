<template>
    <div class="my-post">
        <BaseNav>我的帖子</BaseNav>
        <BaseTop></BaseTop>
        <ComPostList type="myPost"></ComPostList>
    </div>
</template>
<script>
import ComPostList from '../components/ComPostList';
export default {
    components: { ComPostList }
};
</script>