import axios from '@/api/index'

export const api = {
    user: {
        login: async (params: LoginParams) => {
            const { data } = await axios.post('/user/login', params)
            return data as Loginrespond
        }
    }
}