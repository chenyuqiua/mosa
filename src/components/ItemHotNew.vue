<template>
  <div class="item_hot">
    <div class="wrapper">
      <div class="btn_wrapper">
        <div class="btn">+ 关注</div>
      </div>
      <div class="text">
        <div class="title">人脑工程</div>
        <div class="span">我国脑机接口全产业链成型 应用场景探索逐渐深入</div>
      </div>
      <div class="info">
        <div class="item_info">
          <span class="name">中科信息 </span>
          <span class="data">20.01%</span>
        </div>
        <div class="item_info">
          <span class="name">冠昊生物 </span>
          <span class="data">19.99%</span>
        </div>
      </div>
    </div>
    <div class="cover"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.item_hot {
  position: relative;
  width: 300px;
  height: 190px;
  padding: 10px;
  margin-bottom: 10px;
  color: #fff;
  background: url("https://img95.699pic.com/photo/50067/4648.jpg_wh860.jpg") no-repeat;
  background-size: 300px 190px;

  .wrapper {
    z-index: 1;
    position: relative;

    .btn_wrapper {
      height: 60px;

      .btn {
        position: absolute;
        z-index: 2;
        top: 10px;
        right: 10px;
        padding: 1px 6px;
        border-radius: 15px;
        color: #e368e5;
        font-size: 12px;
        background-color: #fff;
        cursor: pointer;
      }
    }

    .text {
      .title {
        font-size: 20px;
      }
    }

    .info {
      display: flex;
      align-items: center;
      margin-top: 10px;
      font-size: 12px;

      .item_info {
        margin-right: 5px;
        padding: 0 6px;
        border-radius: 2px;
        color: #333;
        background-color: #fff;

        .data {
          color: red;
          font-weight: 700;
        }
      }
    }
  }

  .cover {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>
