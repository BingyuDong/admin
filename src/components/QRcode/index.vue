<template>
    <div class="qr_code">
        <QrcodeVue level="H" :value="props.QRcodeOptions.value" :size="props.QRcodeOptions.size"
            :margin="props.QRcodeOptions.margin" :foreground="props.QRcodeOptions.fontcolor"
            :background="props.QRcodeOptions.bgcolor"></QrcodeVue>
        <!-- {{ props.QRcodeOptions }} -->
    </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'

interface QRcodeOptionsType {
    value: string
    size: number
    margin: number
    fontcolor: string
    bgcolor: string
}

const props = defineProps<{QRcodeOptions: QRcodeOptionsType}>()
</script>

<style scoped lang="scss"></style>
