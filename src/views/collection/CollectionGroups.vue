<template>
  <Toast v-if="toastData.showToast" :toastMessage="toastData.toastMessage" />
  <div class="item">
    <div class="icon iconfont">&#xe67b;</div>
    <div class="itemRight">1423</div>
  </div>
</template>
<script>
import store from "@/store";
import Toast, { useToastEffect } from "../../components/Toast.vue";
export default {
  name: "CollectionGroups",
  components: { Toast },
  setup() {
    const { toastData, showToast } = useToastEffect();
    const userToken = store.state.userToken;
    if (userToken) {
      // 请求收藏列表
    } else {
      showToast("未登录");
    }
    return { toastData };
  },
};
</script>

<style scoped lang="scss">
.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 3rem;
  .icon {
    font-size: 1.9rem;
    width: 2rem;
    height: 2rem;
    margin-right: 1.8rem;
  }
}
</style>
