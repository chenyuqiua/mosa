import { createApp } from "vue"
// @ts-ignore
import App from "./App.vue"
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"

import "lib-flexible-computer"
// import "lib-flexible"
// import "lib-flexible/flexible.js"
// import "amfe-flexible"

// @ts-ignore
import Router from "./router/index"
import pinia from "./stores/index"
// @ts-ignore
// import store from "./store/index.js";
const app = createApp(App)
app.use(Antd)
// store
// app.use(store);
app.use(pinia)
// router
app.use(Router)
app.mount("#app")
