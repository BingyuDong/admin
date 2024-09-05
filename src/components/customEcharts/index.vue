<template>
    <div :style="{width,height}" ref="echartsRef"></div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, watch, PropType } from "vue";
import { useEcharts, EChartsCoreOption } from "@/hooks/useEcharts"; // 引入hooks

const props = defineProps({
    options: { type: Object as PropType<EChartsCoreOption>, required: true },
    height: { type: String, default: "100%" },
    width: { type: String, default: "100%" },
    themeColors: { type: Array as PropType<string[]>, default: () => [] },
});

const echartsRef = ref();

const { setOptions, initCharts, resize } = useEcharts(echartsRef, props.options);

watch(
    props.options,
    (nVal) => {
        let targetOptions: EChartsCoreOption = {};
        if (props.themeColors && props.themeColors.length > 0) {
            targetOptions = { ...nVal };
            targetOptions.color = props.themeColors;
        } else {
            targetOptions = { ...nVal };
        }
        setOptions(targetOptions);
    }
);

// 抛出方法
defineExpose({
    // 提供父组件一个resize方法
    resize: resize
})

onMounted(() => {
    initCharts();
});
</script>
  