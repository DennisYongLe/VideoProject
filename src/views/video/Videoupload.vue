<template>
  <div class="wrapper">
    <div class="microapp">
      <div class="microapp__uploadForm">
        <input class="microapp" type="file" @change="handleFileChange" />
        <!-- <el-button @click="handleUpload">上传</el-button> -->
        <!-- <el-button>上传</el-button> -->
      </div>
    </div>
    <div class="microapp firstline">
      <div class="microapp__headtitle">基本设置</div>
    </div>
    <div class="microapp secondline">
      <span class="microapp__title">标题</span>
      <input class="microapp__titleinput input" type="text" v-model="title" />
    </div>

    <div class="microapp">
      <span class="microapp__model">类型</span>
      <!-- <input type="radio" id="self" value="self" v-model="type" />
      <label for="self">自制</label>
      <input type="radio" id="other" value="other" v-model="type" />
      <label for="other">转载</label> -->
      <div>
        <input type="radio" id="self" name="type" value="1" v-model="types" />
        <label for="self">自制</label>
      </div>

      <div>
        <input type="radio" id="other" name="type" value="2" v-model="types" />
        <label for="other">转载</label>
      </div>

      <!-- <span class="microapp__modelinput iconfont">&#xe6d0;</span> -->
      <!-- <span class="microapp__modelinput iconfont">&#xe833;</span> -->
    </div>
    <div class="microapp">
      <span class="microapp__divide">分区</span>
      <select class="divideInput" v-model="selected">
        <option value="1">生活</option>
        <option value="2">游戏</option>
      </select>
    </div>
    <div class="microapp">
      <span class="microapp__label">标签</span>
      <input class="microapp__labelinput input" v-model="label" />
    </div>
    <div class="microapp">
      <span class="microapp__description">简介</span>
      <textarea
        class="microapp__descriptioninput"
        rows="5"
        cols="33"
        v-model="text"
      >
      </textarea>
    </div>
    <div class="microapp btnbuttom">
      <input
        class="microapp__button"
        value="立即投稿"
        @click="handleUpload"
        type="button"
      />
    </div>
  </div>
  {{ title }}
  {{ types }}
  {{ label }}
  {{ selected }}
  {{ text }}
</template>
<script>
import { postVideoFile, postVideos } from "../../utils/request";
const SIZE = 10 * 1024 * 1024; // 切片大小（1MB）
// const SIZE = 10 * 1024; // 切片大小（10MB）

export default {
  data: () => ({
    // 存放文件信息
    container: {
      file: null,
      hash: null,
    },
    data: [], // 用于存放加工好的文件切片列表
    hashPercentage: 0, // 存放hash生成进度
    title: "",
    types: " ",
    selected: "",
    label: "",
    text: "",
  }),
  methods: {
    // 获取上传文件
    handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) {
        this.container.file = null;
        return;
      }
      this.container.file = file;
    },

    // 生成文件切片
    createFileChunk(file, size = SIZE) {
      const fileChunkList = [];
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) });
        cur += size;
      }
      return fileChunkList;
    },

    // 生成文件hash
    calculateHash(fileChunkList) {
      return new Promise((resolve) => {
        this.container.worker = new Worker("/hash.js");
        this.container.worker.postMessage({ fileChunkList });
        this.container.worker.onmessage = (e) => {
          const { percentage, hash } = e.data;
          // 可以用来显示进度条
          this.hashPercentage = percentage;
          if (hash) {
            resolve(hash);
          }
        };
      });
    },

    // 切片加工（上传前预处理 为文件添加hash等）
    async handleUpload() {
      // 判断输入均不为空
      //   title: "",
      // types: " ",
      // selected: "",
      // label: "",
      // text: "",
      if (
        this.title === "" ||
        this.types === "" ||
        this.selected === "" ||
        this.label === "" ||
        this.text === ""
      ) {
        console.log("some value is not appear here");
      } else {
        console.log("ok prepare to send");

        if (!this.container.file) return;
        // 切片生成
        const fileChunkList = this.createFileChunk(this.container.file);

        // hash生成
        this.container.hash = await this.calculateHash(fileChunkList);

        this.data = fileChunkList.map(({ file }, index) => ({
          chunk: file,
          // 这里的hash为文件名 + 切片序号，也可以用md5对文件进行加密获取唯一hash值来代替文件名
          hash: this.container.hash + "-" + index,
        }));

        await this.uploadChunks();
      }
    },

    // 上传切片
    async uploadChunks() {
      // const uploadRequest = function (formData) {
      //   // console.log(formData);

      //   console.log("send upload request");
      // };
      const sliceData = this.data;
      const totalSliceNo = this.data.length;
      const fileName = this.container.file.name;
      const title = this.title;
      const text = this.text;
      //   const requesstList = [];

      // eslint-disable-next-line no-unused-expressions
      !(async function () {
        for (let i of sliceData) {
          const fixedHash = sliceData[0].hash.split("-")[0];
          // 以后这样
          console.log(fileName);

          const slice = new File([i.chunk], fileName, {
            // type: "video/mp4",
          });

          const formData = new FormData();
          // formData.append("fileMd5", i.hash.split("-")[0]);
          formData.append("fileMd5", fixedHash);

          formData.append("sliceNo", +i.hash.split("-")[1] + 1);
          formData.append("totalSliceNo", totalSliceNo);
          formData.append("slice", slice);

          if (totalSliceNo - 1 === Number(i.hash.split("-")[1])) {
            const result = await postVideoFile("/api//file-slices", formData);
            const url = result.data;
            const postData = {
              url,
              title: title,
              thumbnail: url,
              duration: 111,
              type: 1,
              area: 1,
              videoTagList: [{ tagId: "1" }, { tagId: "2" }],
              description: text,
            };
            const result2 = await postVideos("/api//videos", postData);
            console.log(result2);
          } else {
            await postVideoFile("/api//file-slices", formData);
          }
        }
      })();
    },
  },
};
</script>
<style scoped lang="scss">
.wrapper {
  // margin: 1.2rem 3rem 0 0;
  margin: 0 0 0 3.2rem;
  min-width: 90rem;
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  gap: 1.2rem;

  // 基本设置
  .firstline {
    // margin: 0 0 0 3.2rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: #222;
    line-height: 2.2rem;
  }
  .microapp {
    font-size: 1.4rem;
    color: #212121;
    line-height: 2.1rem;
    font-weight: 400;
    display: flex;
    gap: 5rem;
    // flex-direction: row;
    // align-items: center;
    // width: 134px;
    &__uploadForm {
      border: 1px solid #ccd0d7;
      border-radius: 4px;
      width: 100%;
      display: flex;
      // justify-content: center;
      align-items: center;
      ::file-selector-button {
        border: 1px solid #ccd0d7;
        border-radius: 4px;
        color: #fff;
        background-color: #00a1d6;
      }
    }
    &__modelinput {
      color: #00a1d6;
      font-size: 1.4rem;
    }
    &__descriptioninput {
      border: 1px solid #ccd0d7;
      border-radius: 4px;
      resize: none;
    }
    .divideInput {
      width: 20%;
      border: 1px solid #ccd0d7;
      border-radius: 4px;
    }
    &__button {
      width: 10rem;
      height: 5rem;
      border: 1px solid #ccd0d7;
      background-color: #00a1d6;
      border-radius: 4px;
      color: #fff;
    }
  }
  .input {
    flex: 1;
    border: 1px solid #ccd0d7;
    border-radius: 4px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    transition: border 0.3s ease;
  }
  .btnbuttom {
    margin: 0 auto;
  }
}
</style>
