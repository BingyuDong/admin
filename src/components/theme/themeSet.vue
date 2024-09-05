<template>
  <!-- 界面设置配置 -->
  <el-drawer v-model="_theme.isopen" title="界面设置" direction="rtl" size="300px" :z-index="999">
    <div class="mb-12" v-for="item in _theme.themeList">
      <el-divider content-position="center">{{ item.title }}</el-divider>
      <div style="font-size: 14px;" class="flex justify-between items-center mb-4" v-for="data in item.setList">
        <el-text>{{ data.title }}</el-text>
        <div>
          <el-switch v-if="data.type == 'switch'" :inline-prompt="data.inline_prompt" :active-icon="data.active_icon"
            :inactive-icon="data.inactive_icon" v-model="thmem[data.bindValueName as string]"
            @change="data.method"></el-switch>
          <el-color-picker :predefine="colorList" v-else-if="data.type == 'colorPicker'"
            v-model="thmem[data.bindValueName as string]" @change="data.method"></el-color-picker>
        </div>
      </div>
    </div>
    <div class="mb-12">
      <el-divider content-position="center">页面切换动画</el-divider>
      <div class="container flex w-[100%] flex-wrap justify-between">
        <el-tooltip :content="item.description" placement="bottom"  v-for="item in animateList" :show-after="500">
          <div class="dark_box list w-[76px] h-[60px] bg-white mb-4 rounded-[6px] cursor-pointer overflow-hidden relative"
            style="border: 1px solid rgba(0,0,0,.2); box-sizing: border-box; transition: all .3s;"
            :class="thmem.activeAnimate.enterActive == item.enterActive && thmem.activeAnimate.leaveActive == item.leaveActive ? 'active' : ''"
            @click="changePagerAnimate(item)">
            <div
              class="my-element1 w-[40px] h-[30px] absolute top-[15px] left-[18px] bg-[rgb(212,212,212)] rounded-[5px] animate__delay-1s animate__animated"
              :class="[animateFlag ? item.enterActive : '']"></div>
            <div
              class="my-element2 w-[40px] h-[30px] absolute top-[15px] left-[18px] bg-[rgb(212,212,212)] rounded-[5px]	animate__animated"
              :class="[animateFlag ? item.leaveActive : '']"></div>
          </div>
        </el-tooltip>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { pageResponsiveStore } from "@/stores/pageResponsiveStore"
import { thmemStore } from '@/stores/thmemStore'
import { ElMessage } from 'element-plus'

let _pageResponsiveStore = pageResponsiveStore()
let { isMobileTerminal } = storeToRefs(_pageResponsiveStore)

let _thmemStore = thmemStore()
let { thmem, _colorList } = storeToRefs(_thmemStore)
const { changeThemeColors, changeHeaderReversal, changeMenuReversal, changeDark, changeBreadCrumbs, changeGrayscale, changeUniqueOpened, changeTagNavigation, changePagerAnimate } = _thmemStore


// 界面设置配置项
let _theme = ref<any>({
  isopen: false,
  themeList: [
    {
      title: '全局主题',
      setList: [
        {
          title: '主题色',
          type: 'colorPicker',
          bindValueName: 'themeColors',
          method: (value: string) => {
            changeThemeColors(value || colorList.value[0])
          },
        },
        {
          title: '暗黑模式',
          type: 'switch',
          active_icon: 'Sunny',
          inactive_icon: 'Moon',
          bindValueName: 'isDark',
          inline_prompt: true,
          method: (value: boolean) => {
            changeDark(value)
          }
        },
        {
          title: '灰色模式',
          type: 'switch',
          bindValueName: 'isGrayscale',
          method: (value: boolean) => {
            changeGrayscale(value)
          }
        },
        {
          title: '侧边栏反转色',
          type: 'switch',
          bindValueName: 'isMenuReversal',
          method: (value: boolean) => {
            changeMenuReversal(value)
          }
        },
      ]
    },
    {
      title: '其他配置',
      setList: [
        {
          title: '菜单手风琴',
          type: 'switch',
          bindValueName: 'isUniqueOpened',
          method: (value: boolean) => {
            changeUniqueOpened(value)
          },
        },
        {
          title: '面包屑菜单',
          type: 'switch',
          bindValueName: 'isBreadCrumbs',
          method: (value: boolean) => {
            if (isMobileTerminal.value) {
              changeBreadCrumbs(!value)
              ElMessage({
                message: '屏幕尺寸偏小，面包屑已禁用！',
                type: 'warning',
              })
            } else {
              changeBreadCrumbs(value)
            }
          },
        },
        {
          title: '标签栏导航',
          type: 'switch',
          bindValueName: 'isTagNavigation',
          method: (value: boolean) => {
            changeTagNavigation(value)
          },
        }
      ]
    }
  ]
})

// 动画列表
const animateList = [
  {
    enterActive: 'animate__fadeIn',
    leaveActive: 'animate__fadeOut',
    description: '淡入淡出'
  },
  {
    enterActive: 'animate__fadeInDown',
    leaveActive: 'animate__fadeOutDown',
    description: '向下移动'
  },
  {
    enterActive: 'animate__fadeInUp',
    leaveActive: 'animate__fadeOutUp',
    description: '向上移动'
  },
  {
    enterActive: 'animate__fadeInLeft',
    leaveActive: 'animate__fadeOutRight',
    description: '向右移动'
  },
  {
    enterActive: 'animate__fadeInRight',
    leaveActive: 'animate__fadeOutLeft',
    description: '向左移动'
  }
]

let colorList = _colorList

// 打开界面配置抽屉
const opentheme = () => {
  _theme.value.isopen = true
}

let animateFlag = ref(true)

let timer: any

watchEffect(() => {
  if (_theme.value.isopen) {
    timer = setInterval(() => {
      animateFlag.value = !animateFlag.value
    }, 2000)
  } else {
    clearInterval(timer)
  }
})

defineExpose({
  opentheme
})

</script>

<style scoped lang="scss">
.box {
  width: 100px;
  height: 80px;
  background: blue;
  margin: 5px;
}

.container {
  &:after {
    content: '';
    width: 76px;
  }
}

.my-element1,
.my-element2 {
  --animate-duration: 1s;
}

.container .active {
  border: 2px solid var(--thmem-color) !important;
}
</style>
