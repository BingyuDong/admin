<template>
  <el-form ref="formRef" label-width="auto" style="max-width: 600px" v-bind="props.formOptions" @submit.prevent>
    <template v-for="(item, index) in formItemOptionsList" :key="index">
      <!-- 当表单为动态表单 -->
      <div class="flex w-full" v-if="props.formOptions.dynamicForm">
        <div class="mr-[10px] w-[32px]">
          <el-button type="danger" icon="Delete" circle plain v-if="item.canDeleted"
            @click="delDynamicFormItem(item)"></el-button>
        </div>
        <div class="w-full">
          <FormItem :item="item" :formOptions="props.formOptions" />
        </div>
      </div>
      <!-- 非动态表单 -->
      <FormItem :item="item" :formOptions="props.formOptions" v-else >
        <template v-slot:[item.slot] v-if="item.slot">
          <slot :name="item.slot" :item="item"></slot>
        </template>
      </FormItem>
    </template>

    <!-- 操作栏 -->
    <el-form-item>
      <slot name="action" :form="formRef!" :model="props.formOptions.model" :options="formOptions"></slot>
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup>
import { FormProps, FormItemOptions } from "@/typings/customForm"
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import FormItem from "./formItem.vue"
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps<FormProps>()

let formRef = ref()

// 提交表单数据
const submitForm = async () => {
  if (!formRef) return
  return await formRef.value.validate((valid: any, fields: any) => {
    if (valid) {
      return true
    } else {
      return false
    }
  })
}

// 重置表单数据
const resetForm = async () => {
  if (!formRef) return
  return await formRef.value.resetFields()
}


// 点击动态表单前的删除按钮
const delDynamicFormItem = (item: FormItemOptions) => {
  let index = props.formItemOptionsList!.findIndex((data) => data.prop == item.prop)
  if (index < 0) return
  ElMessageBox.confirm(
    `是否删除表单项${item.label}？`,
    '提示',
    {
      type: 'warning',
    }
  )
    .then(() => {
      delete props.formOptions.model[item.prop]
      props.formItemOptionsList!.splice(index, 1);
    })
}

defineExpose({ submitForm, resetForm })
</script>
  