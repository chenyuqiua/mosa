<template>
  <div class="comment_item">
    <div class="actor">
      <img src="@/assets/img/actor.jpg" alt="" />
    </div>
    <div class="comment">
      <div class="user_info">
        <div class="top">
          <div class="name">{{ commentData.name }}</div>
          <div class="report">举报</div>
        </div>
        <div class="time">
          <span class="span">{{ commentData.time }} </span>
          <span>{{ commentData.score }}</span>
          <a-rate v-model:value="commentData.score" allow-half disabled />
        </div>
        <div class="content">
          {{ commentData.comment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

defineProps({
  commentData: {
    type: Object,
    default: {}
  }
})
</script>

<style lang="less" scoped>
.comment_item {
  display: flex;
  width: 100%;
  padding: 20px;
  padding-right: 0;

  .actor {
    img {
      width: 45px;
      height: 45px;
      margin-right: 20px;
      border-radius: 50%;
    }
  }

  .comment {
    width: 100%;

    .user_info {
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name {
          font-size: 18px;
        }

        .report {
          cursor: pointer;
        }
      }

      .time {
        font-size: 12px;

        .span {
          margin-right: 10px;
        }
      }

      .content {
        margin-top: 20px;
        padding-bottom: 20px;
        font-size: 16px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
