<template>
  <div class="i_cecream__bili-header">
    <div class="i_cecream__bili-header__bar">
      <ul class="left-entry">
        <li>logo</li>
        <li>首页</li>
        <li>番剧</li>
        <li>直播</li>
        <li>游戏中心</li>
        <li>放放假</li>
      </ul>

      <div class="i_cecream__bili-header__center-search-container">
        <div class="center-search__bar">
          <input
            class="center-search__bar__text"
            type="text"
            placeholder="勇士vs湖人"
          />
          <div class="search-panel iconfont">&#xe6b9;</div>
        </div>
      </div>
      <ul class="right-entry">
        <li class="right-entry-item">
          <template v-if="login">
            <div class="header-login-entry" @click="clickLogin">
              <img :src="imgSRC" alt="用户照片" />
            </div>
          </template>
          <template v-else>
            <div class="header-login-entry" @click="clickLogin">登录</div>
          </template>
        </li>
      </ul>
      <ul class="right-entry">
        <li class="header-upload-entry__text">
          <router-link :to="`/uploadVideo`" class="unit">
            <div class="header-login-upload">投稿</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <Login />
</template>
<script>
import store from "@/store";
import Login from "../login/Login.vue";
import getUserImage from "../user/userEffect";
import { toRef, ref, watch } from "vue";
const uploadVideo = function () {};

const useUserEffect = function () {
  // const { userToken: login } = toRefs(store.state);
  const login = toRef(store.state, "userToken");

  const imgSRC = ref("");
  // const login = localStorage.getItem("userToken");
  const clickLogin = function () {
    store.commit("changeIsShowLogin");
  };
  // 获取用户头像
  // 登录后token变化，立即显示照片
  watch([login], async () => {
    imgSRC.value = await getUserImage();
  });
  return { login, clickLogin, imgSRC, uploadVideo };
};
export default {
  name: "videoheader",
  components: { Login },
  async setup() {
    const { clickLogin, login, imgSRC } = useUserEffect();
    // 页面刷新后，token无变化，也立即显示照片
    const result = await getUserImage();
    if (result) {
      imgSRC.value = result;
    } else {
      console.log("未登录");
    }

    return { clickLogin, login, imgSRC };
  },
};
</script>
<style scoped lang="scss">
.i_cecream {
  &__bili-header {
    width: 100%;
    height: 6rem;
    background-color: rgba(165, 38, 38, 0.29);
    display: flex;
    &__bar {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: absolute;
      width: 100%;
      top: 0rem;
      .left-entry {
        display: flex;
        padding: 0 2.4rem 0 2.4rem;
        list-style: none;
        gap: 0.3rem;
        font-size: 1.4rem;
        color: white;
        font-weight: 40rem;
        flex-shrink: 0;
      }

      .right-entry {
        list-style: none;
        .header-login-entry {
          width: 3.6rem;
          height: 3.6rem;
          border: 2px solid #fff;
          border-radius: 50%;
          text-align: center;
          line-height: 3.6rem;
          letter-spacing: 0;
          font-size: 1.4rem;
          background-color: #00aeec;
          color: #fff;
          img {
            width: 100%;
            height: auto;
            border-radius: 50%;
          }
        }
        .header-upload-entry__text {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fb7299;
          font-size: 1.4rem;
          cursor: pointer;
          border-radius: 8px;
          width: 9rem;
          height: 3.4rem;
          margin-left: 1.6rem;
          line-height: 2rem;
          transition: background-color 0.3s;

          .header-login-upload {
            text-decoration: none;
            color: #fff;
          }
        }
      }
    }
    &__center-search-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 4rem;
      border-radius: 0.8rem;
      background-color: #f1f2f4;
      padding: 0 0.4rem 0 0.4rem;
      opacity: 0.09rem;
      transition: background-color 0.3s;
      .center-search__bar {
        display: flex;
        gap: 1.2rem;
        align-items: center;
        padding: 0 0.4rem 0 0.4rem;
        overflow: hidden;
        line-height: 3.8rem;
        width: 12rem;
        height: 4rem;
        opacity: 0.9;
        transition: background-color 0.3s;

        .center-search__bar__text {
          width: 70%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.8rem;
          width: 100%;
          height: 3.2rem;
          border: 0.2rem solid transparent;
          border-radius: 0.6rem;
        }
        .search-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3.2rem;
          height: 3.2rem;
          border: none;
          border-radius: 0.6rem;
          color: #18191c;
          line-height: 3.2rem;
          transition: background-color 0.3s;
        }
      }
    }
  }
}
</style>
