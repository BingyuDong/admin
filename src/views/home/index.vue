<template>
  <div class="home">
    <div class="pc:flex">
      <div class="w-full  pc:mr-[10px]">
        <div class="w-full pc:flex">
          <!-- 个人信息 -->
          <el-card class="w-full h-[200px] mb-[10px]">
            <template #header>个人信息</template>
            <div class="flex items-center justify-between h-[100px]">
              <div class="flex items-center h-full">
                <div class="w-[60px] h-[60px]">
                  <el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </div>
                <div class="ml-[10px]">
                  <div class="flex items-center ">
                    <div class="text-[20px] font-semibold max-w-[113px] pc:max-w-full" v-ellipsis>SuperAdmin</div>
                    <div class="ml-[10px]"><el-tag>超级管理员</el-tag></div>
                  </div>
                  <div class="flex items-center mt-[4px]">
                    <div class="ml-[2px] text-[14px] flex items-center"><el-icon class="mr-[4px]">
                        <Iphone />
                      </el-icon>superadmin</div>
                    <el-divider direction="vertical" />
                    <div class="ml-[2px] text-[14px] flex items-center"><el-icon class="mr-[4px]">
                        <Star />
                      </el-icon>100</div>
                  </div>
                </div>
              </div>
              <div class="ml-[10px]">
                <el-button type="primary" icon="Edit" circle />
              </div>
            </div>
          </el-card>
        </div>
        <div class="w-full mb-[10px] pc:mb-0">
          <!-- 任务进度 -->
          <el-card class="w-full h-[190px]">
            <template #header>任务进度</template>
            <div class="h-[90px]">
              <div class="w-full h-full flex items-center justify-between">
                <div class="flex justify-center">
                  <el-progress :width="60" type="circle" :percentage="100" />
                </div>
                <div class="flex justify-center" style="text-align: center;">
                  <el-statistic title="总任务数" :value="0" />
                </div>
                <div class="flex justify-center" style="text-align: center;">
                  <el-statistic title="完成数" :value="0" />
                </div>
                <div class="flex justify-center" style="text-align: center;">
                  <el-statistic title="待完成数" :value="0" />
                </div>
                <div class="flex justify-center" style="text-align: center;">
                  <div>
                    <el-button type="primary" icon="MoreFilled" circle />
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </el-card>
        </div>
      </div>
      <!-- 轮播图 -->
      <el-card class="w-full mb-[10px] pc:mb-0 h-[400px]">
        <template #header>轮播</template>
        <el-carousel class="overflow-hidden rounded">
          <el-carousel-item v-for="item in carouselList" :key="item.key">
            <div class="flex justify-center items-center h-[400px] overflow-hidden">
              <!-- 2k -->
              <img class="h-full max-w-[900px]" :src="item.img" alt="">
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </div>
    <div class="mt-[10px] pc:flex">
      <!-- 操作日志 -->
      <el-card class="w-full mb-[10px] pc:mr-[10px] pc:mb-0 h-[400px]">
        <template #header>操作日志</template>
        <div class="dark_item p-[20px] h-[300px] overflow-auto" style="border: 0.5px solid rgba(0,0,0,.1)">
          <el-timeline class="w-[100%]">
            <el-timeline-item timestamp="2018/4/12" placement="top" v-for="item in 10">
              <el-card>
                <h4>用户（admin）执行删除</h4>
                <p>Tom committed 2018/4/12 20:46</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-card>
      <el-card class="w-full h-[400px]">
        <template #header>数据展示</template>
        <div class="w-full h-[300px]">
          <CustomEcharts ref="chart" :options="options" />
        </div>
      </el-card>
    </div>
    <div class="mt-[10px] pc:flex">
      <el-card class="w-full">
        <template #header>快捷入口</template>
        <div class="w-full flex  overflow-auto px-[10px] pb-[6px]">
          <el-button type="primary" plain v-for="(item, index) in quickBtnList" key="index" @click="router.push(item.path)">
            <el-icon class="mr-[4px] iconfont" :class="item.icon">
              <component :is="item.iconComponent" v-if="item.iconComponent"></component>
            </el-icon>
            {{ item.title }}
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import CustomEcharts from "@/components/customEcharts/index.vue";
import { useElementSize } from '@vueuse/core'

const router = useRouter()

const chart = ref<any>(null)
const { width: chartW, height: chartH } = useElementSize(chart)

// 轮播列表
let carouselList = ref([
  { key: 1, img: '../../../src/assets/images/banner1.png' },
  { key: 2, img: '../../../src/assets/images/banner2.png' },
  { key: 3, img: '../../../src/assets/images/banner3.png' },
  { key: 4, img: '../../../src/assets/images/banner4.png' },
  { key: 5, img: '../../../src/assets/images/banner5.png' }
])

// 快捷入口按钮
let quickBtnList = ref([
  { title: '表格基本使用', icon: 'el-icon-menutable', iconComponent: '', path: '/superTable/basis' },
  { title: '表单基本使用', icon: 'el-icon-biaodan', iconComponent: '', path: '/superForm/basis' },
  { title: 'echarts基本使用', icon: 'el-icon-echarts', iconComponent: '', path: '/echarts/basis' }
])

const errorHandler = () => true

const options = ref({
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 2',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 282, 111, 234, 220, 340, 310]
    },
    {
      name: 'Line 3',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 132, 201, 334, 190, 130, 220]
    },
    {
      name: 'Line 4',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 402, 231, 134, 190, 230, 120]
    },
    {
      name: 'Line 5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 191, 0)'
          },
          {
            offset: 1,
            color: 'rgb(224, 62, 76)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 302, 181, 234, 210, 290, 150]
    }
  ]
});

watch(() => chartW.value, () => {
  chart.value.resize()
})
</script>

<style scoped lang="scss">
:deep(.el-carousel__arrow) {
  background-color: rgba(204, 204, 204, .5) !important;
}

:deep(.el-carousel__button) {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(204, 204, 204, 1);
}</style>
