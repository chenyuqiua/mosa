<template>
  <div class="course-detail">
    <div class="top">
      <div class="top_wrapper">
        <div class="title">M理论</div>
        <div class="info"><span>更新中 </span> <span>共12节</span></div>
      </div>
    </div>
    <a-tabs v-model:activeKey="activeKey" centered class="tabs">
      <a-tab-pane key="1" tab="简介" class="tab tab1">
        <div class="main">
          <img src="@/assets/img/cur.png" alt="" />
          <img src="@/assets/img/cur2.png" alt="" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="目录" class="tab tab2" force-render>
        <a-collapse v-model:activeKey="directory">
          <a-collapse-panel key="1" header="01. 零基础学习Python, 教学教学教学">
            <div class="course_title">
              <div class="title_left">
                <play-circle-outlined />
                <div class="span">1. 零基础学习Python, 教学教学教学</div>
              </div>
              <div class="title_right"><lock-outlined /></div>
            </div>
            <div class="time">9月1日 20:00-22:00</div>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="02. 零基础学习Python, 教学教学教学">
            <div class="course_title">
              <div class="title_left">
                <play-circle-outlined />
                <div class="span">2. 零基础学习Python, 教学教学教学</div>
              </div>
              <div class="title_right"><lock-outlined /></div>
            </div>
            <div class="time">9月4日 20:00-22:00</div>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane key="3" tab="评价" class="tab">
        <div class="course_comment">
          <div class="comment_percentage">好评度: 100%</div>
          <div class="comment_tab">
            <div class="tab_list">
              <div class="tab_item" :class="{ active: activeComment === 0 }" @click="itemClicka(0)">
                全部(172)
              </div>
              <div class="tab_item" :class="{ active: activeComment === 1 }" @click="itemClicka(1)">
                好评(172)
              </div>
              <div class="tab_item" :class="{ active: activeComment === 2 }" @click="itemClicka(2)">
                中评(0)
              </div>
              <div class="tab_item" :class="{ active: activeComment === 3 }" @click="itemClicka(3)">
                差评(0)
              </div>
            </div>
            <div class="show_info">
              <div class="show_item" v-if="activeComment === 0">
                <template v-for="item in commentData">
                  <CommentItem :comment-data="item" />
                </template>

                <div class="empty" v-if="!commentData">
                  <img src="@/assets/img/empty.png" alt="" />
                  <span>空空如也~~</span>
                </div>
              </div>
              <div class="show_item" v-if="activeComment === 1">
                <template v-for="item in commentData">
                  <CommentItem :comment-data="item" />
                </template>

                <div class="empty" v-if="!commentData">
                  <img src="@/assets/img/empty.png" alt="" />
                  <span>空空如也~~</span>
                </div>
              </div>
              <div class="show_item" v-if="activeComment === 2">
                <div class="empty">
                  <img src="@/assets/img/empty.png" alt="" />
                  <span>空空如也~~</span>
                </div>
              </div>
              <div class="show_item" v-if="activeComment === 3">
                <div class="empty">
                  <img src="@/assets/img/empty.png" alt="" />
                  <span>空空如也~~</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
// import { useRoute } from "vue-router"
// @ts-ignore
import CommentItem from "@/components/CommentItem.vue"
import commentData from "@/assets/data/commentData"
import { PlayCircleOutlined, LockOutlined } from "@ant-design/icons-vue"

// const route = useRoute()
// let courseId = route.params.id

// 数据绑定
let activeKey = ref("1")
let activeComment = ref(0)
let directory = ref("1")

// 事件绑定
function itemClicka(index: number) {
  activeComment.value = index
}
</script>

<style lang="less" scoped>
.course-detail {
  width: 100%;
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    height: 60px;
    color: #fff;
    background-color: #e368e5;

    .top_wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 400px;
    }

    .title {
      font-size: 22px;
      font-weight: 700;
    }
  }

  .tabs {
    // padding: ;
    // width: 100%;
    // color: #fff;
    background-color: #c1c0e3;

    .tab {
      width: 100%;
      margin: 0 20px;

      .course_comment {
        .comment_percentage {
          font-size: 18px;
          font-weight: 700;
        }

        .comment_tab {
          .tab_list {
            display: flex;
            align-items: center;

            .tab_item {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 90px;
              height: 40px;
              margin: 20px;
              cursor: pointer;
            }

            .active {
              border-radius: 10px;
              color: #407def;
              font-weight: 700;
              background-color: #ebf3fe;
            }
          }
        }

        .show_info {
          border-top: 1px solid #ccc;
          .show_item {
            .empty {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
              margin: 0 auto;
              margin-top: 80px;

              img {
                width: 240px;
                height: 160px;
              }
            }
          }
        }
      }
    }

    .tab2 {
      width: 100%;
      // margin: 0 200px;

      .item {
        background-color: #f5f8fb;
        padding: 16px 20px;
        margin: 30px;
        border-radius: 12px;
      }

      .course_title {
        display: flex;
        justify-content: space-between;
        font-size: 16px;

        .title_left {
          display: flex;
          align-items: center;

          .span {
            margin-left: 20px;
          }
        }
      }

      .time {
        margin-left: 34px;
        margin-top: 14px;
      }
    }

    .tab1 {
      width: 100%;

      img {
        width: 100%;
      }
    }
  }
}

:deep(.ant-tabs-nav) {
  width: 100%;
  .ant-tabs-nav-wrap {
    display: flex;
    width: 100%;
    // width: 400px;

    .ant-tabs-nav-list {
      .ant-tabs-tab {
        margin: 0 20px;
      }
    }
  }
}

:deep(.ant-tabs-content-holder) {
  min-height: 530px;
}

:deep(.ant-tabs-content) {
  width: 100%;
  padding: 0 200px;
}

:deep(.ant-collapse) {
  margin: 0 28px;
  border: none;
  background-color: #fff;
  .ant-collapse-item {
    margin-bottom: 20px;
    background-color: #f5f8fb;
    padding: 4px 0;
    border: none;
    // margin: 30px;
    border-radius: 12px;
    .ant-collapse-content {
      .ant-collapse-content-box {
        background-color: #f5f8fb;
      }
    }
  }
}
</style>
