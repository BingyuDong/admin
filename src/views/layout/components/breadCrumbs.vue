<template>
  <div class="bread-crumbs">
    <el-breadcrumb separator="/">
      <TransitionGroup name="list" tag="ul">
        <template v-for="(item, index) in dataList" :key="item.name">
          <el-breadcrumb-item :to="item.path" v-if="item.name != 'home'">
            {{
              item.meta.title
            }}
          </el-breadcrumb-item>
        </template>
      </TransitionGroup>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
let route = useRoute()

let dataList = ref(route.matched)
// console.log(dataList.value)

watch(route, (newVal, oldVal) => {
  dataList.value = newVal.matched
})
</script>

<style lang="scss" scoped>
.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
