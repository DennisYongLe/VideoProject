<template>
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
<style lang="scss" scoped></style>
