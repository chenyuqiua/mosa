<template>
  <a-layout class="layout-container">
    <a-layout-sider
      v-model:collapsed="state.collapsed"
      :trigger="null"
      collapsible
      style="background: rgb(12, 10, 23); width: 200px"
    >
      <div class="logo" style="text-align: center">
        <img src="/static/img/Logo.png" style="width: 100px; margin-top: 10px" />
      </div>
      <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        theme="dark"
        @select="selectMenu"
      >
        <a-menu-item key="1" class="menu-item-design">
          <template #icon>
            <AppstoreOutlined />
          </template>
          简介 Introduction
        </a-menu-item>
        <a-menu-item key="2" class="menu-item-design">
          <template #icon>
            <database-outlined />
          </template>
          数据查析 Analysis
        </a-menu-item>
        <a-menu-item key="3" class="menu-item-design">
          <template #icon>
            <container-outlined />
          </template>
          课程 Course
        </a-menu-item>
        <a-menu-item key="4" class="menu-item-design">
          <template #icon>
            <fund-view-outlined />
          </template>
          链接 Link
        </a-menu-item>
        <a-menu-item key="5" class="menu-item-design">
          <template #icon>
            <rise-outlined />
          </template>
          升级 Upgrade
        </a-menu-item>
        <a-menu-item key="6" class="menu-item-design">
          <template #icon>
            <bar-chart-outlined />
          </template>
          可视化大屏 Visualize
        </a-menu-item>
      </a-menu>

      <div style="color: rgb(152, 151, 159); position: absolute; bottom: 20px; padding-left: 10px">
        <div><property-safety-outlined /> 当前等级 {{ getLevel(userInfo.vip_level) }}</div>
        <div>
          <a-progress
            :stroke-color="{
              '0%': 'rgba(227, 103, 228,0)',
              '100%': 'rgba(227, 103, 228,1)'
            }"
            :percent="100"
          />
        </div>
        <div>{{ getLevelSpan(userInfo) }}</div>
        <div style="color: rgba(227, 103, 228, 1)">去充值</div>
        <div style="height: 120px"></div>
        <div style="display: flex">
          <div>
            <a-avatar shape="square" :size="46">
              <template #icon><UserOutlined /></template>
            </a-avatar>
          </div>
          <div style="margin-left: 10px">
            <div style="color: #fff; font-weight: bold">{{ userInfo.name }}</div>
            <div>test@163.com</div>
          </div>
        </div>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-content class="layout-content-design">
        <div style="height: 80px; padding: 20px 5px; display: flex; align-items: center">
          <div style="width: 50%; padding-left: 20px">
            <a-input style="background-color: rgb(12, 10, 23) !important">
              <template #suffix>
                <search-outlined style="color: #fff" />
              </template>
            </a-input>
          </div>
          <div style="width: 50%">
            <div style="color: #fff; display: flex; justify-content: right">
              <!-- <div style="width: 40%"></div> -->
              <div style="text-align: right; display: flex; align-items: center">
                <div>剩余积分: {{ userInfo.coin }}</div>
                <AppstoreOutlined style="width: 60px; font-size: 24px" />
                <MailOutlined style="width: 60px; font-size: 24px" />
                <SettingOutlined style="width: 60px; font-size: 24px" />
              </div>
            </div>
          </div>
        </div>
        <div style="height: 40px; margin-left: 30px">
          <a-breadcrumb separator=">">
            <a-breadcrumb-item style="font-weight: bold">MOSA</a-breadcrumb-item>
            <a-breadcrumb-item>{{ showBreadcrumb }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="main-container">
          <Introduction v-if="state.menuKey === '1'" />
          <Analys v-if="state.menuKey === '2'" />
          <Course v-if="state.menuKey === '3'" />
          <Link v-if="state.menuKey === '4'" />
          <Upgrade v-if="state.menuKey === '5'" />
          <Visualize v-if="state.menuKey === '6'" />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
// import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
import {
  UserOutlined,
  FundOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  DatabaseOutlined,
  ContainerOutlined,
  FundViewOutlined,
  RiseOutlined,
  PropertySafetyOutlined,
  BarChartOutlined
} from "@ant-design/icons-vue"
// @ts-ignore
import Introduction from "../menuPage/introduction/Introduction.vue"
import Analys from "../menuPage/analys/Analys.vue"
import Course from "../menuPage/course/Course.vue"
import Link from "../menuPage/link/Link.vue"
import Upgrade from "../menuPage/upgrade/Upgrade.vue"
// @ts-ignore
import Visualize from "../menuPage/visualize/Visualize.vue"
import { reactive, computed, ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { getProductList } from "../../service/product/productApi"
import { onMounted } from "vue"
import useProductStore from "@/stores/modules/product"
import { storeToRefs } from "pinia"
import useUserStore from "@/stores/modules/user"
import { getLoginUserInfo } from "@/service/user/userApi"
import { getLevel, getLevelSpan } from "@/utils/getLevel"
import { localCache } from "@/utils/cache"
import { watch } from "fs"

//store
// const store = useStore()
const store = useProductStore()
const userStore = useUserStore()

// 发送网络请求
userStore.fetchGetUserUsage()
userStore.fetchgetLoginUserInfo()

// 获取数据
const { userInfo } = storeToRefs(userStore)
const { usageInfo } = storeToRefs(userStore)
// if (!userInfo.value.coin) {
//   userInfo.value = localCache.getCache("userInfo")
// }

const router = useRouter()
interface stateType {
  selectedKeys: Array<String>
  openKeys: Array<String>
  collapsed: Boolean
  title: string
  productList: Array<any>
  menuKey: string
}
const state: stateType = reactive({
  title: "管理平台",
  openKeys: ["virtual-assets"],
  selectedKeys: ref<string[]>(["1"]),
  collapsed: false,
  productList: [],
  menuKey: "1"
})
interface contentType {
  url: string
  title: string
  kind: string
}
const contentConfig: contentType = reactive({
  url: "",
  title: "",
  kind: ""
})

const initProductList = () => {
  getProductList()
    .then((res: any) => {
      const { data: response } = res
      if (response.code === 200) {
        state.productList = response.data
        console.log("store", store)
        // store.commit("product/setProductList", response.data)
        store.setProductListAction(response.data)
        console.log(state.productList, "data")
        const product: any = state.productList[0] || {}
        state.selectedKeys = [`${product.id}`]
        contentConfig.title = product.name
        contentConfig.url = product.url
        contentConfig.kind = product.kind
      }
    })
    .catch((r: any) => {
      console.warn(r)
    })
}

// const userInfo = computed(() => {
//   return store.state.user.userInfo
// })
// const { userInfo } = storeToRefs(userStore)

const loginOut = () => {
  router.push({
    name: "login"
  })
}

const clickMenu = (item: any) => {
  console.log("item", item)
}

//{ item, key, selectedKeys }
// key控制菜单切换, 并修改面包屑文本
let showBreadcrumb = ref<string>("简介 Introduction")
const selectMenu = (e: any) => {
  const key = e.key
  console.log("key", key)
  state.menuKey = key

  console.log(showBreadcrumb.value)
  switch (state.menuKey) {
    case "1":
      showBreadcrumb.value = "简介 Introduction"
      break
    case "2":
      showBreadcrumb.value = "数据查析 Analysis"
      break
    case "3":
      showBreadcrumb.value = "课程 Course"
      break
    case "4":
      showBreadcrumb.value = "链接 Link"
      break
    case "5":
      showBreadcrumb.value = "升级 Upgrade"
      break
    case "6":
      showBreadcrumb.value = "可视化大屏 Visualize"
      break
  }
  console.log(showBreadcrumb.value)
}
onMounted(() => {
  initProductList()
})
</script>

<style lang="less">
.layout-container {
  width: 100%;
  // height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}
.menu-item-design {
  padding-left: 10px !important;
}
.ant-menu.ant-menu-dark,
.ant-menu-dark .ant-menu-sub,
.ant-menu.ant-menu-dark .ant-menu-sub {
  background: transparent;
}
.ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: rgba(227, 104, 229, 0.2);
  color: rgb(227, 104, 229);
}

.ant-menu-dark .ant-menu-item-selected .ant-menu-item-icon,
.ant-menu-dark .ant-menu-item-selected .anticon {
  color: rgb(227, 104, 229);
}
.ant-menu-dark .ant-menu-item-selected .ant-menu-item-icon + span,
.ant-menu-dark .ant-menu-item-selected .anticon + span {
  color: rgb(227, 104, 229);
}

.ant-breadcrumb-separator {
  color: rgb(227, 104, 229) !important;
}
.ant-breadcrumb a {
  color: rgb(227, 104, 229) !important;
}
.ant-breadcrumb {
  color: rgb(227, 104, 229) !important;
}
.base-color {
  color: rgb(227, 104, 229) !important;
}
.ant-breadcrumb > span:last-child {
  color: rgb(227, 104, 229) !important;
}

.main-container {
  width: 100%;
  background: transparent;
  padding: 0 30px;
  padding-bottom: 30px;
  height: 736px; //动态计算长度值
  overflow-y: scroll;
  overflow-x: hidden;

  // 滚动条
  &::-webkit-scrollbar {
    /* 隐藏默认的滚动条 */
    -webkit-appearance: none;
  }
  &::-webkit-scrollbar:vertical {
    /* 设置垂直滚动条宽度 */
    width: 4px;
  }

  &::-webkit-scrollbar:horizontal {
    /* 设置水平滚动条厚度 */
    height: 2px;
  }

  &::-webkit-scrollbar-thumb {
    /* 滚动条的其他样式定制，注意，这个一定也要定制，否则就是一个透明的滚动条 */
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.layout-content-design {
  background-image: url("/static/img/操作页面背景底图.png");
  background-repeat: no-repeat;
  height: 100vh;
  overflow: hidden;
}

/deep/ input {
  .ant-input {
    background: transparent !important;
  }
}

/deep/ .ant-input {
  /*background: transparent !important;*/
  background-color: transparent !important;
  color: #fff !important;
  border-radius: 10px;
}

/deep/ .ant-input-affix-wrapper {
  background-color: transparent !important;
  color: #fff !important;
  border-radius: 10px;
}

.ant-input {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: #fff;
  font-size: 14px;
  line-height: 1.5715;
  background-color: transparent;
  background-image: none;
  border-color: transparent;
  transition: all 0.3s;
}

.ant-input-affix-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: transparent;
  background-image: none;
  border-color: transparent;
  border-radius: 20px;
  transition: all 0.3s;
  display: inline-flex;
}
</style>
