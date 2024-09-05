<template>
  <div>
    <el-card class="mb-[10px] !transition-all" v-show="tableScreenShow">
      <TableScreen :tableScreenParams="tableScreenParams" :tableScreenItemOptionsList="tableScreenItemOptionsList"
        @tableScreenParamsChange="tableScreenParamsChange">
      </TableScreen>
    </el-card>
    <el-card class="w-full">
      <div class="w-full mb-[10px] flex justify-between">
        <div>
          <el-button class="!ml-0 mr-[10px] mb-[10px] pc:mb-0" type="info" plain>导出</el-button>
          <el-button class="!ml-0 mr-[10px] mb-[10px] pc:mb-0" type="success" plain>添加</el-button>
          <el-button class="!ml-0 mr-[10px] mb-[10px] pc:mb-0" type="success" plain>批量添加</el-button>
          <el-button class="!ml-0 mr-[10px] mb-[10px] pc:mb-0" type="danger">批量删除</el-button>
        </div>
        <div class="text-end">
          <el-button class="!mr-0 !ml-[10px] mb-[10px] pc:mb-0" :type="tableScreenShow ? 'primary' : 'info'" circle plain
            icon="Operation" @click="tableScreenShow = !tableScreenShow"></el-button>
          <el-button class="!mr-0 !ml-[10px] mb-[10px] pc:mb-0" type="info" circle plain icon="Refresh"
            @click="getTableData(paginationOption.currentPage, paginationOption.pageSize)"></el-button>
        </div>
      </div>
      <customTable :table-options="tableOptions" :tableColumnList="tableColumnList" :table-data="tableData"
        :paginationOption="paginationOption" @pagination-change="paginationChange">
        <template #expand_slot="{ row }">
          <el-card>
            这里是展开的测试行{{ row.id }}
          </el-card>
        </template>
        <template #testSlot="{ row }">
          这里是测试的自定义插槽{{ row.id }}
        </template>
        <template #status="{ row }">
          <el-tag effect="dark" :type="row.status == 1 ? 'success' : 'danger'">{{ row.status == 1 ? '正常' : '异常'
          }}</el-tag>
        </template>
        <template #option="{ row }">
          <!-- <el-button type="primary">详情</el-button> -->
          <el-button type="danger" plain>删除</el-button>
        </template>
      </customTable>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { FormOptions, FormItemOptions } from "@/typings/customForm"
import { TableOptions, Column, PaginationOption } from '@/typings/customTable'
import customTable from "@/components/customTable/table.vue"
import TableScreen from "@/components/customTable/tableScreen.vue"
import { ElNotification } from 'element-plus'

const load = (
  row: any,
  treeNode: unknown,
  resolve: (date: any[]) => void
) => {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])
  }, 1000)
}

// 表格配置
const tableOptions = ref<TableOptions>({
  loading: true,
  border: true,
  stripe: true,
  rowKey: 'id',
  // lazy: true,
  // load
})

// 分页器配置
const paginationOption = ref<PaginationOption>({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 展示筛选控件
let tableScreenShow = ref(true)

// 定义表格列
const tableColumnList: Column[] = [
  // { type: 'expand' },
  { type: 'selection' },
  // { label: '索引', type: 'index', align: 'center', width: '80px', },
  { prop: 'id', label: 'ID', align: 'center', width: '80px', sortable: 'custom' },
  { prop: 'name', label: '名称', align: 'center' },
  { prop: 'status', label: '状态', align: 'center', slot: 'status' },
  { prop: '测试列', label: '自定义插槽测试', align: 'center', slot: 'testSlot' },
  // { prop: 'createTime', label: '创建时间', align: 'center' },
  { prop: 'option', label: '操作', align: 'center', fixed: 'right' }
]

// 表格数据
const tableData = ref<any[]>([])

// 模拟请求表格数据方法
const mookGetDataApi = (currentPage: number, pageSize: number) => {
  let data = []
  /**
   * 普通表格数据
   */
  for (let i = 1; i <= pageSize; i++) {
    data.push({
      id: (currentPage - 1) * pageSize + i, name: `num${(currentPage - 1) * pageSize + i}`, createTime: '',
      status: ((currentPage - 1) * pageSize + i) % 3 == 0 ? '1' : '2'
    })
  }
  /**
   * 提供给树状结构使用（带懒加载）
   */
  //   data = [
  //   {
  //     id: 1,
  //     date: '2016-05-02',
  //     name: 'wangxiaohu',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     id: 2,
  //     date: '2016-05-04',
  //     name: 'wangxiaohu',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     id: 3,
  //     date: '2016-05-01',
  //     name: 'wangxiaohu',
  //     hasChildren: true,
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     id: 4,
  //     date: '2016-05-03',
  //     name: 'wangxiaohu',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  // ]
  /**
   * 提供给树状结构使用
   */
  // data = [
  //   {
  //     id: 1,
  //     date: '2016-05-02',
  //     name: 'wangxiaohu',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     id: 2,
  //     date: '2016-05-04',
  //     name: 'wangxiaohu',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     id: 3,
  //     date: '2016-05-01',
  //     name: 'wangxiaohu',
  //     address: 'No. 189, Grove St, Los Angeles',
  //     children: [
  //       {
  //         id: 31,
  //         date: '2016-05-01',
  //         name: 'wangxiaohu',
  //         address: 'No. 189, Grove St, Los Angeles',
  //       },
  //       {
  //         id: 32,
  //         date: '2016-05-01',
  //         name: 'wangxiaohu',
  //         address: 'No. 189, Grove St, Los Angeles',
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     date: '2016-05-03',
  //     name: 'wangxiaohu',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  // ]
  return data
}

// 数据赋值
const getTableData = (currentPage: number, pageSize: number) => {
  tableOptions.value.loading = true
  setTimeout(() => {
    tableData.value = mookGetDataApi(currentPage, pageSize)
    paginationOption.value.currentPage = currentPage
    paginationOption.value.pageSize = pageSize
    paginationOption.value.total = 100
    tableOptions.value.loading = false
  }, 500);
}

// 表格筛选参数
let tableScreenParams = ref<Record<string, any>>({
  name: '',
  state: ''
})

// 筛选项配置
let tableScreenItemOptionsList = ref<FormItemOptions[]>([
  {
    controlName: 'input',
    prop: 'name',
    label: '名称:',
    bindControlOptions: {
      placeholder: '请输入名称'
    }
  },
  {
    controlName: 'select',
    prop: 'state',
    label: '状态:',
    bindControlOptions: {
      placeholder: '请选择状态',
      selectOptionsList: [
        { label: '正常', value: '1' },
        { label: '异常', value: '2' },
      ]
    }
  }
])

// 监听筛选参数变化
const tableScreenParamsChange = ($event: Record<string, any>) => {
  tableScreenParams.value = $event
  // console.log(tableScreenParams.value);
  ElNotification({
    title: '成功',
    message: '表单验证成功，当前筛选条件为' + `${JSON.stringify(tableScreenParams.value)}，此时可以拿当前筛选条件请求表格数据（分页器的currentPage属性值记得置为1）`,
    type: 'success',
  })
  // getTableData()
}
// 监听分页器改变事件
const paginationChange = (currentPage: number, pageSize: number) => {
  getTableData(currentPage, pageSize)
}
getTableData(paginationOption.value.currentPage, paginationOption.value.pageSize)
</script>

<style scoped lang="scss"></style>
