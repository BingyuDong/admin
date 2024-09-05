<template>
  <div class="" style="height: calc(100vh - 150px);z-index: 98;">
    <div class="dark_box flex justify-between items-center w-[100%] h-[40px]  mb-2 pl-[20px] pr-[20px]">
      <el-text style="font-size: 20px; font-weight: 550;">Markdown</el-text>
      <el-link type="primary" href="https://www.npmjs.com/package/mavon-editor/v/next" target="_blank">markdown编辑器文档</el-link>
    </div>
    <mavon-editor class="h-[100%]" v-model="value"/>
  </div>
</template>

<script setup lang="ts">
let value = ref<string>('')
</script>

<style scoped lang="scss">
  :deep(.markdown-body){
    z-index: 98 !important;
  }
</style>
