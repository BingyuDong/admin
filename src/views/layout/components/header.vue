<template>
  <div class="dark_item header flex items-center justify-between bg-white"
    style="border-bottom: 1px solid rgba(0,0,0,.1);">
    <el-text class="collapse_icon flex items-center">
      <el-icon class="hover" size="20" @click="changeCollapse(!isCollapse)">
        <Expand v-if="isCollapse" />
        <Fold v-else />
      </el-icon>
      <breadCrumbs class="ml-4 transition-all" v-show="thmem.isBreadCrumbs"></breadCrumbs>
    </el-text>
    <div class="flex items-center">
      <el-text class="action_button flex items-center" style="font-size: 18px;">
        <el-icon class="hover mr-3 transition-all iconfont el-icon-pifu" style="cursor: pointer;"
          @click="opentheme"></el-icon>
        <el-icon class="hover mr-3 transition-all iconfont el-icon-bg-refresh" style="cursor: pointer;" @click="reload">
        </el-icon>
        <el-icon class="hover mr-3 transition-all iconfont"
          :class="`${thmem.isFullScreen ? 'el-icon-suoxiao' : 'el-icon-quanpingmu'}`" style="cursor: pointer;"
          @click="onScreenFull"></el-icon>
      </el-text>
      <div class="mr-3">
        <el-switch inline-prompt active-icon="Sunny" inactive-icon="Moon" v-model="thmem.isDark"
          @change="onChangeDark($event as boolean)"></el-switch>
      </div>
      <!-- <div class="mr-2">
        <el-text class="mx-1 transition-all" size="large">Jack</el-text>
      </div> -->
      <el-dropdown class="ml-2">
        <el-avatar class="el-dropdown-link" icon="UserFilled"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="30" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(item, index) in options" :key="index" :divided="item.hasDivided"
              @click="item.method()">
              {{ item.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <ThemeSet ref="themeSet"></ThemeSet>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
import { thmemStore } from '@/stores/thmemStore'
import { useUserStore } from '@/stores/userStore'
import breadCrumbs from './breadCrumbs.vue'
import ThemeSet from "@/components/theme/themeSet.vue"

const router = useRouter()

let store = useMenuStore()
let { isCollapse } = storeToRefs(store)
const { changeCollapse } = store

let _thmemStore = thmemStore()
let { thmem, _colorList } = storeToRefs(_thmemStore)
let { changeFullScreen, changeDark } = _thmemStore

let options: Array<{ title: string; method?: any; hasDivided?: boolean }> = [
  {
    title: '个人信息',
    method: async () => {

    }
  },
  {
    title: '退出登陆',
    hasDivided: true,
    method: async () => {
      useUserStore().logOut()
    }
  }
]

const themeSet = ref<any>()

const onChangeDark = (value: boolean) => {
  changeDark(value)
}

const opentheme = () => {
  themeSet.value.opentheme()

}

const onScreenFull = () => {
  changeFullScreen(!thmem.value.isFullScreen)
}

const reload = inject('reload') as any
</script>

<style scoped lang="scss">
.header {
  height: 100%;
  width: 100%;
  padding: 20px;

  .collapse_icon:hover {
    cursor: pointer;
  }

  .hover:hover {
    color: var(--thmem-color);
  }
}</style>
