import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "./style/base.scss";
import NPlayer from "@nplayer/vue";

createApp(App).use(NPlayer).use(store).use(router).mount("#app");
