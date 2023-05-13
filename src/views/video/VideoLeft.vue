<template>
  <Suspense> <Collection :videoId="videoId" /></Suspense>
  <div class="left">
    <h4>{{ leftInfo.title }}</h4>
    <div class="left__subtitle">
      <span class="dm item">视频时长：{{ leftInfo.duration }}min</span>
      <!-- <span class="pudate item">2023-05-05 20:07:24 </span> -->
      <!-- <span class="text item">未经作者授权，禁止转载</span> -->
    </div>
    <video controls class="left__video-wrap" :src="videoSRC" />
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
  </div>
</template>
<script>
import { ref } from "vue";
import getVideoInfo from "../user/videoEffect";
import Collection from "../collection/Collection.vue";

import store from "@/store";
export default {
  name: "videomoddle",
  components: { Collection },
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

    return { videoId, leftInfo, videoSRC, changeIsShowCollect };
  },
};
</script>
<style scoped lang="scss">
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
