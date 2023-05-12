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
        <span class="bui-dropdown-icon iconfont">&#xeb10;</span>
      </div>
      <div class="bui-dropdown-items iconfont">&#xe612;</div>
    </div>
    <div class="reco_list">
      <div class="rec-title">我的视频</div>
      <div class="card-box" v-for="i in showList" :key="i.id">
        <img class="card-box__img" :src="i.unit__img" />
        <div class="card-box__right">
          <div class="card-box__right__topline fontstyle">
            <span class="description">{{ i.card__info__tit }}</span>
          </div>
          <div class="card-box__right__middleline fontstyle">
            <span class="description">{{ i.upName }}</span>
          </div>
          <div class="card-box__right__btn-panel fontstyle">
            <div class="btn-panel">
              +<span class="description">关注 34.4万</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfoById } from "@/utils/request";
// import store from "@/store";
// import { toRef, toRefs, watch, ref, reactive } from "vue";
import getVideoInfo from "../user/videoEffect";
import { ref, reactive, toRefs } from "vue";
// const userInfoEffect = async function () {
//   //   const login = toRef(store.state, "userToken");
//   const imgSRC = ref("");
//   // 获取视频对应的用户id
//   const result = await getVideoInfo();

//   const userId = result.result.data.upInfo.userInfo.userId;

//   // 获取用户所有信息
//   const getUserInfo = async function () {
//     const result = await getUserInfoById("/api/user-id", { upUserId: userId });

//     // const nick sign followed
//     imgSRC.value = "/api/users-avatar?url=" + result.data.data.userInfo.avatar;

//     return result.data.data;
//   };

//   const userInfoData = await getUserInfo();
//   return { userInfoData, imgSRC };
// };
export default {
  name: "VideoRight",
  async setup() {
    //   const login = toRef(store.state, "userToken");
    const imgSRC = ref("");
    // 获取视频对应的用户id
    const result = await getVideoInfo();

    const userId = result.result.data.upInfo.userInfo.userId;

    // 获取用户所有信息
    const getUserInfo = async function () {
      const result = await getUserInfoById("/api/user-id", {
        upUserId: userId,
      });

      // const nick sign followed
      imgSRC.value =
        "/api/users-avatar?url=" + result.data.data.userInfo.avatar;

      return result.data.data;
    };

    const userInfoData = await getUserInfo();

    let data = reactive({
      upInfo: {
        nick: userInfoData?.userInfo?.nick || "",
        sign: userInfoData?.userInfo?.sign || "",
        followed: userInfoData?.userInfo?.followed || "",
      },
      showList: [
        {
          id: "1",
          unit__img:
            "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?",
          card__info__tit: "Maria乘风初舞台《极乐净土》 今夕是何年？",
          upName: "夏宇",
        },
        {
          id: "2",
          unit__img:
            "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?",
          card__info__tit: "Maria乘风初舞台《极乐净土》 今夕是何年？",
          upName: "夏宇",
        },
        {
          id: "3",
          unit__img:
            "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?",
          card__info__tit: "Maria乘风初舞台《极乐净土》 今夕是何年？",
          upName: "夏宇",
        },
        {
          id: "4",
          unit__img:
            "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?",
          card__info__tit: "Maria乘风初舞台《极乐净土》 今夕是何年？",
          upName: "夏宇",
        },
        {
          id: "5",
          unit__img:
            "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?",
          card__info__tit: "Maria乘风初舞台《极乐净土》 今夕是何年？",
          upName: "夏宇",
        },
      ],
    });
    const { showList, upInfo } = toRefs(data);
    return { showList, upInfo, imgSRC };
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
  .reco_list {
    display: flex;
    flex-direction: column;
    justify-content: center;

    // align-items: center;
    gap: 3px;
    .card-box {
      width: 100%;
      display: flex;
      &__img {
        width: 6rem;
        height: 4rem;
      }
      &__right {
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
