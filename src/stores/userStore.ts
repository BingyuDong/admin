import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api/api'
import router from '@/router'
import {ElMessage} from "element-plus"

export const useUserStore = defineStore('userStore', () => {
    let token = ref<string>('')
    let userId = ref<string>('')
    let userInfo = ref()

    const login = async (params: LoginParams) => {
        const data = await api.user.login(params)
        token.value = data.token
        userId.value = data.userId
        ElMessage.success('登陆成功！')
        router.push('/')
    }

    const logOut = () => {
        token.value = ''
        userId.value = ''
        ElMessage.success('退出成功！')
        router.push('/login')
    }
    return { token, userInfo, login, logOut }
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'userStore',
                storage: localStorage
            }
        ]
    }
})