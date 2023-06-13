<template>
  <div class="iframe-container">
    <div class="iframe-content" v-if="!isPage&&!isModel">
      <div style="width: 100%">
        <span> 标题：{{ title }} </span>
        {{kind}}
        <a-button
          @click="jumpPage"
          type="primary"
          style="float: right; margin: 5px"
        >
          跳转</a-button
        >
      </div>
      <iframe :src="url" class="iframe-box"></iframe>
    </div>
    <div class="iframe-content" v-else-if="!isModel">
      <UserTable></UserTable>
    </div>
    <div class="iframe-content" v-else>
      <ChatTable></ChatTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import UserTable from "../chatModel/UserTable.vue";
import ChatTable from "../chatModel/ChatTable.vue";

import {computed} from 'vue'
// @ts-ignore
const props = defineProps<{
  url: string;
  title: string;
  kind: string;
}>();

const isPage=computed(()=>{
  console.log('props',props)
  return props.kind=='page'
})

const isModel=computed(()=>{
  console.log('props',props)
  return props.kind=='model'
})

const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();
const jumpPage = () => {
  window.open(props.url);
};
</script>
<style>
.iframe-container {
  width: 100%;
  height: 100%;
}
.iframe-content {
  width: 100%;
  height: 100%;
}
.iframe-box {
  outline: none !important;
  border: none;
  width: 100%;
  height: 100%;
}
</style>
