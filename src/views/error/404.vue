<template>
    <div class="dark_box w-[100vw] h-[100vh] flex justify-center items-center">
        <div class="pc:flex items-center">
            <div class="flex items-center justify-center">
                <img src="../../assets/images/404.png" style="width: 300px" alt="" />
            </div>
            <div class="mt-8 pc:mt-0 pc:ml-8 " >
                <div class="w-[100%] flex justify-center pc:justify-normal"><el-text style="font-size:50px; font-weight: 550;">404</el-text></div>
                <div class="w-[100%] flex justify-center"><el-text style="font-size:20px">抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</el-text></div>
                <div class="mt-4 w-[100%] flex justify-center pc:justify-normal"><el-button type="primary" @click="router.push('/')">返回首页</el-button></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { pageResponsiveStore } from "@/stores/pageResponsiveStore";

let _pageResponsiveStore = pageResponsiveStore()

let router = useRouter()
</script>

<style scoped lang="scss"></style>
