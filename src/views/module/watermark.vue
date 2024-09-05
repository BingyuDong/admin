<template>
    <div>
        <el-card class="mb-2">
            <el-alert title="通过el-watermark组件实现" type="warning" :closable="false" />
        </el-card>
        <Watermark :watermarkOptions="(formOptions.model as any)">
            <el-card class="mt-2">
                <CustomForm :form-options="formOptions" :form-item-options-list="formItemOptionsList"></CustomForm>
            </el-card>
        </Watermark>
    </div>
</template>

<script setup lang="ts">
import { FormOptions, FormItemOptions } from "@/typings/customForm"
import CustomForm from "@/components/customForm/form.vue"
import Watermark from "@/components/watermark/index.vue";

let formOptions = ref<FormOptions>({
    model: {
        content: 'element-plus',
        // image: "https://element-plus.org/images/element-plus-logo.svg",
        // width: 130,
        // height: 30
        rotate: -22
    },
    'label-position': 'top',
    rules: {}
})

let formItemOptionsList = ref<FormItemOptions[]>([
    {
        label: '自定义水印内容',
        prop: 'content',
        controlName: 'input',
        bindControlOptions: {
            placeholder: '请输入内容',
            type: 'textarea'
        }
    },
    {
        label: '旋转角度',
        prop: 'rotate',
        controlName: 'slider',
        bindControlOptions: {
            // placeholder: '请输入内容',
            max: 180,
            min: -180
        }
    }
])

</script>