<template>
  <div class="menu">
    <div class="dark_item logo flex items-center justify-center">
      <el-icon :size="26" color="var(--thmem-color)" class="iconfont el-icon-a-SuperFarmSUPER"></el-icon>
      <el-text class="text font-bold " :style="isCollapse ? 'width:0;margin:0' : 'width:6em'"
        style="color:var(--thmem-color)">SuperAdmin</el-text>
    </div>
    <el-menu 
      class="el-menu-vertical-demo w-[200px]" 
      :default-active="route.path" 
      :collapse="isCollapse"
      :unique-opened="thmem.isUniqueOpened" 
      :router="true"
      :background-color="thmem.isMenuReversal ? 'var(--dark-item-bg-color)' : ''"
      :text-color="thmem.isMenuReversal ? '#fff' : ''">
      <template v-for="(menuitem, index) in menuOptions" :key="index">
        <el-sub-menu :index="menuitem.redirect || menuitem.path" v-if="menuitem.children && menuitem.children.length">
          <template #title>
            <el-icon class="iconfont" :class="menuitem.meta!.icon"></el-icon>
            <span>{{ menuitem.meta!.title }}</span>
          </template>
          <template v-for="(menuitem2, index) in menuitem.children" :key="index">
            <el-sub-menu :index="menuitem2.redirect as string || menuitem2.path"
              v-if="menuitem2.children && menuitem2.children.length">
              <template #title>
                <span>{{ menuitem2.meta!.title }}</span>
              </template>
              <el-menu-item :index="menuitem3.redirect as string || menuitem3.path"
                v-for="menuitem3 in menuitem2.children">
                <template #title>
                  <span>{{ menuitem3.meta!.title }}</span>
                </template>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item :index="menuitem2.redirect as string || menuitem2.path" v-else>
              <template #title>
                <span>{{ menuitem2.meta!.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item :index="menuitem.redirect || menuitem.path" v-else>
          <el-icon class="iconfont" :class="menuitem.meta!.icon"></el-icon>
          <span>{{ menuitem.meta!.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/stores/menuStore'
import * as Icons from '@element-plus/icons-vue'
import { thmemStore } from '@/stores/thmemStore'

let _thmemStore = thmemStore()
let { thmem } = storeToRefs(_thmemStore)
const { changeThemeColors, changeHeaderReversal, changeMenuReversal } = _thmemStore
let store = useMenuStore()
const { isCollapse, menuDataList, menuOptions } = storeToRefs(store)

const route = useRoute()

</script>

<style scoped lang="scss">
.menu {
  .logo {
    box-sizing: border-box;
    height: 60px;
    box-sizing: border-box;
    padding: 12px;

    .text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      margin-left: 8px;
      transition: all 0.3s;
      transition-timing-function: linear;
    }
  }

  .el-menu {
    border-right-width: 0;
  }
}

:deep(.el-menu-item.is-active > span) {
  color: var(--thmem-color) !important;
}

:deep(.el-menu-item.is-active > i) {
  color: var(--thmem-color) !important;
}

:deep(.el-sub-menu.is-active >.el-sub-menu__title) {
  color: var(--thmem-color) !important;
}</style>
