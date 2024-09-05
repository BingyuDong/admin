import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getDarkColor, getLightColor } from '@/utils/color'
import hljs from 'highlight.js';

export const thmemStore = defineStore('thmem', () => {

    // 主题变量
    let thmem = ref<thmem>({
        // 是否为黑夜模式
        isDark: false,
        // 主题颜色
        themeColors: '',
        // 是否为头部反转色
        isHeaderReversal: false,
        // 是否为侧边栏反转色
        isMenuReversal: false,
        // 是否使用面包屑
        isBreadCrumbs: true,
        // 是否灰色
        isGrayscale: false,
        // 是否全屏
        isFullScreen: false,
        // 侧边菜单是否是手风琴模式
        isUniqueOpened: true,
        // 是否展示标签栏
        isTagNavigation: true,
        activeAnimate: {
            // 切换页面进入样式
            enterActive: 'animate__fadeIn',
            // 切换页面退出样式
            leaveActive: 'animate__fadeOut'
        }
    })

    // 自定义主题色
    let _colorList = ref([
        '#409EFF',
        '#DAA96E',
        '#0C819F',
        '#722ed1',
        '#27ae60',
        '#ff5c93',
        '#e74c3c',
        '#fd726d',
        '#f39c12',
        '#9b59b6',
    ])

    // 切换暗黑模式
    const changeDark = (value: boolean) => {
        thmem.value.isDark = value
        const body = document.documentElement as HTMLElement
        thmem.value.isDark ? body.setAttribute('class', 'dark') : body.setAttribute('class', '')
    }

    // 切换主题颜色
    const changeThemeColors = (color: string) => {
        thmem.value.themeColors = color || _colorList.value[0]
        document.documentElement.style.setProperty(
            '--el-color-primary',
            thmem.value.themeColors
        )
        document.documentElement.style.setProperty(
            '--thmem-color',
            thmem.value.themeColors
        )

        // 颜色加深或变浅
        // for (let i = 1; i <= 9; i++) {
        //     document.documentElement.style.setProperty(
        //         `--el-color-primary-light-${i}`,
        //         thmem.value.isDark
        //             ? `${getDarkColor(thmem.value.themeColors, i / 10)}`
        //             : `${getLightColor(thmem.value.themeColors, i / 10)}`,
        //     )
        // }
        // for (let i = 1; i <= 9; i++) {
        //     document.documentElement.style.setProperty(
        //         `--el-color-primary-light-${i}`,
        //         `${getLightColor(thmem.value.themeColors, i / 10)}`
        //     )
        // }
        // for (let i = 1; i <= 9; i++) {
        //     document.documentElement.style.setProperty(
        //         `--el-color-primary-dark-${i}`,
        //         `${getDarkColor(thmem.value.themeColors, i / 10)}`
        //     )
        // }
    }

    // 切换头部反转色
    const changeHeaderReversal = (value: boolean) => {
        thmem.value.isHeaderReversal = value
    }

    // 切换侧边栏反转色
    const changeMenuReversal = (value: boolean) => {
        thmem.value.isMenuReversal = value
    }

    // 切换是否显示面包屑
    const changeBreadCrumbs = (value: boolean) => {
        thmem.value.isBreadCrumbs = value
    }

    // 切换是否变灰
    const changeGrayscale = (value: boolean) => {
        thmem.value.isGrayscale = value
        let html_box = document.getElementById('html_box')
        thmem.value.isGrayscale ? html_box!.style.filter = 'grayscale(100%)' : html_box!.style.filter = 'grayscale(0%)'
    }

    // 切换是否全屏
    const changeFullScreen = (value: boolean) => {
        thmem.value.isFullScreen = value
        let element = document.documentElement
        thmem.value.isFullScreen ? element.requestFullscreen() : document.exitFullscreen()
    }

    // 菜单是否为手风琴模式
    const changeUniqueOpened = (value: boolean) => {
        thmem.value.isUniqueOpened = value
    }

    // 切换是否展示标签栏
    const changeTagNavigation = (value: boolean) => {
        thmem.value.isTagNavigation = value
    }

    // 切换页面切换动画
    const changePagerAnimate = (activeAnimate: { enterActive: string, leaveActive: string }) => {
        thmem.value.activeAnimate = activeAnimate
    }

    // 初始化
    const initThmem = () => {
        thmem.value.isFullScreen = false
        changeGrayscale(thmem.value.isGrayscale)
        changeThemeColors(thmem.value.themeColors)
        changeDark(thmem.value.isDark)
        changeMenuReversal(thmem.value.isMenuReversal)
    }

    return { thmem, _colorList, initThmem, changeThemeColors, changeDark, changeHeaderReversal, changeMenuReversal, changeBreadCrumbs, changeGrayscale, changeFullScreen, changeUniqueOpened, changeTagNavigation, changePagerAnimate }
},
    {
        persist: {
            enabled: true,
            strategies: [
                {
                    key: 'thmem',
                    storage: localStorage
                }
            ]
        }
    }
)
