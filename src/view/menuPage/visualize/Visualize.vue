<template>
  <div class="visualize">
    <div class="hot_news">
      <!-- <div class="item_news"></div> -->
      <item-hot-new />
      <item-hot-new />
      <item-hot-new />
    </div>
    <div class="right">
      <div class="pie_chart"></div>
      <div class="bar_chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import { ECharts, init } from "echarts"
type EChartsOption = echarts.EChartsOption
// @ts-ignore
import { getClistData } from "../../../service/visualize/visualizeApi.ts"
import useVisualStore from "@/stores/modules/visualize"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"

import { handelArrDate, pieChartHandel, stringArrHandel } from "@/utils/dataHandle"
import ItemHotNew from "@/components/ItemHotNew.vue"

const params = {
  fid: "f62",
  po: "1",
  pz: "1",
  pn: "1",
  np: "2",
  fltt: "2",
  invt: "2",
  ut: "b2884a393a59ad64002292a3e90d46a5",
  fs: "m:90 t:2",
  fields: "f12,f14,f2,f3,f62,f184,f66,f69,f72,f75,f78,f81,f84,f87,f204,f205,f124,f1,f13"
}

const northParams = {
  sortColumns: "HOLD_DATE",
  sortTypes: "-1",
  pageSize: "50",
  pageNumber: "5",
  columns: "ALL",
  source: "WEB",
  client: "WEB",
  reportName: "RPT_MUTUAL_MARKET_STA"
}

const upIndexParams = {
  lmt: "0",
  klt: "101",
  fields1: "f1,f2,f3,f7",
  fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65",
  ut: "b2884a393a59ad64002292a3e90d46a5",
  secid: "1.000001"
}

const gemBoardParams = {
  lmt: "0",
  klt: "101",
  fields1: "f1,f2,f3,f7",
  fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65",
  ut: "b2884a393a59ad64002292a3e90d46a5",
  secid: "0.399006"
}

const usIndexParams = {
  lmt: "0",
  klt: "101",
  fields1: "f1,f2,f3,f7",
  fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65",
  ut: "b2884a393a59ad64002292a3e90d46a5",
  secid: "105.NDAQ"
}

const deepIndexParams = {
  lmt: "0",
  klt: "101",
  fields1: "f1,f2,f3,f7",
  fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65",
  ut: "b2884a393a59ad64002292a3e90d46a5",
  secid: "0.399001"
}

const visualStore = useVisualStore()
// visualStore.fetchGetVisualData(params)

visualStore.fetchNorthWardData(northParams)

// 可视化操作
onMounted(async () => {
  // 定义可视化渲染元素
  const pieEle = document.querySelector(".pie_chart") as HTMLElement
  const charEch: ECharts = init(pieEle)
  const curEle = document.querySelector(".bar_chart") as HTMLElement
  const barEle: ECharts = init(curEle)

  // 加载动画开始
  charEch.showLoading()
  barEle.showLoading()

  // 发送网络请求获取数据
  await visualStore.fetchGetVisualData(params)
  await visualStore.fetchGetUpIndexData(upIndexParams)
  await visualStore.fetchGetUpIndexData(gemBoardParams)
  await visualStore.fetchGetUpIndexData(usIndexParams)
  await visualStore.fetchGetUpIndexData(deepIndexParams)

  const { northward, visualData, upIndex, gemBoard, usIndex, deepIndex } = storeToRefs(visualStore)
  const cur = northward.value.data
  const north = cur[cur.length - 1]

  // 加载动画结束
  charEch.hideLoading()
  barEle.hideLoading()

  // 数据处理相关
  const pieArr = pieChartHandel(visualData?.value?.diff)
  console.log(pieArr)
  const up = stringArrHandel(upIndex.value.klines)
  const gem = stringArrHandel(gemBoard.value.klines)
  const us = stringArrHandel(usIndex.value.klines)
  const deep = stringArrHandel(deepIndex.value.klines)
  const resArr = [Number(north.ADD_MARKET_CAP), up, gem, us, deep]
  console.log(resArr)

  // 可视化相关
  // 饼状图渲染
  const option: EChartsOption = {
    title: {
      text: "板块资金流",
      subtext: "排名前六",
      left: "center"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "vertical",
      left: "left"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: pieArr,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  }
  // @ts-ignore
  charEch.setOption(option)

  // 柱状图渲染
  const barOption = {
    title: {
      text: "净流入",
      subtext: handelArrDate(upIndex.value.klines)
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      formatter: function (params: any) {
        var tar = params[1]
        return tar.name + "<br/>" + tar.seriesName + " : " + tar.value
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      splitLine: { show: false },
      data: ["北向资金", "上证指数", "创业板指数", "纳斯达克指数", "深证指数"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "Life Cost",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          position: "inside"
        },
        barWidth: "30%",
        data: resArr
      }
    ]
  }
  // @ts-ignore
  barEle.setOption(barOption)
})
</script>

<style lang="less" scoped>
.visualize {
  display: flex;
  width: 1170px;
  padding: 20px;
  background-color: #fff;
  // background-color: rgba(0, 0, 0, 0.5);

  .hot_news {
    width: 300px;
    height: 600px;
    margin-right: 10px;
  }
  .right {
    flex: 1;
    // background-color: aqua;
    .pie_chart,
    .bar_chart {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
