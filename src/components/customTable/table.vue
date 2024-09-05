<template>
  <div class="my_table" style="width: 100%">
    <el-table :data="tableData" style="width: 100%" v-bind="tableOptions" v-loading="isLoading || false" :class="[`${isLoading?'min-h-[150px]':''}`, `${isLoading?'max-h-[60vh]':''}`]">
      <template v-for="(item, index) in tableColumnList">
        <!-- 自定义插槽 -->
        <el-table-column v-if="item.slot && item.slot != ''" :prop="item.prop" :label="item.label"
          :sortable="item.sortable" :align="item.align" :type="item.type" :width="item.width" v-bind="item">
          <template #default="scope">
            <slot :name="item.slot" :row="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- 操作项 -->
        <el-table-column v-else-if="item.prop && item.prop === 'option'" :prop="item.prop" :label="item.label"
          :sortable="item.sortable" :align="item.align" :type="item.type" :width="item.width" v-bind="item">
          <template #header>
            <slot name="option_header">{{ item.label }}</slot>
          </template>
          <template #default="scope">
            <slot name="option" :row="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- 折叠行 -->
        <el-table-column v-else-if="item.type=='expand'" type="expand">
          <template #default="scope">
            <slot name="expand_slot" :row="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- 默认内容 -->
        <el-table-column v-else :prop="item.prop" :label="item.label" :sortable="item.sortable" :align="item.align"
          :type="item.type" :width="item.width" v-bind="item"></el-table-column>
      </template>
    </el-table>
    <div class="mt-6 flex justify-center pc:justify-end" style="width: 100%" v-if="paginationOption">
      <!-- 分页器 -->
      <el-pagination background
        :layout="`${isMobileTerminal ? 'total,pager, jumper' : 'total, sizes, prev, pager, next, jumper'}`"
        :small="isMobileTerminal" :pager-count="isMobileTerminal ? 3 : 7"
        :current-page="paginationOption.currentPage" 
        :page-size="paginationOption.pageSize"
        :total="paginationOption.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElTable, ColumnStyle } from 'element-plus'
import { TableOptions, TableProps, tableColumn } from '@/typings/customTable'
import { thmemStore } from "@/stores/thmemStore";
import { pageResponsiveStore } from "@/stores/pageResponsiveStore";


const _thmemStore = thmemStore()
let { thmem } = storeToRefs(_thmemStore)
const _pageResponsiveStore = pageResponsiveStore()
let { isMobileTerminal } = storeToRefs(_pageResponsiveStore)

// 组件需要的参数
const props = defineProps<TableProps>()

// 表格配置
const tableOptions = computed<TableOptions>(() => {
  const option: TableOptions = {
    stripe: false,
    border: false,
    tooltipEffect: 'light',
    showHeader: true,
    showPagination: true,
    tableLayout: 'auto',
    loading: props.tableOptions.loading,
    'element-loading-text': '加载中，请稍后',
    'element-loading-spinner': `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `,
    'element-loading-svg-view-box': "-10, -10, 50, 50",
    rowStyle: (): ColumnStyle<any> => {
      return { cursor: 'pointer' } as ColumnStyle<any>
    },
    // 行样式
    headerCellStyle: () => {
      return { background: thmem.value.isDark ? 'rgba(38,39,39)' : '#f5f7fa' }
    }
  }
  // console.log(option, props?.tableOptions)
  return Object.assign(option, props?.tableOptions)
})

// 表格加载状态
let isLoading = computed(() => tableOptions.value.loading || false)

// emits触发
const emits = defineEmits<{
  (e: 'pagination-change', currentPage: number, pageSize: number): void // 分页发生改变触发
}>()

const handleSizeChange = (value: number) => {
  // console.log('size', value)
  emits('pagination-change', 1, value)
}

const handleCurrentChange = (value: number) => {
  // console.log('page', value)
  emits('pagination-change', value, props.paginationOption!.pageSize)
}
</script>

<style scoped lang="scss">
:deep(.el-loading-mask) {
  z-index: 98 !important;
}
</style>
