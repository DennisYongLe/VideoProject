import { createStore } from "vuex";

export default createStore({
  state: () => {
    return {
      isShowLogin: false,
      isShowCollect: false,
      userToken: localStorage.getItem("usertoken"),
    };
  },
  getters: {},
  mutations: {
    changeIsShowLogin(state) {
      state.isShowLogin = true;
    },
    closeLogin(state) {
      state.isShowLogin = false;
    },
    changeIsShowCollect(state) {
      state.isShowCollect = true;
    },
    closeIsShowCollect(state) {
      state.isShowCollect = false;
    },
    saveUserToken(state, payload) {
      localStorage.setItem("usertoken", payload.token);
      state.userToken = payload.token;
    },
  },
  actions: {},
  modules: {},
});
