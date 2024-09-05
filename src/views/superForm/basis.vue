<template>
  <div>
    <el-card class="mb-2">
      <el-alert class="mb-2" :closable="false"
        title="通过 component: is 组件属性 以及 v-bind 属性渗透，
        通过传入配置项的形式渲染对应的表单控件，
        当然，因为Radio单选框以及Select 选择器的特殊性，
        我们在使用的时候需要多传入一个配置对象进行使用，
        但是控件上的方法和插槽目前无法捕获，
        只适合做一些简单的表单操作（控件中的change/select/blur·····等事件方法无法捕获，
        以及控件中的插槽无法正常使用）,
        若是想进行复杂的操作，请使用自定义插槽的方式"
        type="warning" />
    </el-card>
    <el-card class="">
      <CustomForm ref="customFormRef" :formOptions="formOptions" :formItemOptionsList="formItemOptionsList">
        <template #loveSlot="{ item }">
          这里是自定义插槽 当前选项值为： <el-text type="primary" class="ml-2"> {{ formOptions.model[item.prop] }} </el-text>
        </template>
        <template #action>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button type="danger" @click="resetForm">重置</el-button>
        </template>
      </CustomForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { FormOptions, FormItemOptions } from "@/typings/customForm"
import CustomForm from "@/components/customForm/form.vue"
import { ElNotification } from 'element-plus'

let customFormRef = ref()

let formOptions = ref<FormOptions>({
  model: {
    name: '123',
    id: '',
    age: '',
    love: '唱、跳、rap',
    sex: 2,
    like: ''
  },
  style: 'max-width: 600px',
  // inline:true,
  // dynamicForm: true,
  // 'label-position': 'top',
  rules: {
    name: { required: true, message: '请输入name', trigger: 'blur' }
  }
})

let formItemOptionsList = ref<FormItemOptions[]>([
  {
    controlName: 'input',
    prop: 'name',
    label: '姓名',
    bindControlOptions: {
      placeholder: '请输入姓名'
    },
    // canDeleted: true
  },
  {
    controlName: 'input',
    prop: 'id',
    label: 'id',
    bindControlOptions: {
      placeholder: '请输入id'
    },
    rules: [
      {
        required: true, message: '请输入id', trigger: 'blur'
      }
    ],
  },
  {
    controlName: 'input',
    prop: 'age',
    label: '年纪',
    bindControlOptions: {
      placeholder: '请输入姓名',
      type: 'number'
    },
    rules: [
      {
        validator: (rule: any, value: any, callback: any) => {
          if (value <= 18) {
            // console.log(formOptions.value.model);
            callback(new Error('年纪必须大于18'))
          } else {
            callback()
          }
        }, trigger: 'blur'
      }
    ]
  },
  {
    controlName: 'radio',
    prop: 'sex',
    label: '性别',
    bindControlOptions: {
      placeholder: '请选择性别',
      radioOptionsList: [
        { label: 1, optionName: '男' },
        { label: 2, optionName: '女' }
      ]
    }
  },
  {
    controlName: 'select',
    prop: 'like',
    label: '爱好',
    bindControlOptions: {
      placeholder: '请选择爱好',
      selectOptionsList:[
        {label:'打篮球',value:'1'},
        {label:'踢足球',value:'2'},
      ]
    }
  },
  {
    slot: 'loveSlot',
    controlName: 'input',
    prop: 'love',
    label: 'love'
  }
])

const submitForm = async () => {
   let isPassVerification = await customFormRef.value.submitForm()
   if(isPassVerification){
    // console.log(formOptions.value.model);
    ElNotification({
    title: '成功',
    message: '表单验证成功，当前表单对象值为'+ `${JSON.stringify(formOptions.value.model)}`,
    type: 'success',
  })
   }
  
}
const resetForm = () => {
  customFormRef.value.resetForm()
}
</script>

<style scoped lang="scss"></style>
