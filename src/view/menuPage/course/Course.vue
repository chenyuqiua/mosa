<template>
  <div class="course">
    <div class="control" v-if="currentBtn >= 0">
      <div class="cotrol_wrapper">
        <template v-for="(item, index) in btnNames">
          <div
            class="btn_item"
            :class="{ active: currentBtn === index }"
            @click="handelBtnClick(index)"
          >
            {{ item }}
          </div>
        </template>
      </div>
    </div>
    <div class="back_wrapper" @click="handelBackBtn" v-else><left-outlined />返回</div>

    <div class="course_wrapper">
      <template v-if="currentBtn === 0" v-for="(item, index) in freeCourse" :key="item.id">
        <div class="course_item">
          <div class="container-box-course" @click="courseClick(1)">
            <div class="item_parent">
              <div>{{ item?.name }}</div>
              <div>课程介绍</div>
              <div>{{ item?.course_text }}</div>
              <div class="course_money">
                <div class="price">¥ {{ item?.course_money }}</div>
                <div class="grade">{{ getLevel(item?.course_level) }}</div>
              </div>
              <div class="btns">
                <!-- <div> -->
                <a-button
                  style="
                    position: relative;
                    z-index: 2;
                    background: #808080;
                    color: #fff;
                    outline: none;
                    border-color: transparent;
                  "
                >
                  {{ item.free_text }}</a-button
                >
                <!-- </div> -->
                <a-button
                  style="
                    background: rgb(227, 104, 229);
                    color: #fff;
                    outline: none;
                    border-color: transparent;
                    margin-left: 50px;
                  "
                  >更多详情 More details</a-button
                >
              </div>
            </div>
          </div>
          <div class="cover" v-if="userInfo.vip_level < item?.course_level">
            <div class="tip"><lock-outlined /> {{ getLevel(item?.course_level) }}等级解锁</div>
          </div>
        </div>
      </template>

      <template v-if="currentBtn === 1" v-for="(item, index) in upgradeCourse" :key="item.id">
        <div class="course_item">
          <div class="container-box-course" @click="courseClick(1)">
            <div class="item_parent">
              <div>{{ item?.name }}</div>
              <div>课程介绍</div>
              <div>{{ item?.course_text }}</div>
              <div class="course_money">
                <div class="price">¥ {{ item?.course_money }}</div>
                <div class="grade">{{ getLevel(item?.course_level) }}</div>
              </div>
              <div class="btns">
                <!-- <div> -->
                <a-button
                  style="
                    position: relative;
                    z-index: 2;
                    background: #808080;
                    color: #fff;
                    outline: none;
                    border-color: transparent;
                  "
                  >{{ item.free_text }}</a-button
                >
                <!-- </div> -->
                <a-button
                  style="
                    background: rgb(227, 104, 229);
                    color: #fff;
                    outline: none;
                    border-color: transparent;
                    margin-left: 50px;
                  "
                  >更多详情 More details</a-button
                >
              </div>
            </div>
          </div>
          <div class="cover" v-if="userInfo.vip_level < item?.course_level">
            <div class="tip"><lock-outlined /> {{ getLevel(item?.course_level) }}等级解锁</div>
          </div>
        </div>
      </template>

      <template v-if="currentBtn === 2" v-for="(item, index) in unlockCourse" :key="item.id">
        <div class="course_item">
          <div class="container-box-course" @click="courseClick(1)">
            <div class="item_parent">
              <div>{{ item?.name }}</div>
              <div>课程介绍</div>
              <div>{{ item?.course_text }}</div>
              <div class="course_money">
                <div class="price">¥ {{ item?.course_money }}</div>
                <div class="grade">{{ getLevel(item?.course_level) }}</div>
              </div>
              <div class="btns">
                <!-- <div> -->
                <a-button
                  style="
                    position: relative;
                    z-index: 2;
                    background: #808080;
                    color: #fff;
                    outline: none;
                    border-color: transparent;
                  "
                  >{{ item.free_text }}</a-button
                >
                <!-- </div> -->
                <a-button
                  style="
                    background: rgb(227, 104, 229);
                    color: #fff;
                    outline: none;
                    border-color: transparent;
                    margin-left: 50px;
                  "
                  >更多详情 More details</a-button
                >
              </div>
            </div>
          </div>
          <div class="cover" v-if="userInfo.vip_level < item?.course_level">
            <div class="tip"><lock-outlined /> {{ getLevel(item?.course_level) }}等级解锁</div>
          </div>
        </div>
      </template>

      <template v-if="currentBtn === -1">
        <course-detail />
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { ref } from "vue"

import { LockOutlined } from "@ant-design/icons-vue"
import { localCache } from "@/utils/cache"
import useUserStore from "@/stores/modules/user"
import { courseData } from "@/assets/data/mockCourse"
import { getLevel } from "@/utils/getLevel"
import CourseDetail from "./c-cpns/CourseDetail.vue"
import { LeftOutlined } from "@ant-design/icons-vue"

// 获取数据
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
if (!userInfo.value.coin) {
  userInfo.value = localCache.getCache("userInfo")
}
const router = useRouter()

// 事件监听
function courseClick(id: number) {
  // router.push(`/detail/${id}`)
  currentBtn.value = -1
}

// 导航栏控制
const btnNames = ["免费", "进阶", "已解锁"]
const currentBtn = ref(0)
// 导航栏控制点击事件
const preCurBtn = ref(0)
function handelBtnClick(index: number) {
  currentBtn.value = index
  preCurBtn.value = currentBtn.value
}
// 退出课程详情监听事件
function handelBackBtn() {
  currentBtn.value = preCurBtn.value
}

// 课程数据处理
const sortData = courseData.sort((item1, item2) => {
  return item1.course_level - item2.course_level
})
// 免费课程
const freeCourse = sortData.filter((item) => {
  return item.course_money === "免费课程"
})
// 进阶课程
const upgradeCourse = sortData.filter((item) => {
  return item.course_money !== "免费课程"
})
// 解锁课程
const unlockCourse = sortData.filter((item) => {
  return item.course_level <= userInfo.value.vip_level
})
</script>
<style lang="less">
.course {
  width: 100%;
  margin-bottom: 20px;

  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-display: 700px;
    font-size: 16px;

    .cotrol_wrapper {
      display: flex;
      width: 200px;
      justify-content: space-between;

      .btn_item {
        cursor: pointer;

        &.active {
          color: rgb(227, 104, 229);
        }
      }
    }
  }

  .back_wrapper {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
}

.ant-card-head {
  background: rgb(12, 10, 23);
  color: #fff;
}
.ant-card-bordered {
  border: rgb(12, 10, 23);
  color: #fff;
}
.ant-card-body {
  background: rgb(12, 10, 23);
  color: #fff;
}
.container-box-course {
  background: url("/static/img/课程页.png");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 300px;
  width: 600px;
  border-radius: 20px;
  color: #fff;
}

.course_wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .course_item {
    position: relative;
    width: 48%;
    margin-top: 20px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;

    .item_parent {
      padding: 50px;
      position: relative;
    }

    .course_money {
      position: absolute;
      top: 180px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 485px;

      .price {
        font-size: 18px;
      }

      .grade {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }

    .btns {
      display: flex;
      position: absolute;
      top: 246px;
      left: 100px;
    }

    .cover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.6);
      cursor: pointer;

      .tip {
        font-size: 22px;
      }
    }
  }
}
</style>
