<template>
  <Suspense> <Collection :videoId="videoId" /></Suspense>

  <div class="left">
    <h4>{{ leftInfo.title }}</h4>
    <div class="left__subtitle">
      <span class="dm item">视频时长：{{ leftInfo.duration }}min</span>
    </div>

    <VideoPlayer :videoSrc="videoSRC" :videoId="videoId" />
    <!-- <video controls class="left__video-wrap" :src="videoSRC" /> -->
    <div class="video-toolbar-v1">
      <span class="video-toolbar-v1__like active"
        >点赞{{ leftInfo.openrationCount.likes }}</span
      >

      <span class="video-toolbar-v1__coin"
        >投币{{ leftInfo.openrationCount.coins }}</span
      >
      <span class="video-toolbar-v1__collect" @click="changeIsShowCollect"
        >收藏{{ leftInfo.openrationCount.collections }}</span
      >
    </div>
    <Suspense><Videocomment /></Suspense>
  </div>
</template>
<script>
import { ref } from "vue";
import getVideoInfo from "../user/videoEffect";
import Collection from "../collection/Collection.vue";
import store from "@/store";
import VideoPlayer from "./VideoPlayer.vue";
import Videocomment from "./VideoComment.vue";
export default {
  name: "videomoddle",
  components: { Collection, VideoPlayer, Videocomment },

  async setup() {
    const { result } = await getVideoInfo();
    const leftInfo = ref(result.data);
    // 不加ref其实也可以被子元素获取到，但为什么leftInfo写到组件里通过leftInfo.value.id就不可以传过去呢？
    const videoId = ref(leftInfo.value.id);

    const videoSRC = ref("/api/video-slices?url=" + leftInfo.value.url);

    const userToken = store.state.userToken;
    const changeIsShowCollect = async function () {
      if (userToken) {
        store.commit("changeIsShowCollect");
      } else {
        store.commit("changeIsShowLogin");
      }
    };
    const danmus = ref(["danmu1", "danmu2", "danmu3", "danmu3", "..."]);
    const loop = true;
    return {
      videoId,
      leftInfo,
      videoSRC,
      changeIsShowCollect,
      danmus,
      loop,
    };
  },
};
</script>
<style scoped lang="scss">
.vue-danmaku {
  position: relative;
  margin-bottom: -100px;
  width: 100%;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.274);
}
.left {
  flex: 0 0 75%;
  &__subtitle {
    display: flex;
    gap: 3px;
    justify-content: flex-start;
    .item {
      flex-shrink: 0;
      height: 100%;
      vertical-align: middle;
      display: inline-block;
      color: gray;
    }
  }
  &__video-wrap {
    display: block;
    width: 100%;
    height: auto;
  }
  .video-toolbar-v1 {
    display: flex;
    padding-top: 1.6rem;
    padding-bottom: 1.2rem;
    height: 2.8rem;
    border-bottom: 1px solid #e3e5e7;
    line-height: 2.8rem;
    > span {
      width: 4rem;
      margin-right: 0.8px;
      cursor: pointer;
      transition: all 0.3s;
      white-space: nowrap;
      position: relative;
      display: inline-flex;
      align-items: center;
      color: #61666d;
    }
    span:hover {
      color: #00aeec;
    }
  }
}
</style>
