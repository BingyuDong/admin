<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
import { thmemStore } from '@/stores/thmemStore'
import { pageResponsiveStore } from "@/stores/pageResponsiveStore";
import { useWatchViewSize } from "@/hooks/useWatchViewSize"

let router = useRouter()
const _useMenuStore = useMenuStore()
const _thmemStore = thmemStore()
const _pageResponsiveStore = pageResponsiveStore()

const { initMenuAndRouterData, changeCollapse } = _useMenuStore
let { currentRoutePath, isCollapse } = storeToRefs(_useMenuStore)

const { initThmem } = _thmemStore
let { thmem } = storeToRefs(_thmemStore)

let { isMobileTerminal } = storeToRefs(_pageResponsiveStore)

// 关闭蒙版
const closeMask = () => {
  changeCollapse(true)
}

onMounted(async () => {
  // 初始化主题
  initThmem()
  // 初始化菜单和路由
  console.log('初始化菜单和路由');
  await initMenuAndRouterData(useRouter())
  currentRoutePath.value = currentRoutePath.value ? currentRoutePath.value : router.currentRoute.value.fullPath
  router.replace(currentRoutePath.value)
})
</script>

<template>
  <div>
    <RouterView v-slot="{ Component }">
      <transition enter-active-class="my-element animate__animated animate__fadeIn  "
        leave-active-class="my-element animate__animated animate__fadeOut " mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
    <!-- 蒙版,提供给移动端点击关闭菜单使用 -->
    <div v-show="isMobileTerminal && (!isCollapse)"
      style="width: 100vw; height: 100vh;background: rgba(0,0,0,.5);z-index: 99;position: fixed;left: 0;top: 0"
      @click="closeMask"></div>
  </div>
</template>

<style lang="scss">
:root {
  --thmem-color: rgba(255, 255, 255, 0);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


#nprogress .bar {
  background: var(--thmem-color) !important; //自定义颜色
}

// 全局滚动条 配置
::-webkit-scrollbar {
  width: 4px;
  /*滚动条宽度*/
  height: 4px;
  /*滚动条高度*/
}

::-webkit-scrollbar-track {
  border-radius: 2px;
  /*滚动条的背景区域的圆角*/
  background-color: rgb(230, 227, 227);
  /*滚动条的背景颜色*/
}

::-webkit-scrollbar-thumb {
  box-shadow: 4px 1px 3px var(--thmem-color) inset;
  /*滚动条的内阴影*/
  border-radius: 2px;
  /*滚动条的圆角*/
  background-color: var(--thmem-color);
  /*滚动条的背景颜色*/
}

.my-element {
  --animate-duration: 0.3s;
}
</style>
