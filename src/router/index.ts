import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useMenuStore } from '@/stores/menuStore'
import { thmemStore } from "@/stores/thmemStore"
import { useUserStore } from "@/stores/userStore"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'  // 导入样式，否则看不到效果

NProgress.configure({ showSpinner: false })

const router = createRouter({
  // history: createWebHistory(process.env.NODE_ENV === 'production' ? '/admin-test/' : ''),
  history: createWebHistory(import.meta.env.VITE_BASE),
  // history: createWebHashHistory(import.meta.env.VITE_BASE),
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {
        title: '首页',
        icon: ''
      },
      component: () => import('@/views/layout/index.vue'),
      children: []
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/login/register.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      meta: {
        title: '404',
        icon: ''
      },
      component: () => import('@/views/error/404.vue')
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  console.log('初始化菜单和路由');
  await useMenuStore().initMenuAndRouterData(useRouter())
  useMenuStore().setCurrentRoutePath(to.fullPath)
  next()
  // let token = useUserStore().token
  // if (to.path === '/login') {
	// 	if (token && token != '') {
	// 		next('/')
	// 	} else {
	// 		next()
	// 	}
	// } else {
	// 	if (token && token != '') {
	// 		next()
	// 	} else {
	// 		next('/login')
	// 	}
	// }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
