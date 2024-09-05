import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Router } from 'vue-router'

export const useTagNavigationStore = defineStore('tagNavigation', () => {
    // 当前缓存标签列表
    let tagNavigationList = ref<tagNavigation[]>(
        [{
            title: '首页',
            path: '/'
        }]
    )

    // 添加tag
    const addTagNavigation = (tagNavigation: tagNavigation) => {
        if (!tagNavigationList.value.some(item => item.path == tagNavigation.path)) {
            tagNavigationList.value.push(tagNavigation)
        }
    }

    // 删除tag
    const delTagNavigation = (router: Router, tagItem: tagNavigation, nowPath: string) => {
        let index = tagNavigationList.value.findIndex(item => item.path == tagItem.path)
        if ((tagItem.path == nowPath && index != -1) || (nowPath == tagItem.redirect)) {
            router.push(tagNavigationList.value[index - 1].path)
        }
        tagNavigationList.value = tagNavigationList.value.filter(item => item.path != tagItem.path)
    }

    // 更改当前路由
    const changeActiveTagPath = (router: Router, path: string) => {
        router.push(path)
    }

    // 关闭当前
    const closeNow = (path: string, router: Router) => {
        let index = tagNavigationList.value.findIndex(item => item.path == path)
        
        if ((index > 0) && path != '/') {
            router.push(tagNavigationList.value[index - 1].path)
            tagNavigationList.value = tagNavigationList.value.filter(item => item.path != path)
        }
    }

    // 关闭左侧
    const closeLeft = (path: string, router: Router) => {
        let index = tagNavigationList.value.findIndex(item => item.path == path)
        console.log('aa',index);

        if (index > 0) {
            tagNavigationList.value = tagNavigationList.value.filter((item, idx) => (idx >= index || idx==0 ))
        }
        
    }

    // 关闭右侧
    const closeRighe = (path: string, router: Router) => {
        let index = tagNavigationList.value.findIndex(item => item.path == path)
        if (index < 0) return
        tagNavigationList.value = tagNavigationList.value.filter((item, idx) => (idx <= index || idx == 0))
    }

    // 关闭其他
    const closeOther = (path: string, router: Router) => { 
        let index = tagNavigationList.value.findIndex(item => item.path == path)
        if (index < 0) return
        tagNavigationList.value = tagNavigationList.value.filter((item, idx) => (idx == index || idx == 0))
     }

    // 关闭所有
    const closeAll = (path: string, router: Router) => { 
        let index = tagNavigationList.value.findIndex(item => item.path == path)
        if (index != 0){
            router.push(tagNavigationList.value[0].path)
        }
        tagNavigationList.value = tagNavigationList.value.filter((item, idx) => (idx == 0))
     }

    return { tagNavigationList, addTagNavigation, delTagNavigation, changeActiveTagPath, closeNow, closeLeft, closeRighe, closeOther, closeAll }
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