<template>
    <el-card class="" v-loading="loading" body-style="padding:0" v-bind="ladingConfig">
      <iframe src="https://ppchart.com/#/" frameborder="0" class="full-iframe" ref="iframe"
        @load="iframeLoaded"></iframe>
    </el-card>
  </template>
    
  <script setup lang="ts">
  import { ladingConfig } from "@/config/loadingConfig"
  let loading = ref(true)
  const iframe = ref(null)
  
  const iframeLoaded = () => {
    loading.value = false
  }
  </script>
  <style scoped lang="scss">
  .full-iframe {
    width: 100%;
    min-height: calc(100vh - 120px);
  }
  </style>