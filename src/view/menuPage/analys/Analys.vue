<template>
  <div class="course">
    <a-card :title="showStr" style="border-radius: 20px">
      <!-- <template #extra><a href="#">more</a></template> -->

      <div class="card_wrapper">
        <div class="card">
          <div class="top">
            <div class="title top_info">
              <div class="span">天气价格查询 Price Inquiry</div>
              <div class="show-res">
                <div class="left">
                  <div class="base">成本 Base</div>
                </div>
                <div class="right">
                  <input class="base_input" type="text" v-model="baseInput" placeholder="请输入" />
                </div>
              </div>
            </div>
            <div class="info top_info">
              <div class="span">输入天气编号或名称查询和分析天气信息</div>
              <div class="show-res">
                <div class="left">
                  <a-checkbox v-model:checked="isCheck" style="margin-right: 10px"></a-checkbox>
                  已知
                </div>
                <div class="right right_text"><lock-outlined /> {{ matchRes }}</div>
              </div>
            </div>
          </div>

          <div class="main">
            <div class="first_order">
              <input class="first_input" type="text" v-model="firstOrder" />
              <search-outlined class="search_icon" @click="getBasicDataClick" />
              <div class="first_res">{{ firstRes }}</div>
            </div>
          </div>

          <div class="analyse">
            <div class="a_btn" @click="getAnalyseDataClick">分析 Analyze</div>
            <div class="line"></div>
            <div class="a_res">
              <div class="item_wrapper">
                key
                <div class="res_item">{{ aRes1 }}</div>
              </div>
              <div class="item_wrapper">
                z1
                <div class="res_item">{{ aRes2 }}</div>
              </div>
              <div class="item_wrapper">
                z2
                <div class="res_item">{{ aRes3 }}</div>
              </div>
              <div class="item_wrapper">
                z3
                <div class="res_item">{{ aRes4 }}</div>
              </div>
            </div>
          </div>

          <div class="track" @click="trackInfoClick">追踪 Track</div>

          <div class="clear" @click="clearClcik">清空 clear</div>
        </div>

        <div class="card">
          <div class="top">
            <div class="title top_info">
              <div class="span">天气价格查询 Price Inquiry</div>
              <div class="show-res">
                <div class="left"><message-outlined /> 已知</div>
                <div class="right"><lock-outlined /> 未匹配</div>
              </div>
            </div>
            <div class="info top_info">
              <div class="span">输入天气编号或名称查询和分析天气信息</div>
              <div class="show-res">
                <div class="left"><message-outlined /> 已知</div>
                <div class="right"><lock-outlined /> 未匹配</div>
              </div>
            </div>
          </div>

          <div class="main">
            <div class="first_order">
              <input class="first_input" type="text" />
              <search-outlined class="search_icon" />
              <div class="first_res"></div>
            </div>
          </div>

          <div class="analyse">
            <div class="a_btn">分析 Analyze</div>
            <div class="line"></div>
            <div class="a_res">
              <div class="res_item"></div>
              <div class="res_item"></div>
              <div class="res_item"></div>
              <div class="res_item"></div>
            </div>
          </div>

          <div class="track">追踪 Track</div>

          <div class="cover" v-if="userInfo.vip_level < 1">
            <div class="tip"><lock-outlined /> M等级解锁</div>
          </div>
        </div>

        <div class="card">
          <div class="top">
            <div class="title top_info">
              <div class="span">天气价格查询 Price Inquiry</div>
              <div class="show-res">
                <div class="left"><message-outlined /> 已知</div>
                <div class="right"><lock-outlined /> 未匹配</div>
              </div>
            </div>
            <div class="info top_info">
              <div class="span">输入天气编号或名称查询和分析天气信息</div>
              <div class="show-res">
                <div class="left"><message-outlined /> 已知</div>
                <div class="right"><lock-outlined /> 未匹配</div>
              </div>
            </div>
          </div>

          <div class="main">
            <div class="first_order">
              <input class="first_input" type="text" />
              <search-outlined class="search_icon" />
              <div class="first_res"></div>
            </div>
          </div>

          <div class="analyse">
            <div class="a_btn">分析 Analyze</div>
            <div class="line"></div>
            <div class="a_res">
              <div class="res_item"></div>
              <div class="res_item"></div>
              <div class="res_item"></div>
              <div class="res_item"></div>
            </div>
          </div>

          <div class="track">追踪 Track</div>

          <div class="cover" v-if="userInfo.vip_level < 2">
            <div class="tip"><lock-outlined /> O等级解锁</div>
          </div>
        </div>

        <div class="card">
          <div class="top">
            <div class="title top_info">
              <div class="span">天气价格查询 Price Inquiry</div>
              <div class="show-res">
                <div class="left"><message-outlined /> 已知</div>
                <div class="right"><lock-outlined /> 未匹配</div>
              </div>
            </div>
            <div class="info top_info">
              <div class="span">输入天气编号或名称查询和分析天气信息</div>
              <div class="show-res">
                <div class="left"><message-outlined /> 已知</div>
                <div class="right"><lock-outlined /> 未匹配</div>
              </div>
            </div>
          </div>

          <div class="main">
            <div class="first_order">
              <input class="first_input" type="text" />
              <search-outlined class="search_icon" />
              <div class="first_res"></div>
            </div>
          </div>

          <div class="analyse">
            <div class="a_btn">分析 Analyze</div>
            <div class="line"></div>
            <div class="a_res">
              <div class="res_item"></div>
              <div class="res_item"></div>
              <div class="res_item"></div>
              <div class="res_item"></div>
            </div>
          </div>

          <div class="track">追踪 Track</div>

          <div class="cover" v-if="userInfo.vip_level < 3">
            <div class="tip"><lock-outlined /> S等级解锁</div>
          </div>
        </div>

        <div class="card">
          <div class="top">
            <div class="title top_info">
              <div class="span">天气价格查询 Price Inquiry</div>
              <div class="show-res">
                <div class="left"><message-outlined /> 已知</div>
                <div class="right"><lock-outlined /> 未匹配</div>
              </div>
            </div>
            <div class="info top_info">
              <div class="span">输入天气编号或名称查询和分析天气信息</div>
              <div class="show-res">
                <div class="left"><message-outlined /> 已知</div>
                <div class="right"><lock-outlined /> 未匹配</div>
              </div>
            </div>
          </div>

          <div class="main">
            <div class="first_order">
              <input class="first_input" type="text" />
              <search-outlined class="search_icon" />
              <div class="first_res"></div>
            </div>
          </div>

          <div class="analyse">
            <div class="a_btn">分析 Analyze</div>
            <div class="line"></div>
            <div class="a_res">
              <div class="res_item"></div>
              <div class="res_item"></div>
              <div class="res_item"></div>
              <div class="res_item"></div>
            </div>
          </div>

          <div class="track">追踪 Track</div>

          <div class="cover" v-if="userInfo.vip_level < 4">
            <div class="tip"><lock-outlined /> A等级解锁</div>
          </div>
        </div>

        <div class="placeholder"></div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
// import { defineComponent } from "vue"
import { localCache } from "@/utils/cache"
import { MessageOutlined, LockOutlined, SearchOutlined } from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import { ref } from "vue"
import useMainStore from "@/stores/modules/main"
import { storeToRefs } from "pinia"
import useUserStore from "@/stores/modules/user"

// 获取路由
const store = useMainStore()

// 数据绑定相关
let localFirstOrder = localCache.getCache("firstOrder")
let firstOrder = localFirstOrder ? ref(localFirstOrder) : ref() // 1框请求
let localFirstRes = localCache.getCache("firstRes")
let firstRes = localFirstRes ? ref(localFirstRes) : ref() // 1框结果
let aRes1 = localCache.getCache("aRes1") ? ref(localCache.getCache("aRes1")) : ref() // 2框结果
let aRes2 = localCache.getCache("aRes2") ? ref(localCache.getCache("aRes2")) : ref() // 2框结果
let aRes3 = localCache.getCache("aRes3") ? ref(localCache.getCache("aRes3")) : ref() // 2框结果
let aRes4 = localCache.getCache("aRes4") ? ref(localCache.getCache("aRes4")) : ref() // 2框结果
let localMatchRes = localCache.getCache("matchRes")
let matchRes = localMatchRes ? ref(localMatchRes) : ref() // 3框结果
let isCheck = ref() // 勾选框
let baseInput = ref<any>()

// 获取当前用户信息
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
if (!userInfo.value.coin) {
  userInfo.value = localCache.getCache("userInfo")
}

// 发送网络请求
userStore.fetchGetUserUsage()
const { usageInfo } = storeToRefs(userStore)

// 系统赠送次数显示拼接
let showStr = `系统赠送次数: ${usageInfo?.value[0]?.limit}/${usageInfo?.value[0]?.usage}`

// 事件监听相关
// 获取价格点击
async function getBasicDataClick() {
  console.log(firstOrder.value)
  if (!firstOrder.value) return message.warning("请输入查询关键词")

  await store.fetchGetStockPriceAction(firstOrder.value)
  const { getRes } = storeToRefs(store)
  if (getRes.value) {
    firstRes.value = getRes.value.price
    localCache.setCache("firstOrder", firstOrder.value)
    localCache.setCache("firstRes", firstRes.value)
  }
}

// 分析按钮点击事件
async function getAnalyseDataClick() {
  if (!firstOrder.value) return message.warning("请先搜索再进行分析")

  // 发送网络请求 获取使用量信息
  await userStore.fetchGetUserUsage()
  const { usageInfo } = storeToRefs(userStore)
  if (usageInfo.value[0].usage >= usageInfo.value[0].limit && userInfo.value.coin < 1) {
    message.warning("您的免费次数和积分不足, 请充值再使用!")
    return
  }

  await store.fetchGetAnalysisAction(firstOrder.value)
  const { aRes } = storeToRefs(store)
  // 更新用户信息
  await userStore.fetchgetLoginUserInfo()
  let res = (parseFloat(aRes.value.w1) + parseFloat(aRes.value.w2)) / 2
  aRes1.value = res
  aRes2.value = aRes.value.z1
  aRes3.value = aRes.value.z2
  aRes4.value = aRes.value.z3
  localCache.setCache("aRes1", aRes1.value)
  localCache.setCache("aRes2", aRes2.value)
  localCache.setCache("aRes3", aRes3.value)
  localCache.setCache("aRes4", aRes4.value)
}

// 追踪信息点击事件
async function trackInfoClick() {
  if (!firstOrder.value || !aRes1.value) {
    return message.error("请先进行分析再追踪")
  }

  // 发送网络请求 获取使用量信息
  await userStore.fetchGetUserUsage()
  const { usageInfo } = storeToRefs(userStore)
  if (usageInfo.value[0].usage >= usageInfo.value[0].limit && userInfo.value.coin < 1) {
    message.warning("您的免费次数和积分不足, 请充值再使用!")
    return
  }

  // 创建标记
  const mark = localCache.getCache("mark")
  const info = {
    mark
  }
  await store.fetchCreateMark(info)

  // 更新用户信息
  await userStore.fetchgetLoginUserInfo()

  // 判断是否匹配
  switch (firstOrder.value) {
    case aRes1.value:
      matchRes.value = "时空重合"
      break
    case aRes2.value:
      matchRes.value = "时空重合"
      break
    case aRes3.value:
      matchRes.value = "时空重合"
      break
    case aRes4.value:
      matchRes.value = "时空重合"
      break
    default:
      matchRes.value = "未匹配"
  }
  localCache.setCache("matchRes", matchRes.value)
}

// 清空按钮点击事件
function clearClcik() {
  localCache.removeCache("firstOrder")
  localCache.removeCache("firstRes")
  localCache.removeCache("aRes1")
  localCache.removeCache("aRes2")
  localCache.removeCache("aRes3")
  localCache.removeCache("aRes4")
  localCache.removeCache("mark")
  localCache.removeCache("matchRes")

  firstOrder.value = ""
  firstRes.value = ""
  aRes1.value = ""
  aRes2.value = ""
  aRes3.value = ""
  aRes4.value = ""
  matchRes.value = ""
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

.course {
  input {
    border: none;
    outline: none;
    background-color: #2f303b;
  }
  .card_wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .placeholder {
      width: 500px;
    }

    .card {
      position: relative;
      width: 500px;
      // height: 450px;
      padding: 10px;
      border-radius: 15px;
      border-top-right-radius: 0;
      background-color: #272735;
      margin-bottom: 60px;

      .top {
        margin-bottom: 30px;
        font-size: 12px;

        .title {
          font-size: 16px;
          margin-bottom: 8px;
        }

        .top_info {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .show-res {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 210px;
            font-size: 12px;

            .left {
              right: 4px;
              color: #ccc;
              display: flex;
              align-items: center;

              .base {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 28px;
                background-color: #d46fde;
                border-radius: 6px;
                color: #fff;
                cursor: pointer;
              }
            }

            .right {
              color: #e368e5;

              .base_input {
                width: 100px;
                height: 28px;
                padding: 0 5px;
                border-radius: 3px;
                color: #fff;
              }
            }

            .right_text {
              width: 140px;
              height: 30px;
              line-height: 30px;
              padding: 0 5px;
              border-radius: 3px;
              background-color: #2f303b;
            }
          }
        }
      }

      .main {
        .first_order {
          position: relative;
          display: flex;
          justify-content: space-between;
          margin: 20px 0;

          .first_input {
            width: 220px;
            height: 30px;
            padding: 0 5px;
            border-radius: 5px;
          }

          .search_icon {
            position: absolute;
            top: 8px;
            right: 266px;
            color: #ccc;
            cursor: pointer;
          }

          .first_res {
            width: 220px;
            height: 30px;
            padding: 0 5px;
            line-height: 30px;
            background-color: #2f303b;
            border-radius: 5px;
          }
        }
      }

      .analyse {
        position: relative;

        .a_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30px;
          margin: 40px 0;
          border-radius: 5px;
          font-size: 12px;
          cursor: pointer;
          background-color: #d46fde;
        }

        .line {
          position: absolute;
          left: -9px;
          width: 478px;
          height: 1px;
          background-color: #999;
        }

        .a_res {
          display: flex;
          justify-content: space-between;
          margin-top: 80px;

          .item_wrapper {
            display: flex;
            align-items: center;
          }

          .res_item {
            width: 90px;
            height: 30px;
            line-height: 30px;
            padding: 0 5px;
            margin-left: 6px;
            border-radius: 3px;
            background-color: #2f303b;
          }
        }
      }

      .track {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        margin-top: 40px;
        border-radius: 5px;
        margin-bottom: 20px;
        font-size: 12px;
        cursor: pointer;
        background-color: #d46fde;
      }

      .cover {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.6);
        cursor: pointer;

        .tip {
          font-size: 22px;
        }
      }

      .clear {
        position: absolute;
        top: -22px;
        right: 0;
        padding: 2px 6px;
        border-top-left-radius: 4px;
        border-top-right-radius: 15px;
        color: #ccc;
        font-size: 12px;
        background-color: #272734;
        cursor: pointer;
      }
    }
  }
}

.ant-card-head-title {
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 20px;
}
</style>
