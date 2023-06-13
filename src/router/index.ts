// import { useStore } from "vuex";
import { checkLoginUserToken } from "@/service/user/userApi"
import { localCache } from "@/utils/cache"
import { message } from "ant-design-vue"
import * as VueRouter from "vue-router"

// import store from "../store/index.js"

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouterMap: any = [
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/login",
    name: "login",
    // @ts-ignore
    component: () => import("@/view/user/Login.vue"),
    meta: { title: "登录" }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    // @ts-ignore
    component: () => import("@/view/layout/Layout.vue"),
    meta: { title: "首页" }
  },
  {
    path: "/login",
    name: "login",
    // @ts-ignore
    component: () => import("@/view/user/Login.vue"),
    meta: { title: "登录" }
  },
  {
    path: "/register",
    name: "register",
    // @ts-ignore
    component: () => import("@/view/user/Register.vue"),
    meta: { title: "注册" }
  }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router: any = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes: constantRouterMap
})

// 导航守卫
router.beforeEach(async (to: any) => {
  // 参数to(跳转到的位置)/from(从哪里跳转过来)
  // 返回值: 返回值决定要导航的路径
  const token = localCache.getCache("token")
  // 进入到主页面, 没有token返回登录页面
  if (to.path === "/dashboard" && !token) return "/login"

  // 进入主页面验证token是否过期
  if (to.path === "/dashboard") {
    const token = localCache.getCache("token")
    const res = await checkLoginUserToken(token)
    if (res.err !== 0) {
      message.warning("当前用户已过期, 请重新登录")
      return "/login"
    }
  }
})

export default router
