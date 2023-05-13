<template>
  <!-- <Toast v-if="toastData.showToast" :toastMessage="toastData.toastMessage" /> -->
  <div class="item" v-for="i in result" :key="i">
    <div class="icon iconfont" @click="check(i)">
      <template v-if="!i.checked">&#xe67b;</template>
      <template v-else>&#xe679;</template>
    </div>
    <div class="itemRight">{{ i.name }}</div>
  </div>
  <div class="login-buttom">
    <input
      class="login-login-button"
      value="确定"
      @click="handleCollect()"
      type="button"
    />
  </div>
</template>
<script>
import { postVideoLike, get } from "../../utils/request";
import { ref } from "vue";
import store from "@/store";

export default {
  props: ["videoId"],
  name: "CollectionGroups",
  async setup(props) {
    const userToken = store.state.userToken;

    let result = ref();
    if (userToken) {
      (async function () {
        const data = await get("/api/user-collection-groups");
        result.value = data.data;
        for (const key in result.value) {
          result.value[key].checked = false;
          // console.log(result.value[key]);
        }
      })();
    } else {
      console.log("数据没有");
    }
    // 点击勾选
    const check = function (i) {
      i.checked = !i.checked;
    };
    // 收藏
    const handleCollect = function () {
      for (const key in result.value) {
        if (result.value[key].checked === true) {
          const videoId = result.value[key].id;
          const groupId = props.videoId;
          (async function () {
            const result = await postVideoLike("/api/video-likes", {
              videoId: videoId,
              groupId: groupId,
            });
            if (result.code === 0) {
              console.log("success");
            } else {
              // toast 点赞成功
            }
          })();
          store.commit("closeIsShowCollect");
        }
      }
    };
    return { result, check, handleCollect };
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
.login-buttom {
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-login-button {
    width: 16rem;
    height: 4rem;
    background-color: #1890ff;
    margin-top: 1.8rem;
    cursor: pointer;
    color: #ffffff;
    border-radius: 4px;
    font-size: 1.4rem;
    border: none;
  }
}
</style>
