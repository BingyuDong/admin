<template>
  <div class="">
    <!-- layout页面
    <RouterView /> -->
    <el-container style="width: 100vw; height: 100vh; background-color: rgba(245,247,249);" class="dark_box">
      <el-aside style="width: auto; border-right: 0.5px solid rgba(0,0,0,.1)" class="dark_item transition-all" :class="[isMobileTerminal?moblieMenuStyle:'', thmem.isMenuReversal?'bg-[var(--dark-item-bg-color)]':'bg-white']">
        <Menu></Menu>
      </el-aside>

      <el-container>
        <el-header style="margin: 0; padding: 0; z-index: 99; height: 50px;">
          <Header></Header>
        </el-header>
        <TagNavigation v-if="thmem.isTagNavigation"></TagNavigation>
        <el-main class="_el-main main overflow-auto" style="margin: 0; padding: 0">
          <div class="router_view" style="padding: 10px;">
            <router-view v-slot="{ Component }">
              <transition :enter-active-class="`my-element animate__animated ${thmem.activeAnimate.enterActive}`"
                :leave-active-class="`my-element animate__animated ${thmem.activeAnimate.leaveActive}`" mode="out-in">
                <component :is="Component" v-if="isRouterAlive" />
              </transition>
            </router-view>
          </div>
          <el-backtop target="._el-main"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from './components/header.vue'
import Menu from './components/menu.vue'
import TagNavigation from './components/tagNavigation.vue'
import { thmemStore } from '@/stores/thmemStore'
import { pageResponsiveStore } from "@/stores/pageResponsiveStore"
import { useMenuStore } from "@/stores/menuStore"
import  { useWatchViewSize }  from "@/hooks/useWatchViewSize"

const route = useRoute()


let _useMenuStore = useMenuStore()
let { isCollapse } = storeToRefs(_useMenuStore)
let { changeCollapse} = _useMenuStore

let _thmemStore = thmemStore()
let { thmem } = storeToRefs(_thmemStore)
const { changeThemeColors, changeHeaderReversal, changeMenuReversal } = _thmemStore

let _pageResponsiveStore = pageResponsiveStore()
let { isMobileTerminal, moblieMenuDefaultStyle, mobliemCloseMenu } = storeToRefs(_pageResponsiveStore)

let moblieMenuStyle = computed(()=>{
  let value = moblieMenuDefaultStyle.value
  return isCollapse.value?value  +  ' ' + mobliemCloseMenu.value : value
})

let isRouterAlive = ref(true)

let reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
  isRouterAlive.value = true
  })
}

provide('reload', reload)

// 监听路由变化
watch(route, (newVal, oldVal)=>{
  if(isMobileTerminal.value){
    changeCollapse(true)
  }
})

useWatchViewSize().resize()
</script>

<style scoped lang="scss">
.my-element {
  --animate-duration:.3s;
}
</style>
