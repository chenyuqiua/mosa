<template>
  <div>
    <div
      style="
        position: relative;
        width: 100%;
        height: 466px;
        margin-bottom: 10px;
        overflow: hidden;
        max-height: 600px;
        border-radius: 20px;
        box-sizing: border-box;
      "
    >
      <img
        src="/static/img/简介页海报.png"
        style="
          position: relative;
          width: 100%;

          background-repeat: no-repeat;
          border-radius: 20px;
          /* transform: scale(1.2) translateY(-260px); */
          display: inline-block;
          filter: blur(1px);
        "
      />
      <div class="image-span">
        <div>Metadata Open</div>
        <div>Space-time Analsis System</div>
        <div>元数据时空分析系统</div>
      </div>
    </div>
    <div style="display: flex; padding: 5px 0">
      <div style="flex: 1; border-radius: 20px; overflow: hidden">
        <a-card title="新闻 News" style="">
          <!-- <template #extra><a href="#">more</a></template> -->
          <div class="item_new">
            <div class="new_title">
              世界级的系统稳定性和数据安全性, 自动监控扩容, 确保24小时正常运营不不不
            </div>
            <div class="new_date">28/2/2023</div>
          </div>
          <div class="item_new">
            <div class="new_title">
              世界级的系统稳定性和数据安全性, 自动监控扩容, 确保24小时正常运营不不不
            </div>
            <div class="new_date">28/2/2023</div>
          </div>
          <div class="item_new">
            <div class="new_title">
              世界级的系统稳定性和数据安全性, 自动监控扩容, 确保24小时正常运营不不不
            </div>
            <div class="new_date">28/2/2023</div>
          </div>
        </a-card>
      </div>
      <div style="width: 20px"></div>
      <!-- <div style="width: 50%"> -->
      <!-- <a-card title="Default size card" style="border-radius: 20px">
          <template #extra><a href="#">more</a></template>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card> -->
      <div class="account">
        <div class="title">累计充值 Balance<more-outlined style="cursor: pointer" /></div>
        <div class="price">$ {{ userInfo.total_charge_money * 10 || 0 }}</div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import useUserStore from "@/stores/modules/user"
import { localCache } from "@/utils/cache"
import { MoreOutlined } from "@ant-design/icons-vue"
import { storeToRefs } from "pinia"

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
if (!userInfo.value.coin) {
  userInfo.value = localCache.getCache("userInfo")
}
</script>
<style lang="less">
.ant-card-head {
  background: rgb(12, 10, 23);
  color: #fff;

  .ant-card-head-title {
    padding-bottom: 0;
  }
}
.ant-card-bordered {
  border: rgb(12, 10, 23);
  color: #fff;
}
.ant-card-body {
  padding-top: 0;
  background: rgb(12, 10, 23);
  color: #fff;
}

.image-span {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  font-size: 60px;
}

.item_new {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  color: #bbb;
  font-size: 12px;

  .new_title {
    width: 380px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}

.account {
  position: relative;
  width: 320px;
  height: 218px;
  padding: 20px;
  border-radius: 20px;
  color: #fff;
  font-size: 18px;
  overflow: hidden;
  background-image: linear-gradient(#dc8adf, #c1c0e3);

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-weight: 700;
    font-size: 32px;
  }
}
</style>
