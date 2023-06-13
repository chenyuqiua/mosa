<template>
  <div style="width: 100%; color: #fff">
    <div class="container-box">
      <div class="text">
        <div class="title">开启升级</div>
        <div class="span">整个软件累计充值升级</div>
        <div class="span">不同的等级可以解锁功能界面分析卡位</div>
        <div class="price">费用: 0.1元/次</div>
      </div>
      <div class="form">
        <div class="count">
          <div class="form_text count_span">1.选择充值次数</div>
          <input class="count_inp" type="text" placeholder="请输入数量" v-model="count" />
        </div>
        <div class="mode">
          <div class="form_text mode_span">2.选择支付的方式</div>
          <div class="button">
            <div
              class="zfb_btn btns"
              :class="{ active: payMode === 0 }"
              @click="modeControlClick(0)"
            >
              <img class="icon" src="@/assets/img/update/zfb_logo.png" alt="" />
              支付宝
            </div>
            <div
              class="wx_btn btns"
              :class="{ active: payMode === 1 }"
              @click="modeControlClick(1)"
            >
              <img class="icon" src="@/assets/img/update/wx_logo.png" alt="" />
              微信支付
            </div>
          </div>
        </div>
        <div class="topup" @click="topUpBtnClick">点击充值</div>

        <div class="select">
          <a-checkbox v-model:checked="isArgee"></a-checkbox>
          <div class="span">阅读并同意《使用声明》</div>
        </div>
      </div>

      <!-- <div class="level_icons">
        <template v-for="(item, index) in icons" :key="item.id">
          <div class="item" :class="item.name">
            <div class="cover"></div>
            <div class="tip">
              <div>{{ item.tip1 }}</div>
              <div>{{ item.tip2 }}</div>
              <div>{{ item.tip3 }}</div>
              <div>{{ item.tip4 }}</div>
            </div>
          </div>
        </template>
      </div> -->
    </div>

    <div class="cover" v-if="isPenelShow">
      <div class="main_penel">
        <div class="title">确认订单</div>
        <div class="detail">
          <div class="">订单编号: {{ currentOrderInfo.order_id }}</div>
          <div class="">支付金额: {{ currentOrderInfo.price }}</div>
          <div class="">订单描述: {{ currentOrderInfo.title }}</div>
        </div>
        <div class="pay_tip">扫码支付</div>
        <!-- <div class="image">二维码</div> -->
        <div class="image">
          <qrcode-vue :value="store.createLinkInfo.url" :size="200" level="H" />
        </div>
        <close-outlined @click="closeBtnClick" class="close" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, reactive, ref } from "vue"
import useMainStore from "@/stores/modules/main"
import { createOrder } from "@/service/main/main"
import { message, notification } from "ant-design-vue"
import { storeToRefs } from "pinia"
import useUserStore from "@/stores/modules/user"

import icons from "@/assets/data/icons"
// @ts-ignore
import QrcodeVue from "qrcode.vue"

// ant desin图标
import { CloseOutlined } from "@ant-design/icons-vue"
import { useRoute, useRouter } from "vue-router"
import { getAssetsImages } from "@/utils/getAssetsImages"
import { localCache } from "@/utils/cache"
import { cancelOrder, successOrder, timeoutOrder } from "@/utils/notification"
import { getLevelSpanForPay } from "@/utils/getLevel"

// 动态绑定支付模式
const payMode = ref(-1)
function modeControlClick(index: number) {
  payMode.value = index
}

// 动态绑定订单信息
let title = ref("")
let count = ref<any>()
let isArgee = ref() // 是否同意

const orderInfo = computed(() => {
  title.value = `积分充值*${count.value}`
  return {
    title: title.value,
    description: "",
    product_id: 1,
    quantity: count.value
  }
})

const store = useMainStore()
const router = useRouter()
const route = useRoute()

// 支付弹窗控制
let isPenelShow = ref(false)

// 充值按钮事件监听
let timerPoll: any = null
async function topUpBtnClick() {
  if (!isArgee.value) {
    message.error("请阅读并同意使用说明!")
    return
  }

  if (orderInfo.value.quantity <= 0) {
    message.error("请输入正确的充值次数!")
    return
  }
  console.log(payMode.value)
  if (payMode.value === -1) {
    message.error("请选择支付方式")
  }

  console.log(orderInfo.value)
  // 创建支付订单
  await store.fetchCreateOrderAction(orderInfo.value)
  const { createOracleInfo } = storeToRefs(store)
  let orderId = createOracleInfo.value.order_id
  const linkInfo = {
    order_id: orderId,
    channel: payMode.value + 1
  }
  console.log(linkInfo)

  // 查询当前订单状态
  await store.fetchSelectOrderInfoAction(orderId)

  // 生成支付链接
  await store.fetchCreateGenerateLinkAction(linkInfo)
  isPenelShow.value = true

  // 轮询，查看订单状态
  timerPoll = setInterval(async () => {
    //这里查看订单详情是否为已付款状态
    store.fetchQueryOrderStatus(linkInfo.order_id)
    const { orderPayState } = storeToRefs(store)

    switch (orderPayState.value.status) {
      case 3:
        clearInterval(timerPoll)
        await userStore.fetchgetLoginUserInfo()
        const { userInfo } = storeToRefs(userStore)
        const resInfo = getLevelSpanForPay(userInfo.value, orderInfo.value.quantity)
        // successOrder(resInfo)
        message.success(resInfo)
        isPenelShow.value = false
        return
      case 4:
        // timeoutOrder()
        message.warning("订单超时")
        clearInterval(timerPoll)
        isPenelShow.value = false
        return
      case 5:
        // cancelOrder()
        message.warning("订单取消")
        clearInterval(timerPoll)
        isPenelShow.value = false
        return
    }
  }, 1000)
}

// 获取当前用户信息
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
if (!userInfo.value.coin) {
  userInfo.value = localCache.getCache("userInfo")
}

// 订单信息
const { currentOrderInfo } = storeToRefs(store)

function closeBtnClick() {
  isPenelShow.value = false
  if (clearInterval) {
    clearInterval(timerPoll)
    // cancelOrder()
    message.warning("订单取消")
  }
}
</script>

<style lang="less" scoped>
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

.container-box {
  position: relative;
  background: url("/static/img/upgrade/升级页背景图.png");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 80vh;
  border-radius: 20px;
  padding: 20px;

  .title,
  .price {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .price {
    color: rgb(227, 103, 228);
  }

  .form {
    margin-top: 26px;
    .form_text {
      margin-bottom: 20px;
    }

    .count {
      .count_inp {
        width: 320px;
        height: 40px;
        padding: 5px 10px;
        border: none;
        border-radius: 8px;
        font-size: 12px;
        background-color: rgba(47, 39, 58, 0.9);
        outline: none;
      }

      margin-bottom: 20px;
    }

    .select {
      display: flex;
      align-items: center;
      .span {
        margin-left: 10px;
      }
    }
  }

  .mode {
    .button {
      display: flex;
      align-items: center;

      .btns {
        display: flex;
        align-items: center;
        width: 100px;
        height: 40px;
        padding: 5px;
        // margin-bottom: 20px;
        box-sizing: border-box;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 1);
        cursor: pointer;

        &.active {
          border: 1px solid #d46fde;
        }
      }

      .zfb_btn {
        margin-right: 20px;
      }

      .icon {
        width: 20px;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
  }

  .topup {
    width: 120px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    border-radius: 8px;
    font-size: 12px;
    cursor: pointer;
    background-color: #d46fde;
  }

  .level_icons {
    cursor: pointer;

    .item {
      position: absolute;
      width: 180px;
      height: 180px;

      .cover {
        width: 100%;
        height: 100%;
        background-color: skyblue;
      }

      .tip {
        position: absolute;

        width: 200px;
        // height: 40px;
        line-height: 40px;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        text-align: center;
      }
    }

    .icon1 {
      top: 360px;
      right: 700px;

      .tip {
        top: -135px;
        left: 300px;
      }
    }

    // .icon2 {
    //   top: 474px;
    //   right: 500px;

    //   .tip {
    //     top: -150px;
    //     left: 35px;
    //   }
    // }

    // .icon3 {
    //   top: 310px;
    //   right: 250px;

    //   .tip {
    //     top: 14px;
    //     left: -215px;
    //   }
    // }

    // .icon4 {
    //   top: 80px;
    //   right: 160px;

    //   .tip {
    //     top: 244px;
    //     left: -305px;
    //   }
    // }
  }

  .item:hover .tip {
    display: block;
  }
}

// 支付弹窗

.cover {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  color: #333;

  .main_penel {
    position: relative;
    width: 380px;
    height: 460px;
    background-color: #fff;

    .title {
      padding: 8px;
      color: #717d8a;
      font-size: 22px;
      font-weight: 700;
      text-align: center;
    }

    .detail {
      padding: 20px;
    }

    .pay_tip {
      margin-bottom: 20px;
      font-size: 22px;
      text-align: center;
      font-weight: 700;
    }

    .image {
      display: flex;
      justify-content: center;
      margin: 0 auto;
    }

    .close {
      position: absolute;
      top: -100px;
      right: -450px;
      color: #fff;
      font-size: 40px;
      cursor: pointer;
    }
  }
}
</style>
