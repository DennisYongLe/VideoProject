<template>
  <div class="wrapper">
    <CommentForm
      @addCom="addCom"
      :isTop="true"
      :videoId="`${Number(videoId)}`"
      :replyUserId="null"
      :rootId="null"
    />
    <div class="comment-container">
      <div class="comment" v-for="(comment, index) in comments" :key="index">
        <img
          class="comment-avatar"
          :src="`/api/users-avatar?url=${comment.userInfo.avatar}`"
        />
        <div class="comment-content">
          <p class="comment-text">
            <span class="comment-author"> {{ comment.userInfo.nick }}：</span>
            {{ comment.comment }}
            <button
              @click="
                showReply(
                  comment.userInfo.id,
                  comment.userInfo.userId,
                  comment.userInfo.nick,
                  index,
                  true
                )
              "
            >
              回复
            </button>
          </p>
          <template
            v-for="(reply, replyIndex) in comment.childList"
            :key="replyIndex"
          >
            <div class="reply">
              <img
                class="reply-avatar"
                :src="`/api/users-avatar?url=${reply.replyUserInfo.avatar}`"
              />
              <div class="reply-content">
                <p class="reply-text">
                  <span class="reply-author"> {{ reply.userInfo.nick }}：</span>
                  <template v-if="reply.replyUserId">
                    @{{ reply.replyUserInfo.nick }} {{ reply.comment }}
                  </template>
                  <template v-else>
                    {{ reply.comment }}
                  </template>
                  <button
                    @click="
                      showReply(
                        comment.userInfo.id,
                        reply.userInfo.id,
                        reply.userInfo.nick,
                        replyIndex,
                        false
                      )
                    "
                  >
                    <!-- id, id2, name, istop, replyIndex -->
                    回复
                  </button>
                </p>
              </div>
            </div>
            <template v-if="top === false">
              <template v-if="replyIndex == showIndex">
                <CommentForm
                  @addCom="addCom"
                  v-show="true"
                  :showReplyId="showReplyId"
                  :replyId="reply.userInfo.userId"
                  :replyNick="replyNick"
                  :isTop="false"
                  :videoId="videoId"
                  :replyUserId="reply.userInfo.userId"
                  :rootId="comment.id"
                />
              </template>
            </template>
          </template>
          <template v-if="top === true">
            <template v-if="index == showIndex">
              <CommentForm
                @addCom="addCom"
                v-show="true"
                :showReplyId="showReplyId"
                :replyId="replyId"
                :replyNick="replyNick"
                :isTop="false"
                :videoId="videoId"
                :replyUserId="replyId"
                :rootId="comment.id"
              />
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { nextTick, ref } from "vue";
import { getComment } from "../../utils/request";
import { useRoute } from "vue-router";
import CommentForm from "./CommentForm.vue";
const getComments = async function (videoId) {
  const result = await getComment("/api/video-comments", {
    size: 100,
    no: 1,
    videoId: videoId,
  });
  return result.data.list;
};
export default {
  name: "videoComment",
  components: { CommentForm },
  async setup() {
    const route = useRoute();
    const videoId = route.params.id;
    const comments = ref([]);
    const showReplyId = ref();
    const showIndex = ref(-1);
    const replyId = ref();
    const replyNick = ref();
    const top = ref();
    const addCom = (e) => {
      nextTick(() => {
        // eslint-disable-next-line no-unused-expressions
        !(async function () {
          comments.value = await getComments(videoId);
        })();
      });
    };
    // eslint-disable-next-line no-unused-expressions
    !(async function () {
      comments.value = await getComments(videoId);
    })();
    // id在哪个下方显示 replyId回复给谁
    function showReply(id, id2, name, replyIndex, top1) {
      showReplyId.value = id;
      replyId.value = id2;
      replyNick.value = name;
      showIndex.value = replyIndex;
      top.value = top1;
      console.log(showIndex.value);
    }
    return {
      videoId,
      comments,
      addCom,
      showReply,
      showIndex,
      showReplyId,
      replyId,
      replyNick,
      top,
    };
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  font-family: Arial, sans-serif;
  height: 800px;
  overflow: scroll;
}

.comment-container {
  max-width: 600px;
}

.comment {
  display: flex;
  margin-bottom: 20px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 10px;
}

.comment-content {
  flex: 1;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
}

.comment-text {
  margin-bottom: 5px;
}

.comment-author {
  font-weight: bold;
}

.reply {
  margin-left: 50px;
  padding-left: 10px;
  border-left: 2px solid #ddd;
}

.reply-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;
}

.reply-content {
  background-color: #f8f8f8;
  border-radius: 6px;
  padding: 8px;
}

.reply-text {
  margin-bottom: 3px;
}

.reply-author {
  font-weight: bold;
}

.video-container {
  width: 100%;
  height: 400px;
  background-color: #000;
  margin-top: 20px;
}
</style>
