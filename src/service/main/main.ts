import { url } from "inspector"
import hyRequest from ".."

// 获取视频列表
export const getVideoApi: any = (catalog: string, page: number, size: number) => {
  return hyRequest.post({
    url: "/api/video/list",
    data: {
      catalog,
      page,
      size
    }
  })
}

// 创建订单
export const createOrder: any = (params: any) => {
  return hyRequest.post({
    url: "/api/order/create",
    data: params
  })
}

// 生成支付链接
export const createGenerateLink: any = (params: any) => {
  return hyRequest.post({
    url: "/api/payment/create",
    data: params
  })
}

// 获取订单状态
export const selectOrderInfo: any = (params: any) => {
  return hyRequest.post({
    url: "/api/order/query",
    data: {
      order_id: params
    }
  })
}

// 获取股票价格
export const getStockPrice: any = (stock: string) => {
  return hyRequest.get({
    url: "/api/stock/price",
    params: {
      stock
    }
  })
}

// 获取股票分析
export const getAnalysisRes: any = (stock: string) => {
  return hyRequest.get({
    url: "/api/stock/analysis",
    params: {
      stock
    }
  })
}

// 获取标记
export const createMark: any = (params: any) => {
  return hyRequest.post({
    url: "/api/mark/create",
    data: params
  })
}

// 获取订单状态
export const queryOrderStatus: any = (params: any) => {
  return hyRequest.post({
    url: "/api/order/query",
    data: {
      order_id: params
    }
  })
}
