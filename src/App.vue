<script setup lang="ts">
import { ref } from "vue"
import zhCN from "ant-design-vue/es/locale/zh_CN"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
dayjs.locale("zh-cn")
const locale = ref(zhCN)
</script>

<template>
  <!--  国际化配置-->
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<style lang="less">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
#app {
  width: 100vw;
  height: 100vh;
}

/deep/ input {
  background: transparent !important;
}

/deep/ .ant-input {
  background: transparent !important;
  color: #fff !important;
  border-radius: 10px;
}

/deep/ input:-internal-autofill-selected {
  appearance: menulist-button;
  background-image: none !important;
  background-color: transparent !important;
  color: fieldtext !important;
}

// 全局配置antd消息提示框
.ant-message-notice {
  position: relative;
  top: 180px;
}
.ant-message-notice-content {
  color: #fff;
  background-color: #dc8adf !important;
}

.anticon {
  color: #fff !important;
}
</style>
