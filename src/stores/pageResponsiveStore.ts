import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const pageResponsiveStore = defineStore('pageResponsive', () => {
    // 是否为移动端
    let isMobileTerminal = ref<boolean>(false)

    // 移动端菜单默认样式
    let moblieMenuDefaultStyle = ref<string>('fixed h-full z-[100] duration-300')
    
    // 移动端菜单关闭样式
    let mobliemCloseMenu = ref<string>('translate-x-[-220px]')


    // 是否为移动端之间的切换
    let changeMobileTerminal = (flag: boolean) => {
        isMobileTerminal.value = flag
    }

    return {isMobileTerminal, moblieMenuDefaultStyle, mobliemCloseMenu, changeMobileTerminal}
})