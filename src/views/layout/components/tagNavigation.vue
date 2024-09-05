<template>
  <div class="dark_item tabs-box bg-white h-[40px] relative items-center"
    style="padding: 0 50px 0 20px;border-bottom: 1px solid rgba(0,0,0,.1);">
    <el-tabs type="card" class="dark_item">
      <el-tab-pane label="首页" v-for="item in tagNavigationList">
        <template #label>
          <el-tag :type="route.path == item.path ? '' : 'info'" :closable="item.path != '/'"
            @click="changeActiveTagPath(router, item.path)" @close="delTagNavigation(router, item, route.path)">{{
              item.title }}</el-tag>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="absolute right-[20px] top-[0px] h-[100%] flex items-center">
      <el-dropdown>
        <el-button icon="ArrowDownBold" circle size="small"></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in options" :divided="item.divided" :disabled="item.disabled" @click="item.methods"> 
            <el-icon class="iconfont" :class="item.icon">
              <component :is="`${item.icon}`"></component>
            </el-icon>
              {{ item.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useTagNavigationStore } from "@/stores/tagNavigationStore"

let _useTagNavigationStore = useTagNavigationStore()

let { tagNavigationList } = storeToRefs(_useTagNavigationStore)
const { addTagNavigation, delTagNavigation, changeActiveTagPath, closeNow, closeLeft, closeRighe, closeOther, closeAll  } = _useTagNavigationStore

let router = useRouter()

let route = useRoute()

const reload = inject('reload') as any

// 下拉列表操作栏
let options = [
{
    title:'刷新',
    icon:'Refresh',
    methods:() => {
      reload() 
    },
    divided: false,
    disabled: false
  },
  {
    title:'关闭左侧',
    icon:'DArrowLeft',
    methods:() => {
      closeLeft(route.path,router)
    },
    divided: true,
    disabled: false
  },
  {
    title:'关闭右侧',
    icon:'DArrowRight',
    methods:() => {
      closeRighe(route.path,router)
    },
    divided: false,
    disabled: false
  },
  {
    title:'关闭当前',
    icon:'DocumentDelete',
    divided: false,
    disabled: false,
    methods:() => {
      closeNow(route.path,router)
    },
  },
  {
    title:'关闭其他',
    icon:'FolderRemove',
    methods:() => {
      closeOther(route.path,router)
    },
    divided: false,
    disabled: false
  },
  {
    title:'关闭所有',
    icon:'FolderDelete',
    methods:() => {
      closeAll(route.path,router)
    },
    divided: true,
    disabled: false
  },
]

// 监听路由实现动态添加标签
watch(
  route,
  (newVal, oldVal) => {
    let path = newVal.path
    let title = newVal.meta.title as string
    addTagNavigation({ path, title })
  },
  {
    deep: true,
    immediate: true
  }
)

</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
  display: none;
}

:deep(.el-tabs--card) {
  height: 100%;

  .el-tabs__header {
    border: none;

    .el-tabs__item {
      border: none;
    }

    .el-tabs__nav {
      border: none;
    }
  }
}

:deep(.el-tabs__item) {
  padding: 0 !important;
  margin-right: 16px;
}

:deep(.el-tabs__nav-scroll) {
  border: none !important;

  ::after {
    display: none;
  }
}

:deep(.is-scrollable) {
  padding: 0 34px;
}

:deep(.el-tabs__nav-prev) {
  // background-color: red; 
  height: 22px;
  width: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 9px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, .3);
  border-radius: 50%;
}

:deep(.el-tabs__nav-next) {
  // background-color: red; 
  height: 22px;
  width: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 9px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, .3);
  border-radius: 50%;
}
</style>
