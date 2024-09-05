<template>
  <div>
    <CustomForm ref="customFormRef" :formOptions="formOptions" :formItemOptionsList="formItemOptionsList">
      <template #action>
        <!-- <el-button type="success" @click="resetForm">添加</el-button> -->
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button type="danger" @click="resetForm">重置</el-button>
      </template>
    </CustomForm>
  </div>
</template>

<script setup lang="ts">
import { FormOptions, FormItemOptions } from "@/typings/customForm"
import { ElNotification } from 'element-plus'
import CustomForm from "./form.vue"

let customFormRef = ref()

const emits = defineEmits<{
  (e: 'submit', formItemData: FormItemOptions): void // 分页发生改变触发
}>()

let formOptions = ref<FormOptions>({
  model: {
    controlName: 'input',
    prop: '',
    label: '',
    bindControlOptions__placeholder: '请输入内容',
    rules__required: false,
    rules__trigger: 'blur',
    canDeleted: true
  }
})

let formItemOptionsList = ref<FormItemOptions[]>([
  {
    controlName: 'input',
    prop: 'prop',
    label: '键名（prop）',
    bindControlOptions: {
      placeholder: '请输入表单prop'
    },
    rules: [
      {
        required: true, message: '请输入prop', trigger: 'blur'
      }
    ],
  },
  {
    controlName: 'input',
    prop: 'label',
    label: '标签文本（label）',
    bindControlOptions: {
      placeholder: '请输入表单label'
    },
    rules: [
      {
        required: true, message: '请输入label', trigger: 'blur'
      }
    ],
  },
  {
    controlName: 'input',
    prop: 'bindControlOptions__placeholder',
    label: '表单内容提示',
    bindControlOptions: {
      placeholder: '请输入表单内容提示'
    }
  },
  {
    controlName: 'switch',
    prop: 'canDeleted',
    label: '是否可以被删除',
    rules: [{ required: true }]
  },
  {
    controlName: 'switch',
    prop: 'rules__required',
    label: '表单校验-是否必填',
    rules: [{ required: true }]
  },
  {
    controlName: 'input',
    prop: 'rules__message',
    label: '表单校验-失败提示',
    bindControlOptions: {
      placeholder: '请输入表单校验失败提示'
    },
    rules: [{ required: true, message: '请输入表单校验失败提示', trigger: 'blur' }],
    hide: computed(() => !formOptions.value.model['rules__required'])
  },
])

// 点击提交
const submitForm = async () => {
  let isPassVerification = await customFormRef.value.submitForm()
  if (isPassVerification) {
    let obj = {...formOptions.value.model}
    let levelList: string[] = []
    Object.keys(obj).forEach((item) => {
      if (item.includes('__')) {
        levelList.push(item)
      }
    })

    let formItemData: Record<string, any> = {}

    levelList.forEach((item) => {
      let arr = item.split("__")
      if (!formItemData[arr[0]]) {
        formItemData[arr[0]] = { [arr[1]]: obj[item] }
      } else {
        formItemData[arr[0]][arr[1]] = obj[item]
      }
      delete obj[item]
    })
    formItemData = { ...obj, ...formItemData }
    console.log(formItemData);

    // 将数据抛出到父组件
    emits('submit', formItemData as FormItemOptions)
  }
}

// 点击重置
const resetForm = () => {
  customFormRef.value.resetForm()
}
</script>

<style scoped lang="scss"></style>
