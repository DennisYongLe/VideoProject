import store from "@/store";
import { toRef, ref } from "vue";
// import getUserImage from "../user/userEffect";
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
  //   watch([login], async () => {
  //     imgSRC.value = await getUserImage();
  //   });
  return { login, clickLogin, imgSRC };
};
export default useUserEffect;
