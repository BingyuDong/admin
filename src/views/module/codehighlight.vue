<template>
  <div class="">
    <el-card class="mb-2">
      <el-alert title="基于highlightjs实现" type="warning" :closable="false" />
    </el-card>
    <el-card>
      <Codehighlight :code="options.code"></Codehighlight>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Codehighlight from "@/components/codehighlight/index.vue";
let options = {
  code:
    ` <template>
  <div>
    <h1>这里是代块展示区域</h1>
  </div>
</template>
`,
  language: 'html'
}
</script>

<style scoped lang="scss"></style>
