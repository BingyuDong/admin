<template>
    <!-- 自定义插槽 -->
    <el-form-item v-bind="item" v-if="item.slot && !item.hide">
        <template #default v-if="item.slot">
            <slot :name="item.slot" :item="item"></slot>
        </template>
    </el-form-item>
    <!-- radio单选框 -->
    <el-form-item v-bind="item" v-else-if="!item.hide && item.controlName == 'radio'">
        <el-radio-group v-bind="item.bindControlOptions" v-model="props.formOptions.model[item.prop]">
            <el-radio v-for="data in item.bindControlOptions!.radioOptionsList" v-bind="data">{{ data.optionName
            }}</el-radio>
        </el-radio-group>
    </el-form-item>
    <!-- select选择器 -->
    <el-form-item v-bind="item" v-else-if="!item.hide && item.controlName == 'select'">
        <el-select v-bind="item.bindControlOptions" v-model="props.formOptions.model[item.prop]">
            <el-option v-for="data in item.bindControlOptions?.selectOptionsList" v-bind="data" />
        </el-select>
    </el-form-item>
    <!-- 默认控件 -->
    <el-form-item v-bind="item" v-else-if="!item.hide">
        <component :is="`el-${item.controlName}`" v-model="props.formOptions.model[item.prop]"
            v-bind="item.bindControlOptions"></component>
    </el-form-item>
</template>

<script setup lang="ts">
import { FormOptions, FormItemOptions } from "@/typings/customForm"
const props = defineProps<
    {
        formOptions: FormOptions
        item: FormItemOptions
    }
>()

</script>

<style scoped lang="scss"></style>
