import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import AutoImport from 'unplugin-auto-import/vite'

import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from "vite-plugin-compression"

import {dayjs} from "element-plus";

import pkg from "./package.json"

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, './')
  return {
    base: config.VITE_BASE,
    // base: process.env.NODE_ENV === 'production' ? '/admin-test/' : '',
    server: {
      port: 8081,
      open: true,
      // 代理
      proxy: {
        [config.VITE_PROXY_PREFIX]: {
          target: config.VITE_API_BASE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      Components({
        // 指定组件位置，默认是src/components
        dirs: ['src/components'],
        extensions: ['vue'],
        // 配置文件生成位置
        dts: './components.d.ts',
        resolvers: [
          ElementPlusResolver()
        ]
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core', "pinia"],
        resolvers: [ElementPlusResolver()],
        dts: './auto-imports.d.ts',
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
    build: {
      chunkSizeWarningLimit: 1500,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          inlineDynamicImports: false,
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        },
        plugins: [
          visualizer({ open: true }),
          viteCompression({
            verbose: true, // 是否在控制台中输出压缩结果
            disable: false,
            threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
            algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
            ext: '.gz'
          })
        ]
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }
})
