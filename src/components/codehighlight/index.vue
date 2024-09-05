<template>
    <div class="codehighlight relative">
        <highlightjs autodetect :code="props.code" :language="props.language"></highlightjs>
        <el-button class="absolute top-[10px] right-[10px]" type="info" icon="CopyDocument" circle v-copy="props.code" plain/>
    </div>
</template>
  
<script setup lang="ts">
const props = defineProps<{
        code: any
        language?: string
}>()
</script>
  
<style scoped lang="scss"></style>
  