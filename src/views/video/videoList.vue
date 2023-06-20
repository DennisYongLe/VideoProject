<template>
  <div class="i_cecream">
    <div class="i_cecream__bili-feed4">
      <main class="i_cecream__bili-feed4-layout">
        <router-link
          :to="`/video/${i.id}`"
          class="unit"
          v-for="i in showList"
          :key="i.id"
        >
          <a href="#">
            <img
              class="unit__img"
              src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?"
            />
          </a>
          <div class="bili-video-card__info--tit">
            <span>{{ i.title }}</span>
          </div>
          <div class="bili-video-card__info--bottom">
            <span>{{ i.description }}（视频时长：{{ i.duration }}min）</span>
          </div>
        </router-link>
      </main>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { videoInfoEffect } from "../user/videoEffect";
export default {
  name: "videoList",
  async setup() {
    const { getvideoInfo } = videoInfoEffect();
    const result = await getvideoInfo();
    let videoInfo = ref(result.data.list);
    const showList = videoInfo.value;
    return { showList };
  },
};
</script>

<style scoped lang="scss">
.i_cecream {
  &__bili-feed4 {
    box-sizing: border-box;
    display: block;
    font-size: 1.4rem;
    line-height: 2.24rem;
    text-align: left;
    position: relative;
    width: 100%;
  }

  &__bili-feed4-layout {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 2rem;
    position: relative;

    .unit {
      min-width: 25.5rem;
      margin-top: 1.2rem;
      background-color: white;
      z-index: 1;
      box-sizing: border-box;
      &__img {
        width: 100%;
        height: auto;
      }
      .bili-video-card__info--tit {
        height: auto;
        font-size: 1.5rem;
        padding-right: 1.6rem;
        color: #18191c;
        line-height: 2.2rem;
      }
      .bili-video-card__info--bottom {
        height: auto;
        margin-top: 0.4rem;
        color: #9499a0;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
  }
}
</style>
