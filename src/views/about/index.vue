<template>
  <div>
    <el-card class="card mb-2">
      <h4 class="title">简介</h4>
      <span class="text">
        <el-link type="primary" href="" target="_blank">SuperAdmin</el-link>
        <el-link type="primary" href="" target="_blank"></el-link>
      </span>
    </el-card>
    <el-card class="card mb-2">
      <h4 class="title">项目信息</h4>
      <el-descriptions :column="isMobileTerminal?1:3" border>
        <el-descriptions-item label="版本号" label-align="left">
          <el-tag>{{ version }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="发布时间" label-align="left">
          <el-tag>{{ lastBuildTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="预览地址" label-align="left">
          <el-link type="primary" href="http://101.132.25.35/#/login" target="_blank"> 预览地址
          </el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="card mb-2">
      <h4 class="title">生产环境依赖</h4>
      <el-descriptions :column="isMobileTerminal?1:3" border>
        <el-descriptions-item v-for="(value, key) in dependencies" :key="key" width="400px" :label="key">
          <el-tag type="info">
            {{ value }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="card">
      <h4 class="title">开发环境依赖</h4>
      <el-descriptions :column="isMobileTerminal?1:3" border>
        <el-descriptions-item v-for="(value, key) in devDependencies" :key="key" width="400px" :label="key">
          <el-tag type="info">
            {{ value }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>
  
<script setup lang="ts">
import { pageResponsiveStore } from "@/stores/pageResponsiveStore"
let _pageResponsiveStore = pageResponsiveStore()
let { isMobileTerminal } = storeToRefs(_pageResponsiveStore)

const { pkg, lastBuildTime } = __APP_INFO__;
const { dependencies, devDependencies, version } = pkg;
</script>
  
<style lang="scss" scoped>
.card {
  .title {
    margin: 0 0 15px;
    font-size: 17px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }

  .text {
    font-size: 15px;
    line-height: 25px;
    color: var(--el-text-color-regular);

    .el-link {
      font-size: 15px;
    }
  }
}
</style>
  