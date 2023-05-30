<template>
  <Suspense> <Videoheader /></Suspense>
  <div class="wrapper">
    <div class="wrapper__left">IN DEVELOPMENT</div>
    <div class="wrapper__right">
      <Videoupload />
    </div>
  </div>
</template>
<script>
import Videoupload from "../video/Videoupload.vue";
import Videoheader from "../video/Videoheader";
export default {
  components: { Videoheader, Videoupload },
  name: "UploadVideo",
  setup() {},
};
</script>
<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  &__left {
    min-width: 20rem;
    background-color: rgba(0, 255, 255, 0.269);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__right {
    flex: 1;
  }
}
</style>
