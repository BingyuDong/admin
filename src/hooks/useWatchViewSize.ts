import { storeToRefs } from "pinia"
import { pageResponsiveStore } from "@/stores/pageResponsiveStore"
import { useMenuStore } from "@/stores/menuStore"
import{ thmemStore } from "@/stores/thmemStore"

const _pageResponsiveStore = pageResponsiveStore();
let { isMobileTerminal } = storeToRefs(_pageResponsiveStore)
const { changeMobileTerminal } = _pageResponsiveStore

const _useMenuStore = useMenuStore()
let { isCollapse } = storeToRefs(_useMenuStore)
const { changeCollapse } = _useMenuStore

const _thmemStore = thmemStore()
let { thmem } = storeToRefs(_thmemStore)
const { changeBreadCrumbs } = _thmemStore

export const useWatchViewSize = () => {

    const resize = () => {
        let w = document.documentElement.clientWidth;
        let h = document.documentElement.clientHeight;
        if (w >= 1024) {
            changeCollapse(false)
            changeMobileTerminal(false)
            changeBreadCrumbs(true)
        } else {
            changeCollapse(true)
            changeMobileTerminal(true)
            changeBreadCrumbs(false)
        }
        window.addEventListener('resize', () => {
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
            // console.log('页面大小发生了变化', `宽度：${w}`, `高度：${h}`);

            if (w >= 1024 && isMobileTerminal.value) {
                changeCollapse(false)
                changeMobileTerminal(false)
                changeBreadCrumbs(true)
            } else if(w < 1024 && !isMobileTerminal.value) {
                changeCollapse(true)
                changeMobileTerminal(true)
                changeBreadCrumbs(false)
            }
        });
    }
    return { resize }
}