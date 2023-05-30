<template>
  <Suspense> <Videoheader /></Suspense>
  <Suspense> <VideoListVue /></Suspense>
</template>
<script>
import Videoheader from "../video/Videoheader.vue";

import VideoListVue from "../video/videoList.vue";

export default {
  name: "Home",
  components: { VideoListVue, Videoheader },
  setup() {},
};
</script>
<style lang="scss" scoped></style>
