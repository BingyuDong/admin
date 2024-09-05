declare global {
    interface thmem {
        isDark: boolean
        themeColors: string
        isHeaderReversal: boolean
        isMenuReversal: boolean
        isBreadCrumbs: boolean
        isGrayscale: boolean
        isFullScreen: boolean
        isUniqueOpened: boolean
        isTagNavigation: boolean
        activeAnimate: {
            enterActive: string
            leaveActive: string
        }
        [key: string] : any
    }
}

export { }