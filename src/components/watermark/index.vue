<template>
    <div class="watermark">
        <el-watermark :font="{
            color: thmem.isDark ? 'rgba(189, 189, 192, .15)' : 'rgba(0, 0, 0, .15)',
        }" v-bind="(props.watermarkOptions as any)">
            <slot></slot>
        </el-watermark>
    </div>
</template>

<script setup lang="ts">
import { thmemStore } from "@/stores/thmemStore"
let { thmem } = storeToRefs(thmemStore())

interface WatermarkOptions {
    class?: string
    width?: number
    height?: number
    rotate?: number
    zIndex?: number
    image?: string
    content: string[] | string
    gap?: number[]
    offset?: number[]
}

const props = defineProps<{ watermarkOptions: WatermarkOptions }>()
</script>