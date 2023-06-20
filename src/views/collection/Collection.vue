<template>
  <Toast v-if="toastData.showToast" :toastMessage="toastData.toastMessage" />
  <div class="wrapper" v-show="store.state.isShowCollect">
    <div class="wrapper__bili-mini-login-right-wp">
      <div class="wrapper__bili-mini-login-right-wp__top">
        <div class="login-tab-item active">添加到收藏夹</div>
      </div>

      <UserCollectionGroups :videoId="videoId" />
    </div>
    <span class="wrapper__bili-mini-close-icon iconfont" @click="close"
      >&#xe612;</span
    >
  </div>
</template>
<script>
import Toast, { useToastEffect } from "../../components/Toast.vue";
import store from "@/store";
import UserCollectionGroups from "./CollectionGroups";
// import { watch } from "vue";

export default {
  name: "Collection",
  props: ["videoId"],
  components: { Toast, UserCollectionGroups },

  setup(props) {
    const { toastData } = useToastEffect();
    const close = function () {
      store.commit("closeIsShowCollect");
    };

    return {
      toastData,
      close,
      store,
    };
  },
};
</script>
<style scoped lang="scss">
.wrapper {
  z-index: 30;
  padding: 5.2rem 6.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 0 10px grey;
  display: flex;
  width: 35rem;
  // flex-basis: 200rem;
  height: 30rem;
  // flex-shrink: 0;

  &__bili-mini-login-right-wp {
    width: 90%;
    height: 65%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    z-index: 1;
    // align-content: center;

    &__top {
      height: 20%;
      margin-bottom: 2.4rem;
      align-self: center;
      display: flex;
      gap: 1.2rem;
      .login-tab-item {
        display: flex;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;

        font-size: 2.4rem;
      }
    }
    &__middle {
      width: 100%;
      height: 40%;
      align-self: center;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }
  &__bili-mini-close-icon {
    font-size: 3.2rem;
    position: fixed;
    right: 2rem;
    top: 2rem;
    width: 3.2rem;
    height: 3.2rem;
  }
}
</style>
