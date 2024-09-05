<template>
  <div class="">
    <el-card>
      <div class="w-full mb-4 flex justify-end">
        <el-button type="success">添加按钮权限</el-button>
      </div>
      <customTable :table-options="tableOptions" :tableColumnList="tableColumnList" :table-data="tableData"></customTable>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { TableOptions, Column, PaginationOption } from '@/typings/customTable'
import customTable from "@/components/customTable/table.vue"

// 表格配置
const tableOptions = ref<TableOptions>({
  loading: true,
  border: true,
  stripe: true,
  rowStyle: ({ row, rowIndex }) => {
    if (row.id === 3) {
      return 'backgroundColor: var(--el-color-danger-light-9) !important'
    } else {
      return ''
    }
  }
})

// 定义表格列
const tableColumnList: Column[] = [
  { prop: 'key', label: 'key', align: 'center' },
  { prop: 'msg', label: '描述', align: 'center' },
  { prop: 'management', label: '白名单', align: 'center' },
]

// 表格数据
const tableData = ref<any[]>([])

// 数据赋值
const getTableData = () => {
  tableOptions.value.loading = true
  setTimeout(() => {
    tableData.value = []
    tableOptions.value.loading = false
  }, 500);
}
getTableData()
</script>

<style scoped lang="scss"></style>
