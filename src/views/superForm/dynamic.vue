<template>
  <div>
    <el-card class="mb-[10px]">
      <el-alert class="mb-2" :closable="false" title="通过动态添加/删除表单配置项动态生成与删除表单项,当前只支持input类型的表单项动态插入" type="warning" />
    </el-card>
    <div class="pc:flex">
      <div class="w-full h-full">
        <el-card class="w-full h-full">
          <template #header>表单结构</template>
          <CustomForm ref="customFormRef" :formOptions="formOptions" :formItemOptionsList="formItemOptionsList">
            <template #action>
              <!-- <el-button type="success" @click="resetForm">添加</el-button> -->
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button type="danger" @click="resetForm">重置</el-button>
            </template>
          </CustomForm>
        </el-card>
        <el-card class="mt-[10px]">
          <template #header>动态插入</template>
          <FormDynamic @submit="dynamicSubmit"></FormDynamic>
        </el-card>
      </div>
      <el-card class="w-full pc:ml-[10px] mt-[10px] pc:mt-0">
        <template #header>表单数据</template>
        <Codehighlight :code="codehighlightOptionscode"></Codehighlight>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormOptions, FormItemOptions } from "@/typings/customForm"
import { ElNotification, ElMessage } from 'element-plus'
import CustomForm from "@/components/customForm/form.vue"
import FormDynamic from "@/components/customForm/formDynamic.vue"
import Codehighlight from "@/components/codehighlight/index.vue";

let customFormRef = ref()

let formOptions = ref<FormOptions>({
  model: {},
  dynamicForm: true,
})

let formItemOptionsList = ref<FormItemOptions[]>([
  {
    controlName: 'input',
    prop: 'name',
    label: 'name',
    bindControlOptions: {
      placeholder: '请输入name'
    },
    rules: [
      {
        required: true, message: '请输入name', trigger: 'blur'
      }
    ],
    canDeleted: true
  }
])

const submitForm = async () => {
  let isPassVerification = await customFormRef.value.submitForm()
  if (isPassVerification) {
    // console.log(formOptions.value.model);
    ElNotification({
      title: '成功',
      message: '表单验证成功，当前表单对象值为' + `${JSON.stringify(formOptions.value.model)}`,
      type: 'success',
    })
  }
}
const resetForm = () => {
  customFormRef.value.resetForm()
}

let codehighlightOptions = {
  code: computed(() => JSON.stringify(formItemOptionsList.value, null, 2)),
  language: 'json'
}

const codehighlightOptionscode = computed(() => 'formItemOptionsList = ' + JSON.stringify(formItemOptionsList.value, null, 2))

/**
 * 动态插入
 */
const dynamicSubmit = (event: FormItemOptions) => {
  console.log(event, formOptions.value.model);
  if (formItemOptionsList.value.some((item) => item.prop == event.prop)) {
    ElMessage.error('已经存在该键名的表单项，无法添加！')
  } else {
    formItemOptionsList.value.push(event as any)
  }
}
</script>

<style scoped lang="scss"></style>
