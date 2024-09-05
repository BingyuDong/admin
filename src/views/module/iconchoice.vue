<template>
  <div class="">
    <el-card class="mb-2">
      <div class="flex">
        <el-input class="flex w-[100%]" clearable filterable v-model="selectValue" @clear="bindSelectValueFn('')">
          <template #prepend>筛选</template>
          <template #append>
            <el-button icon="Search" @click="bindSelectValueFn(selectValue)" type="danger"></el-button>
          </template>
        </el-input>
      </div>
    </el-card>
    <el-card v-loading="loading" v-bind="ladingConfig">
      <div ref="el" class="_container flex w-[100%] overflow-auto justify-start flex-wrap" v-if="showIconsList.length">
        <template v-for="(item, index) in showIconsList" :key="index">
          <div class="dark_item list h-[90px] bg-white cursor-pointer relative flex items-center justify-center"
            :style="`width: ${100 + iconItemWidth}px`">
            <el-tooltip :content="item" placement="bottom" :show-after="300">
              <div
                class="iconitem flex flex-col justify-center items-center w-[100%] hover:scale-125 hover:text-[var(--el-color-primary)] !transition-all"
                v-copy="item">
                <el-icon :size="26" class="iconfont" :class="`el-icon-${item}`">
                  <component v-if="item" :is="`${item}`"></component>
                </el-icon>
                <el-text size="small" class="iconitemtext w-[80%] text-center" truncated>{{ item }}</el-text>
              </div>
            </el-tooltip>
          </div>
        </template>
      </div>
      <div v-else class="w-[]100%] h-[200px] flex justify-center items-center">
        <!-- 无数据 -->
        <el-empty description="无数据" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import * as ElIcons from '@element-plus/icons-vue'
import CustomIcons from '@/assets/iconfont/iconfont.json'
import { ladingConfig } from "@/config/loadingConfig"
import { useElementSize } from '@vueuse/core'

const el = ref(null)
const { width: iconItemBoxWidth } = useElementSize(el)

const iconItemWidth = computed(() => {
  let num = parseInt((iconItemBoxWidth.value / 100) + '')
  return (iconItemBoxWidth.value - (num * 100)) / num
})


let selectIconsList = ref<string[]>([])

let loading = ref(true)

let selectValue = ref('')

let bindSelectValue = ref('')

let showIconsList = computed(() => {
  return selectIconsList.value.filter((item) => item.toLowerCase().includes(bindSelectValue.value.toLowerCase()))
})

// 绑定筛选事件
const bindSelectValueFn = (value: string) => {
  bindSelectValue.value = value
}

nextTick(() => {
  setTimeout(() => {
    loading.value = false
    selectIconsList.value = Object.keys(ElIcons).filter((item) => item.toLocaleLowerCase()).concat(CustomIcons.glyphs.map(item => `${item.font_class}`))
  }, 500);
})

</script>

<style scoped lang="scss">
:deep(.el-loading-mask) {
  z-index: 98 !important;
}

.iconitem:hover .iconitemtext {
  color: var(--el-color-primary);
}
</style>