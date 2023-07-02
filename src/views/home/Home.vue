<template>
  <div class="middle">
    <div class="middle__left">
      <div class="middle__left__item">
        <div class="circle"></div>
        <span>动态</span>
      </div>
      <div class="middle__left__item">
        <div class="circle"></div>
        <span>热门</span>
      </div>
      <div class="middle__left__item">
        <div class="circle"></div>
        <span>频道</span>
      </div>
    </div>
  </div>
  <Suspense> <VideoListVue /></Suspense>
</template>
<script>
import VideoListVue from "../video/VideoList.vue";

export default {
  name: "Home",
  components: { VideoListVue },
  setup() {},
};
</script>
<style lang="scss" scoped>
.middle {
  display: flex;
  &__left {
    display: flex;
    gap: 5px;
    .circle {
      width: 3rem;
      height: 3rem;
      background-color: olivedrab;
      border-radius: 50%;
    }
    &__item {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 5px;
    }
  }
}
</style>
