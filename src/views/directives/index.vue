<template>
    <div>
        <el-card>
            <div class="flex items-center">
                <el-text class="font-semibold">按钮权限</el-text>
                <el-tag class="ml-2">v-btnPermissionVerify</el-tag>
            </div>
            <div class="flex items-center w-full mt-[16px] ml-1">
                待接口完善
            </div>
        </el-card>

        <el-card class="mt-[10px]">
            <div class="flex items-center">
                <el-text class="font-semibold">内容复制</el-text>
                <el-tag class="ml-2">v-copy</el-tag>
            </div>
            <div class="flex items-center w-full max-w-[500px] mt-[16px] ml-1">
                <el-input v-model="value" clearable placeholder="请输入复制内容"></el-input>
                <el-button class="ml-1" type="primary" v-copy=value>复制</el-button>
            </div>
        </el-card>

        <el-card class="mt-[10px]">
            <div class="flex items-center">
                <el-text class="font-semibold">文字溢出省略</el-text>
                <el-tag class="ml-2">v-ellipsis</el-tag>
            </div>
            <div class="flex items-center mt-[16px] ml-1 w-full">
                <el-text v-ellipsis>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est illum suscipit ad laudantium odit. Quos
                    dignissimos quisquam laudantium, error laborum unde aperiam voluptas facilis inventore in provident,
                    veniam, possimus cum.
                </el-text>
            </div>
        </el-card>

        <el-card class="mt-[10px]">
            <div class="flex items-center">
                <el-text class="font-semibold">防抖按钮</el-text>
                <el-tag class="ml-2">v-debounce</el-tag>
            </div>
            <div class="flex items-center w-full max-w-[500px] mt-[16px] ml-1">
                <el-input v-model="debounceValue" disabled></el-input>
                <el-button class="ml-1" type="primary" v-debounce:2000="debounceFn">增加</el-button>
            </div>
        </el-card>

        <el-card class="mt-[10px]">
            <div class="flex items-center">
                <el-text class="font-semibold">节流按钮</el-text>
                <el-tag class="ml-2">v-throttle</el-tag>
            </div>
            <div class="flex items-center w-full max-w-[500px] mt-[16px] ml-1">
                <el-input v-model="throttleValue" disabled></el-input>
                <el-button class="ml-1" type="primary" v-throttle:1000="throttleFn">增加</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
let value = ref<string>('SuperAdmin')

let debounceValue = ref(1)
const debounceFn = () => {
    debounceValue.value = debounceValue.value + 1
}

let throttleValue = ref(1)
const throttleFn = () => {
    throttleValue.value = throttleValue.value + 1
}
</script>

<style scoped lang="scss"></style>
