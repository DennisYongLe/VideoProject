<template>
  <Suspense> <Videoheader /></Suspense>

  <div class="wrap">
    <!-- <div class="header">header</div> -->
    <div class="container">
      <Suspense><VideoLeft /></Suspense>
      <Suspense><VideoRight /></Suspense>
    </div>
  </div>
</template>
<script>
import Videoheader from "./Videoheader.vue";
import VideoRight from "./videoRight.vue";

import VideoLeft from "./VideoLeft.vue";
export default {
  components: { Videoheader, VideoRight, VideoLeft },
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
