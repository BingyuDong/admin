<template>
  <div>
    <el-card>
      <el-alert title=" 基于driver.js实现" type="warning" :closable="false" />
    </el-card>
    <el-card class="mt-2">
      <div class="mt-2">
        <el-button type="info" class="step1">info</el-button>
        <el-button type="warning" class="step2">warning</el-button>
        <el-button type="danger" class="step3">danger</el-button>
      </div>
      <div class="mt-6">
        <el-button type="primary" @click="openGuide">开启引导页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
// 引入driver逻辑
import { driver } from "driver.js";
// 引入driver样式
import "driver.js/dist/driver.css";

// driver配置对象
const driverObj = driver({
  // 显示步骤进度
  showProgress: true,
  // 不允许其它方式关闭
  allowClose: true,
  nextBtnText: '下一个',
  prevBtnText: '上一个',
  doneBtnText: '完成',
  steps: [
    { element: '.step1', popover: { title: 'info按钮', description: 'type=info', side: "left", align: 'start' } },
    { element: '.step2', popover: { title: 'warning按钮', description: 'type=warning', side: "right" } },
    { element: '.step3', popover: { title: 'danger按钮', description: 'type=danger', side: "bottom" } }
  ]
});


const openGuide = () => {
  driverObj.drive()
}
</script>

<style scoped lang="scss"></style>
