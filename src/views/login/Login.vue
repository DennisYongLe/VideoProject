<template>
  <Toast v-if="toastData.showToast" :toastMessage="toastData.toastMessage" />
  <div class="wrapper" v-show="store.state.isShowLogin">
    <!-- <img
      class="leftDown-open-pic"
      src="https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/22_open.4ea5f239.png"
    />
    <img
      class="rightDown-open-pic"
      src="https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/33_open.f7d7f655.png"
    /> -->
    <div class="wrapper__login-scan-wp"></div>
    <div class="wrapper__bili-mini-content-wp"><div class="line"></div></div>
    <div class="wrapper__bili-mini-login-right-wp">
      <div class="wrapper__bili-mini-login-right-wp__top">
        <div class="login-tab-item active">密码登录</div>
        <div class="login-tab-line"></div>
        <div class="login-tab-item">XXX</div>
      </div>
      <div class="wrapper__bili-mini-login-right-wp__middle">
        <div class="login-text-input">
          <span class="text-description">账号</span>
          <input
            class="text"
            type="text"
            v-model="phone"
            placeholder="请输入账号"
          />
        </div>

        <div class="login-password-input" type="password">
          <span class="text-description">密码</span>
          <input
            class="password"
            type="password"
            v-model="password"
            placeholder="请输入密码"
          />
        </div>
        <div class="login-buttom">
          <input class="login-register-button" value="注册" type="button" />
          <input
            class="login-login-button"
            value="登录"
            @click="handleLogin"
            type="button"
          />
        </div>
      </div>
      <!-- <div class="wrapper__bili-mini-login-right-wp__bottom">其他登录方式</div> -->
    </div>
    <span class="wrapper__bili-mini-close-icon iconfont" @click="close"
      >&#xe612;</span
    >
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";
import JSEncrypt from "jsencrypt";
import store from "@/store";
// 处理登录逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({
    phone: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const encrypt = new JSEncrypt();
      // 设置公钥
      const pubKey =
        "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCQk33iNdA8Iey7J6XrBsidqn6u8EDLWPHsfEUgLQ3qiTikhPKDTzZkpAfU/O0x6NvSKa7Dp0+uqWT3vnW1De0+3u8mCYdVfOdH94VG4xg5U5UrRJei8HhPiXuvKQ+6NBtebCCW5adZ4pBgOiU14cJLhVmm+dYiLo3IDD5LqrlomQIDAQAB-----END PUBLIC KEY-----";
      encrypt.setPublicKey(pubKey);
      // 对内容进行加密
      const passwordKey = encrypt.encrypt(data.password);
      const result = await post("/api/user-tokens", {
        phone: data.phone,
        password: passwordKey,
      });
      if (result?.code === "0") {
        console.log("login success");
        // 保存用户token
        store.commit("saveUserToken", { token: result.data });
        // 关闭登录框
        store.commit("closeLogin");
        router.push({ name: "Home" });
      } else {
        console.log("登录失败");
        showToast("登录失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { phone, password } = toRefs(data);
  return { phone, password, handleLogin };
};
const handleRegisterClickEffect = () => {
  const router = useRouter();
  const handleRegisterClick = function () {
    router.push({ name: "Register" });
  };
  return { handleRegisterClick };
};
export default {
  name: "login",
  components: { Toast },

  setup() {
    const { toastData, showToast } = useToastEffect();

    const { phone, password, handleLogin } = useLoginEffect(showToast);
    const { handleRegisterClick } = handleRegisterClickEffect();
    const close = function () {
      store.commit("closeLogin");
      // store.data.isShow = false;
    };
    // const { isShow } = toRefs(data);
    return {
      handleLogin,
      handleRegisterClick,
      phone,
      password,
      toastData,
      close,
      store,
      // isShow,
    };
  },
};
</script>
<style scoped lang="scss">
.wrapper {
  z-index: 8;
  padding: 5.2rem 6.5rem 2.9rem 9.2rem;
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 0 10px grey;
  display: flex;
  width: 55rem;
  // flex-basis: 200rem;
  height: 30rem;
  // flex-shrink: 0;
  .line {
    width: 1;
    height: 50%;
    border-right: 3px solid grey;
  }
  .leftDown-open-pic {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 15rem;
    height: 15rem;
  }
  .rightDown-open-pic {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 15rem;
    height: 15rem;
  }
  &__login-scan-wp {
    width: 30%;
    height: 43rem;
  }
  &__bili-mini-content-wp {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 17.3rem;
    height: 23rem;
  }
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
      .active {
        color: #4fa5d9;
      }
      .login-tab-line {
        width: 1;
        border-right: 1px solid grey;
      }
    }
    &__middle {
      width: 100%;
      height: 40%;
      align-self: center;
      display: flex;
      justify-content: center;
      flex-direction: column;

      .login-text-input {
        border-radius: 1rem 1rem 0 0;
        padding: 1.2rem 2rem;
        border: 1px solid grey;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .text {
          outline: none;
          border: 0;
          width: 85%;
          height: 100%;
        }
      }
      .login-password-input {
        border-radius: 0 0 1rem 1rem;
        padding: 1.2rem 2rem;
        border: 1px solid grey;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .password {
          outline: none;
          padding: 0;
          border: 0;
          width: 85%;
          height: 100%;
        }
      }
      .login-buttom {
        z-index: 1;
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        height: 5rem;
        justify-content: space-around;
        .login-register-button {
          border-radius: 1rem;
          border: 1px solid grey;

          width: 50%;
        }
        .login-login-button {
          border-radius: 1rem;
          border: 1px solid grey;

          width: 50%;
        }
      }
    }
    &__bottom {
      height: 20%;
      align-self: center;
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
