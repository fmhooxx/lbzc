<template>
    <div class="post-collection">
        <BaseNav>我的收藏</BaseNav>
        <BaseTop></BaseTop>
        <ComPostList type="postCollection"></ComPostList>
    </div>
</template>
<script>
import ComPostList from '../components/ComPostList';
export default {
    components: { ComPostList }
};
</script>