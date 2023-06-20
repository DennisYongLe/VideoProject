<template>
  <div class="right">
    <div class="right__upinfo">
      <div class="u-face">
        <img class="img" :src="imgSRC" />
      </div>
      <div class="up-info_right">
        <div class="up-info_right__topline">
          <span>{{ upInfo.nick }}</span>
          <a href="#">发信息</a>
        </div>
        <div class="up-info_right__middleline">
          <span>{{ upInfo.sign }}</span>
        </div>
        <div class="btn-panel">
          <template v-if="upInfo.followed"
            ><div class="charge">
              +<span>关注{{ upInfo.followed || 0 }}</span>
            </div>
          </template>
          <template v-else
            ><div class="charge">
              +<span>已关注{{ upInfo.followed || 0 }}</span>
            </div></template
          >
        </div>
      </div>
    </div>
    <div class="bui-collapse-wrap">
      <div class="bui-dropdown-display">
        <span class="bui-dropdown-name">弹幕列表</span>
        <span @click="checkAllDanmu" class="bui-dropdown-icon iconfont"
          >&#xeb10;</span
        >
      </div>
      <div @click="showDanmuList = false" class="bui-dropdown-items iconfont">
        &#xe612;
      </div>
    </div>
    <div class="bui-danmu-wrap" v-if="showDanmuList">
      <div class="item" v-for="i in danmmu" :key="i.id">
        <span>{{ i.danmuTime }}</span>
        <span> {{ i.content }}</span>
        <span> {{ i.createTime }}</span>
      </div>
    </div>
    <div class="reco_list">
      <div class="rec-title">我的视频</div>
      <router-link
        :to="`/video/${i.id}`"
        class="card-box"
        v-for="i in showList"
        :key="i.id"
      >
        <img
          class="card-box__img"
          src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?"
        />
        <div class="card-box__right">
          <div class="card-box__right__topline fontstyle">
            <span class="description">{{ i.title }}</span>
          </div>
          <div class="card-box__right__middleline fontstyle">
            <span class="description">{{ i.description }}</span>
          </div>
          <div class="card-box__right__btn-panel fontstyle">
            <div class="btn-panel">
              +<span class="description">关注 34.4万</span>
            </div>
          </div>
        </div>
      </router-link>
      <router-view />
    </div>
  </div>
</template>
<script>
import { getUserInfoById, getDanmuById } from "@/utils/request";
import getVideoInfo, { videoInfoEffect } from "../user/videoEffect";
import { ref, reactive, toRefs } from "vue";
export default {
  name: "VideoRight",
  async setup() {
    const imgSRC = ref("");
    // 获取视频对应的用户id
    const result = await getVideoInfo();
    const videoId = result.result.data.id;
    const danmmu = ref([]);
    const userId = result.result.data.upInfo.userInfo.userId;
    const showDanmuList = ref(false);
    const checkAllDanmu = async function () {
      showDanmuList.value = true;

      const result = await getDanmuById("/api/danmus", {
        videoId: videoId,
      });
      danmmu.value = result.data;
    };
    // 获取用户所有信息
    const getUserInfo = async function () {
      const result = await getUserInfoById("/api/user-id", {
        upUserId: userId,
      });

      imgSRC.value =
        "/api/users-avatar?url=" + result.data.data.userInfo.avatar;

      return result.data.data;
    };

    const userInfoData = await getUserInfo();

    const { getvideoInfo } = videoInfoEffect();
    const videoInfo = await getvideoInfo();
    let videoInfoList = ref(videoInfo.data.list);
    let data = reactive({
      upInfo: {
        nick: userInfoData?.userInfo?.nick || "",
        sign: userInfoData?.userInfo?.sign || "",
        followed: userInfoData?.userInfo?.followed || "",
      },
      showList: videoInfoList.value,
    });
    const { showList, upInfo } = toRefs(data);
    // for (let i of showList.value) {
    //   console.log(i);
    // }
    return { showList, upInfo, imgSRC, checkAllDanmu, showDanmuList, danmmu };
  },
};
</script>
<style scoped lang="scss">
.right {
  flex: 1;
  &__upinfo {
    margin: 0 0 1rem 0;
    display: flex;
    .u-face {
      flex: 0 0 30%;
      .img {
        border-radius: 50%;
        width: 100%;
        height: auto;
      }
    }
    .up-info_right {
      margin-left: 1.2rem;
      flex: 1;
      overflow: auto;
      display: grid;
      grid-template-rows: 1fr 1fr 2fr;
      &__topline {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        a:link {
          color: grey;
          transition: color 0.3s;
          flex-shrink: 0;
          text-decoration: none;
        }
        a:hover {
          color: #00aeec;
        }
      }
      &__middleline {
        margin: 0.2rem 0 1rem 0;
        line-height: 1.6rem;
        height: 1.6rem;
        // 下面三个组合在一起实现...
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .btn-panel {
        display: flex;
        .charge {
          height: 60%;
          background-color: #00aeec;
          flex: 1 1 auto;
          max-width: 20rem;
          transition: 0.3s all;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          border-radius: 10%;
        }
        .charge:hover {
          background-color: #00b8f6;
        }
      }
    }
  }
  .bui-collapse-wrap {
    min-width: 43rem;
    background-color: #f1f2f3af;
    border-radius: 6px;
    min-height: 4.4rem;
    display: flex;
    justify-content: space-between;
    .bui-dropdown-display {
      padding: 0 1rem 0 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .bui-dropdown-items {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 1rem;
    }
  }
  .bui-danmu-wrap {
    background-color: #f1f2f3af;
    border-radius: 6px;
    min-height: 4.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3px;
    .item {
      display: flex;
      justify-content: space-between;
      gap: 30px;
      align-items: center;
    }
  }
  .reco_list {
    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 3px;
    .card-box {
      width: 100%;
      display: flex;
      &__img {
        width: 6rem;
        height: 4rem;
      }
      &__right {
        min-width: 10rem;
        margin-left: 1rem;
        flex: 1;
        .fontstyle {
          font-size: 1rem;
        }
        &__topline {
          color: #18191c;
        }
        &__middleline {
          color: #9499a0;
        }
        &__btn-panel {
          color: #9499a0;
        }
      }
    }
  }
}
</style>
