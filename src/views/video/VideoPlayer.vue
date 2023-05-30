<template>
  <div>
    <div id="nPlayer" ref="nPlayer" />
    <!-- {{ videoSrc }}
    <NPlayer :options=`{ src: {{ videoSrc }} }` :set="setPlayer" /> -->
    <!-- <NPlayer
      :options="{
        src: videoSrc1,
      }"
      :set="setPlayer"
    /> -->
  </div>
</template>
<script>
// import { onMounted, ref } from "vue";
import Danmaku from "@nplayer/danmaku";
import Player from "nplayer";
import store from "@/store";
import { getDanmu } from "@/utils/request";
import { reactive } from "vue";
// export default {
//   props: ["videoSrc"],
//   setup(props) {
//     let player = null;
//     const videoSrc1 = ref(props.videoSrc);

//     onMounted(() => {
//       console.log(player);
//     });

//     return {
//       setPlayer: (p) => (player = p),
//       videoSrc1,
//     };
//   },
// };
//
//

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
      // {
      //   items: [
      //     { time: 5, text: "弹幕1～", color: "#FE0302" },
      //     { time: 10, text: "是我是我", color: "#75ffcd", isMe: true },
      //     { time: 17, text: "弹幕2～", color: "#A0EE00" },
      //     { time: 18, text: "弹幕3～", color: "#019899" },
      //     { time: 20, text: "弹幕4～", color: "#CC0273" },
      //   ],
      // };
      // 请求后台弹幕
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
        // const danmakuOptionsObj = JSON.parse(JSON.stringify(danmakuOptions));
        // console.log(danmakuOptionsObj);

        // watch(
        //   () => danmakuOptions,
        //   (value, oldValue) => {
        //     danmakuOptionsObj = JSON.parse(JSON.stringify(value));
        //     console.log(value, oldValue);
        //     console.log(danmakuOptionsObj);
        //   },
        //   { immediate: true }
        // );

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
            // [],
            // ["spacer", "settings"],
          ],
        });

        player.mount("#nPlayer"); // 链接服务器
        //   var ws = new WebSocket("ws://10.10.8.223:9283/lbh");
        if (store.state.userToken) {
          const ws = new WebSocket(
            `ws://10.241.7.235:15005/imserver/${store.state.userToken}`
          );

          ws.onopen = function () {
            console.log("数据发送中...");
            // const item = {
            //   time: 13,
            //   text: "fei2222222222222222",
            //   color: "#CC0273",
            // };

            // danmakuOptions.items.push(item);
            // player.plugins = [new Danmaku(danmakuOptions)];
            // console.log(player);
            // player.mount("#nPlayer");
            // console.log(player.danmaku.addItem(item));
          };
          ws.onmessage = function (e) {
            // console.log(e instanceof MessageEvent);

            if (e.data) {
              // console.log("接受到消息:" + e.data);
              const parseData = JSON.parse(e.data);
              console.log(parseData);
              const item = {
                time: Number(parseData.danmuTime),
                text: parseData.content,
                color: "#CC0273",
              };
              // console.log(item);
              player.danmaku.addItem(item);
            }
          };
          ws.onclose = function () {
            console.log("连接已关闭...");
          };
          // function sendMsg(msg) {
          //   ws.send(msg);
          // }
          player.on("DanmakuSend", (opts) => {
            // this.isMeDanmu = e.data;
            // sendMsg(opts);
            const sendData = {
              videoId: 33,
              content: opts.text,
              danmuTime: opts.time,
            };
            const jsonData = JSON.stringify(sendData);
            // console.log(jsonData);

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
