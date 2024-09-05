<template>
  <div>
    <el-card class="mr-2">
      <div class="mb-2 flex justify-end flex-wrap w-full">
        <el-button class="mb-1" type="success">添加一级菜单</el-button>
        <el-button class="mb-1" type="primary" v-if="selectItem">添加子级菜单</el-button>
        <el-button class="mb-1" type="warning" v-if="selectItem">编辑</el-button>
      </div>
      <el-input placeholder="输入菜单名称/路径关键字" suffix-icon="Search" v-model="filterText" :clearable="true" class="mb-2" />
      <el-tree node-key="id" :expand-on-click-node="false" :highlight-current="true" :data="routerOptions"
        :filter-node-method="filterNode" ref="treeRef" @node-click="handleNodeClick">
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <div class="flex items-center">
              <el-icon class="iconfont mr-1" v-if="data.meta!.icon" :class="data.meta!.icon"></el-icon>
              {{ data.id }}.
              {{ data.meta.title }}:
              <el-tag class="ml-1">{{ data.path }}</el-tag>
            </div>
          </div>
        </template>
      </el-tree>
    </el-card>
    <!-- <el-card class=" w-full"></el-card> -->
  </div>
</template>
  
<script setup lang="ts">
import { RouteRecordRaw, Router } from 'vue-router'
import { TableOptions, Column, PaginationOption } from '@/typings/customTable'
import customTable from "@/components/customTable/table.vue"
import { useMenuStore } from "@/stores/menuStore"
import { ElTree } from 'element-plus'

const _useMenuStore = useMenuStore()
let { routerOptions } = storeToRefs(_useMenuStore)
const { } = _useMenuStore

const filterText = ref('')

const treeRef = ref<InstanceType<typeof ElTree>>()

const filterNode = (value: string, data: any) => {
  if (!value) return true
  return data.path.includes(value) || data.meta.title.includes(value)
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

let selectItem = ref<any>()

const handleNodeClick = (data: any) => {
  selectItem.value = data
}
</script>
  
<style scoped lang="scss"></style>
  