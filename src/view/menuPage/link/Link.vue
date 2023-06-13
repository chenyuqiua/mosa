<template>
  <div class="link">
    <div>
      <div style="color: #fff; font-weight: bold; font-size: 24px">
        专属AI宠物助理 Intelligent Pets
      </div>
      <div
        style="
          width: 100%;
          overflow: hidden;
          min-height: 300px;
          max-height: 600px;
          border-radius: 20px;
          box-sizing: border-box;
          display: flex;
        "
      >
        <!-- <div style="width: 25%; text-align: center; color: rgb(227, 104, 229)">
          <img src="/static/img/layer/1.png" />
          <div
            style="
              background: rgb(227, 104, 229);
              height: 10px;
              border-radius: 70%;
              width: 200px;
              filter: blur(5px);
              left: 20%;
              position: relative;
              margin-top: 10px;
            "
          ></div>
          <p style="margin-top: 5px">点击领取</p>
        </div> -->

        <!-- <div > -->
        <template v-for="(item, index) in petData" :key="item.id">
          <div class="pet_wrapper">
            <img class="image" :src="getAssetsImages(item.imgurl)" alt="" />
            <div v-if="index === current" class="cover"></div>
            <div
              @click="receiveClick"
              v-if="index === current"
              class="pet_btn"
              :class="{ active: index === current }"
            >
              点击领取
            </div>
            <div
              @click="petImgClick(index)"
              class=""
              :class="{ img_cover: index !== current }"
            ></div>
          </div>
        </template>
        <a-modal v-model:visible="visible" title="领取宠物" @ok="handleOk()">
          <template v-for="(item, index) in petData" :key="item.id">
            <div v-if="current === index">{{ item.info }}</div>
          </template>
        </a-modal>

        <!-- <div style="width: 25%; text-align: center">
          <img src="/static/img/layer/2.png" />
        </div>
        <div style="width: 25%; text-align: center">
          <img src="/static/img/layer/3.png" />
        </div>
        <div style="width: 25%; text-align: center">
          <img src="/static/img/layer/4.png" />
        </div> -->
      </div>
    </div>

    <!-- <div style="display: flex; padding: 5px 0">
      <div style="width: 50%">
        <a-card title="系统公告 Notice" style="border-radius: 20px">
          <template #extra><a href="#">more</a></template>
          <a-table :columns="columns" :data-source="data" :pagination="false"> </a-table>
        </a-card>
      </div>
      <div style="width: 20px"></div>
      <div style="width: 50%">
        <a-card title="排行榜 Ranking" style="border-radius: 20px">
          <template #extra><a href="#">more</a></template>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 50%">card content</div>
            <div style="width: 50%">
              <img src="/static/img/layer/5.png" />
            </div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 50%">card content</div>
            <div style="width: 50%">
              <img src="/static/img/layer/6.png" />
            </div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 50%">card content</div>
            <div style="width: 50%">
              <img src="/static/img/layer/7.png" />
            </div>
          </div>
        </a-card>
      </div>
    </div> -->

    <div class="poster">MOSA爱好者线下峰会</div>

    <div class="pat">
      <div class="pat_wrapper" v-if="petData[petResNum]">
        <img :src="getAssetsImages(petData[petResNum]?.imgurl)" alt="" @click="patDialogClick" />
        <div>点击帮助</div>
      </div>
    </div>
    <a-modal
      v-model:visible="dialogControl"
      title="帮助中心"
      :confirm-loading="confirmLoading"
      @ok="handelSubmit"
    >
      <h2>请问有什么可以帮助您的？</h2>
      <template v-for="item in showRes">
        <div class="answer_item">
          <div class="question">问: {{ item.question }}</div>
          <div class="answer">答: {{ item.answer }}</div>
        </div>
      </template>
      <input class="pat_input" v-model="patInput" placeholder="请输入您的问题" />
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue"

import { getAssetsImages } from "@/utils/getAssetsImages"
// @ts-ignore
import { petData } from "../../../../src/assets/data/petData"
import { columns, data } from "@/assets/data/analysData"
import { message } from "ant-design-vue"
import usePatGptStore from "@/stores/modules/patGpt"
import { storeToRefs } from "pinia"

// 宠物点击样式切换
let current = ref(0)
function petImgClick(index: number) {
  current.value = index
}

// 领取宠物事件
let visible = ref(false)
function receiveClick() {
  visible.value = true
}
let petResNum = ref()
// 确定按钮
function handleOk() {
  visible.value = false
  petResNum.value = current.value
  // message.success("领取成功")
  message.success(
    `领取成功！系统会不定时赠送积分，${petData[petResNum.value].name}到时会提醒您哦！`
  )
}

// gpt接口参数
const gptStore = usePatGptStore()
const params = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: "您好"
    }
  ]
}

// 宠物对话框
const dialogControl = ref<boolean>(false)
function patDialogClick() {
  dialogControl.value = true
}
const confirmLoading = ref<boolean>(false)
const showRes: any[] = reactive([])
const { gptAnswer } = storeToRefs(gptStore)
const patInput = ref()
async function handelSubmit() {
  confirmLoading.value = true
  if (patInput.value === "" || patInput.value === undefined) {
    confirmLoading.value = false
    message.warning("请输入您的问题!")
    return
  }
  await gptStore.fetchRequestGpt(params)
  showRes.push({
    question: patInput.value,
    // @ts-ignore
    answer: gptAnswer.value?.choices[0]?.message.content
  })
  patInput.value = ""
  confirmLoading.value = false
}
</script>
<style lang="less">
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

.ant-table-thead > tr > th {
  position: relative;
  color: #fff;
  font-weight: 500;
  text-align: left;
  background: rgb(12, 10, 23);
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease;
}

.ant-table-tbody > tr > td {
  border-bottom: 1px solid transparent;
  transition: background 0.3s;
}

td.ant-table-cell {
  background: rgb(12, 10, 23);
  color: #fff;
}
.ant-table-cell-row-hover {
  background: rgb(12, 10, 23) !important;
  color: #fff !important;
}

.link {
  position: relative;
  .pet_wrapper {
    position: relative;
    flex: 1;
    text-align: center;
    color: rgb(227, 104, 229);
    // background-color: rgba(0, 0, 0, 0.9);

    .cover {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 10px;
      margin-top: 10px;
      border-radius: 70%;
      background: rgb(227, 104, 229);
      filter: blur(5px);
      cursor: pointer;
    }

    .image {
      max-height: 234px;
      cursor: pointer;
    }

    .img_cover {
      position: absolute;
      top: 0;
      left: 20px;
      right: 20px;
      bottom: 16px;
      border-radius: 40px;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }

    .pet_btn {
      margin-top: 5px;
      cursor: pointer;
    }
  }

  .pet_wrapper:first-child {
    .image {
      width: 220px;
      margin-bottom: 16px;
    }
  }

  .pet_wrapper:nth-child(2) {
    .image {
      width: 230px;
      margin-bottom: 10px;
    }
  }

  .poster {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 310px;
    margin-top: 20px;
    border-radius: 25px;
    color: #fff;
    font-size: 66px;
    background-image: linear-gradient(#dc8adf, #c1c0e3);
  }

  .pat {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 120px;
    color: #fff;
    cursor: pointer;

    .pat_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    img {
      width: 100%;
    }
  }
}

.ant-modal-content {
  .pat_input {
    width: 100%;
    margin-top: 16px;
    border: 1px solid #ccc;
    box-shadow: 0, 0, 0, 0;
    outline: none;
  }

  .answer_item {
    // padding: 10px 0;
  }
}
</style>
