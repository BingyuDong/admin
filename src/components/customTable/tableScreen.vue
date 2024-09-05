<template>
    <div class="">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="筛选" name="1">
                <template #title>
                    <div class="flex items-center text-[24px]">
                        <el-icon class="mr-1 iconfont el-icon-shaixuan2" ></el-icon>
                        <el-text class="font-semibold">表格筛选</el-text>
                    </div>
                </template>
                <CustomForm ref="customFormRef" :formOptions="tableScreenOptions" :formItemOptionsList="tableScreenItemOptionsList">
                    <template #action>
                        <el-button type="primary" @click="submitForm">搜索</el-button>
                        <el-button type="danger" @click="resetForm">重置</el-button>
                    </template>
                </CustomForm>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { FormOptions, FormItemOptions } from "@/typings/customForm"
import CustomForm from '@/components/customForm/form.vue';
const activeNames = ref(['1'])
let customFormRef = ref()

const props = defineProps<{
    tableScreenParams:Record<string, any>,
    tableScreenItemOptionsList:FormItemOptions[]
}>()

const emits = defineEmits<{
    (event: 'tableScreenParamsChange', n: Record<string, any>): void
}>()

let model = {...props.tableScreenParams}

let tableScreenOptions = ref<FormOptions>({
    model,
    style: 'max-width: calc(100%)',
    inline: true
})

const submitForm = async () => {
   let isPassVerification = await customFormRef.value.submitForm()
   if(isPassVerification){
    // console.log(props.tableScreenParams);
    emits('tableScreenParamsChange', tableScreenOptions.value.model)
   }
  
}
const resetForm = async () => {
  await customFormRef.value.resetForm()
  emits('tableScreenParamsChange', {...tableScreenOptions.value.model})
}
</script>

<style scoped lang="scss">
:deep(.el-collapse-item) {
    .el-collapse-item__content {
        padding: 0;
    }
}
</style>
