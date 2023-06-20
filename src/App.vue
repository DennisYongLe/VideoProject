<template>
  <Suspense> <Videoheader /></Suspense>
  <router-view />
</template>
<script>
import Videoheader from "./views/video/Videoheader.vue";
export default {
  name: "App",
  components: { Videoheader },
};
</script>
<style></style>
