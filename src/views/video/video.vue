<template>
  <div class="wrap">
    <div class="container">
      <Suspense><VideoLeft /></Suspense>
      <Suspense><VideoRight /></Suspense>
    </div>
  </div>
</template>
<script>
import VideoLeft from "./VideoLeft.vue";
import VideoRight from "./videoRight.vue";
export default {
  components: { VideoRight, VideoLeft },
  setup() {},
};
</script>
<style scoped lang="scss">
.wrap {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
.container {
  margin: 0 auto;
  width: 95%;
  display: flex;
  gap: 3rem;
  height: 90%;
}
</style>
