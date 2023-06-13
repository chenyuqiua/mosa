import { notification } from "ant-design-vue"

// 取消订单提示
export const cancelOrder = (type: string = "warning") => {
  // @ts-ignore
  notification[type]({
    message: "订单取消",
    description: "您已取消当前订单",
    onClick: () => {
      console.log("Notification Clicked!")
    },
    style: {
      backgroundColor: "rgba(220, 220, 220)",
      "font-weight": 700
    },
    duration: 4.5
  })
}

// 成功订单提示
export const successOrder = (message: string | undefined, type: string = "success") => {
  // @ts-ignore
  notification[type]({
    message: "支付成功",
    description: message,
    style: {
      backgroundColor: "rgba(220, 220, 220)",
      "font-weight": 700
    },
    duration: 4.5
  })
}

// 超时订单提示
export const timeoutOrder = (type: string = "error") => {
  // @ts-ignore
  notification[type]({
    message: "订单超时",
    description: "订单已超时, 请重新创建订单!",
    style: {
      backgroundColor: "rgba(220, 220, 220)",
      "font-weight": 700
    },
    duration: 4.5
  })
}
