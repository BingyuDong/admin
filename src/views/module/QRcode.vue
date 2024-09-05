<template>
    <div class="">
        <el-card class="mb-2">
            <el-alert title="基于qrcode.vue实现" type="warning" :closable="false" />
        </el-card>
        <el-card>
            <Qrcode :QRcodeOptions="(formOptions.model as any)"></Qrcode>
        </el-card>
        <el-card class="mt-2">
            <CustomForm :form-options="formOptions" :form-item-options-list="formItemOptionsList"></CustomForm>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { FormOptions, FormItemOptions } from "@/typings/customForm"
import CustomForm from "@/components/customForm/form.vue"
import Qrcode from "@/components/QRcode/index.vue";


let formOptions = ref<FormOptions>({
    model: {
        value: 'QRcode',
        margin: 1,
        size: 200,
        bgcolor: '#fff',
        fontcolor: '#000'
    },
    'label-position': 'top',
    rules: {}
})

let formItemOptionsList = ref<FormItemOptions[]>([
    {
        label: '内容',
        prop: 'value',
        controlName: 'input',
        bindControlOptions: {
            placeholder: '请输入内容',
            type: 'textarea'
        }
    },
    {
        label: '边距',
        prop: 'margin',
        controlName: 'input-number',
        bindControlOptions: {
            placeholder: '请输入边距',
            min: 0
        }
    },
    {
        label: '宽度',
        prop: 'size',
        controlName: 'input-number',
        bindControlOptions: {
            placeholder: '请输入宽度',
            step: 10,
            min: 100,
            max: 400
        }
    },
    {
        label: '颜色',
        prop: 'fontcolor',
        controlName: 'color-picker',
        bindControlOptions: {
            placeholder: '请选择颜色'
        }
    },
    {
        label: '背景色',
        prop: 'bgcolor',
        controlName: 'color-picker',
        bindControlOptions: {
            placeholder: '请选择背景色'
        }
    },

])
</script>

<style scoped lang="scss"></style>
