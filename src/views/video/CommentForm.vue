<template>
  <form
    class="commentSubmit"
    @submit.prevent="addComment()"
    v-if="!(imgsrc.split(`=`).pop() == `undefined`)"
  >
    <img class="comment-avatar" :src="imgsrc" />
    <template v-if="props.isTop">
      <input
        class="commentInput"
        type="text"
        v-model="newComment"
        :placeholder="`等待你来发表评论`"
      />
      <button class="commentButton" type="submit">发表评论</button>
    </template>
    <template v-else>
      <input
        class="commentInput"
        type="text"
        v-model="newComment"
        :placeholder="`输入评论 @${props.replyNick}:`"
      />
      <button class="commentButton" type="submit">发表评论</button>
    </template>
  </form>
  <form class="commentSubmit" @submit.prevent="addComment()" v-else>
    <input
      class="commentInput"
      type="text"
      v-model="newComment"
      placeholder="输入评论"
    />

    <button
      class="commentButton readonly"
      disabled="readonly "
      type="submit"
      @click="addComment"
    >
      发表评论
    </button>
  </form>
</template>
<script setup>
import { ref, defineEmits, defineProps } from "vue";
import getUserImage from "../user/userEffect";
import { postComments } from "../../utils/request";
const props = defineProps({
  replyNick: String,
  replyId: Number,
  showReplyId: Number,
  isTop: Boolean,
  videoId: String,
  replyUserId: Number,
  rootId: Number,
});

const imgsrc = ref("");

const newComment = ref("");
// eslint-disable-next-line no-unused-expressions
!(async function () {
  const result = await getUserImage();
  if (result) {
    imgsrc.value = result;
  } else {
    console.log("未登录");
  }
})();
const emits = defineEmits(["addCom"]);
const addComment = () => {
  if (newComment.value.trim() !== "") {
    const comment = {
      videoId: props.videoId,
      comment: newComment.value.trim(),
      replyUserId: props.replyUserId,
      rootId: props.rootId,
    };
    console.log("rootId", comment.rootId);
    console.log("replyUserId", comment.replyUserId);
    // eslint-disable-next-line no-unused-expressions
    !(async function () {
      const result = await postComments("/api/video-comments", comment);
      emits("addCom", comment);
      console.log(result);
      newComment.value = "";
    })();
  }
};
</script>
<style scoped lang="scss">
.commentSubmit {
  margin-top: 1.2rem;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .comment-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ddd;
    margin-right: 10px;
  }
  .commentInput {
    width: 70%;
    height: 5rem;
    background: #ccc;

    border-radius: 5px;
    border: none;
  }
  .commentInput:hover {
    background: #fff;
    transition: 0.3s;
    border: none;
  }
  .commentInput:focus {
    background: none;
    outline: none;
    border: none;
  }

  .commentUser {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 10px;
  }

  .commentButton {
    font-size: 1rem;
    height: 60%;
    background-color: #00aeec;
    flex: 1 1 auto;
    max-width: 60px;
    transition: 0.3s all;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 10%;
    border: none;
  }
  .readonly {
    background-color: grey;
    cursor: wait;
  }
}
</style>
