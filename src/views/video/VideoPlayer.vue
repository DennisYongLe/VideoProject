<template>
  <div>
    <div id="nPlayer" ref="nPlayer" />
  </div>
</template>
<script>
import Danmaku from "@nplayer/danmaku";
import Player from "nplayer";
import store from "@/store";
import { getDanmu } from "@/utils/request";
import { reactive } from "vue";

export default {
  props: ["videoSrc", "videoId"],
  data() {
    return {
      isMeDanmu: "",
      token: store.state.userToken,
    };
  },
  mounted() {
    this.nPlayer();
  },
  methods: {
    nPlayer() {
      const danmakuOptions = reactive({ items: [] });

      function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      (async () => {
        const danmakus = await getDanmu("/api/danmus", {
          videoId: this.videoId,
        });

        for (const i in danmakus) {
          // console.log(danmakus[i]);
          const colors = [
            "#FE0302",
            "#75ffcd",
            "#A0EE00",
            "#019899",
            "#CC0273",
          ];
          const item = {
            time: Number(danmakus[i].danmuTime),
            text: danmakus[i].content,
            color: colors[getRandomIntInclusive(0, colors.length)],
          };

          danmakuOptions.items.push(item);
        }

        const player = new Player({
          poster:
            "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?/tos-cn-i-k3u1fbpfcp/4d383cb6d40e4d98af97bf44be31714d~tplv-k3u1fbpfcp-watermark.image?",
          src: this.videoSrc, // 视频地址
          contextMenus: ["loop", "pip"], // 右键菜单设置项
          plugins: [new Danmaku(danmakuOptions)], // 弹幕配置项
          controls: [
            [
              "play",
              "progress",
              "time",
              "web-fullscreen",
              "fullscreen",
              "danmaku-send",
              "danmaku-settings",
            ],
          ],
        });

        player.mount("#nPlayer"); // 链接服务器
        if (store.state.userToken) {
          const ws = new WebSocket(
            `ws://10.241.7.235:15005/imserver/${store.state.userToken}`
          );

          ws.onopen = function () {
            console.log("数据发送中...");
          };
          ws.onmessage = function (e) {
            if (e.data) {
              const parseData = JSON.parse(e.data);
              console.log(parseData);
              const item = {
                time: Number(parseData.danmuTime),
                text: parseData.content,
                color: "#CC0273",
              };
              player.danmaku.addItem(item);
            }
          };
          ws.onclose = function () {
            console.log("连接已关闭...");
          };

          player.on("DanmakuSend", (opts) => {
            const sendData = {
              videoId: 33,
              content: opts.text,
              danmuTime: opts.time,
            };
            const jsonData = JSON.stringify(sendData);

            ws.send(jsonData);
            console.log("用户当前发送的弹幕信息", opts);
          });
        } else {
          store.commit("changeIsShowLogin");
        }
      })();
    },
  },
};
</script>
