import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
// @ts-ignore
import { resolve } from "path"
// @ts-ignore
import Components from "unplugin-vue-components/vite"
// @ts-ignore
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"

import px2rem from "postcss-px2rem"

// https://vitejs.dev/config/
export default defineConfig({
  // 打包相对路径
  base: "./",
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      "^/cloudApi/": {
        target: "https://yongma16.xyz/back-front/",
        // target: "http://localhost:9090/",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/cloudApi/, "")
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        patterns: [resolve(__dirname, "./src/style/main.less")]
      }
    },
    postcss: {
      plugins: [
        px2rem({
          remUnit: 144
        })
      ]
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ]
})
