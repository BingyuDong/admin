import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { RouteRecordRaw, Router } from 'vue-router'
import { menuData } from "@/router/assets_menu"
const pageModules = import.meta.glob('@/views/**/**.vue')

export const useMenuStore = defineStore(
  'menu',
  () => {
    let isCollapse = ref(false)
    let menuOptions = ref<Array<RouteRecordRaw & {redirect?:string}>>()
    let routerOptions = ref<RouteRecordRaw[]>()
    let menuDataList = ref<Menu[]>()
    // 当前菜单路径
		let currentRoutePath = ref<string>('')

    /**
		 * 设置当前路由地址
		 */
		const setCurrentRoutePath = (path: string) => {
			currentRoutePath.value = path
		}

    // 获取menu菜单数据
    const getMenuData = async () => {
      // return menuData
      return menuData.filter(item => item.isShow) as Menu[]
    }

    // 获取路由数据
    const getRouterData = async () => {
      return menuData as Menu[]
    }

    // 将menu转换为树形结构并且生成路由对象
    const listToTree = async (menuList: Menu[]) => {
      let routerList = menuList.map(item => ({
          // path: item.component,
          // component: pageModules[item.path],
          path: item.path,
          component: pageModules[item.component],
          meta: { title: item.title, icon: item.icon },
          parentId: item.parentId,
          id: item.id,
          name: item.name,
          redirect: item.redirect
        })
      )
      let map = routerList.reduce((prev: any, item) => {
        return prev[item.id] = item, prev
      }, {})
      routerList.forEach(item => {
        if (item.parentId) {
          map[item.parentId].children ? map[item.parentId].children.push(item) : map[item.parentId].children = [item]
        }
      })
      return routerList.filter(v => {
        return !v.parentId
      })
    }

    // 将路由对象添加到路由表中
    const addOptionToRouter = (router: Router, routerOptiuons: RouteRecordRaw[]) => {
      routerOptiuons.forEach((item) => {
        router.addRoute('main', item)
      })
    }

    // 初始化菜单和路由
    const initMenuAndRouterData = async (router: Router) => {
      return new Promise<boolean>(async (resolve, reject) => {
        let menuData = await getMenuData()
        let routerData = await getRouterData()
        menuDataList.value = menuData
        let _routerData = await listToTree(routerData)
        let _menuData = await listToTree(menuData)
        routerOptions.value = _routerData as RouteRecordRaw[]
        menuOptions.value = _menuData as Array<RouteRecordRaw & {redirect?:string}>
        addOptionToRouter(router, routerOptions.value!)
        resolve(true)
      })  
    }


    // 更改菜单伸缩状态
    const changeCollapse = (falg:boolean) => {
      isCollapse.value = falg
    }

    return { isCollapse, changeCollapse, menuDataList, menuOptions, routerOptions, initMenuAndRouterData, currentRoutePath, setCurrentRoutePath  }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'menu',
          storage: sessionStorage
        }
      ]
    }
  }
)
