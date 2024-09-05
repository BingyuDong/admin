import axios from 'axios'
import { ElMessage } from 'element-plus'
// import md5 from 'md5'
import {useUserStore} from "@/stores/userStore"

// 对状态码进处理
const errorHandle = (status: number | string, other: any): void => {
  switch (status) {
    case 500:
      ElMessage.error('服务器异常')
      break
    case 400:
      ElMessage.error('信息校验失败')
      break
    case 401:
      ElMessage.error('认证失败')
      break
    case 403:
      ElMessage.error('token校验失败')
      break
    case 404:
      ElMessage.error('请求的资源不存在')
      break
    default:
      ElMessage.error(other)
      break
  }
}

// 创建axios实例
const instance = axios.create({
  withCredentials: true,
  timeout: 10000,
  // baseURL: import.meta.env.VITE_PROXY_PREFIX
  baseURL: import.meta.env.VITE_PROXY_PREFIX
})

// 添加请求拦截器(post只能接受字符串类型数据)
instance.interceptors.request.use(
  (config) => {
    console.log('请求==============>', config);
    let token = useUserStore().token
    if(token){
      (config as any).headers[import.meta.env.VITE_TOKEN_NAME] = token;
      // let timeStamp = useTimestamp().value;
      // (config as any).headers["timeStamp"] = timeStamp;
      // (config as any).headers["sign"] = md5(`timestamp=${timeStamp}${import.meta.env.VITE_SALT}`);
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  // 响应包含以下信息data,status,statusText,headers,config
  (res) => {
    console.log('响应==============>', res);
    if (res.status === 200) {
      // return Promise.resolve(res.data)
      if (res.data.code == 0) {
        return Promise.resolve(res.data)
      } else {
        ElMessage.error(res.data.msg||'请求错误')
        return Promise.reject(res)
      }
    } else {
      return Promise.reject(res)
    }
  },
  (err) => {
    const { response } = err
    if (response) {
      errorHandle(response.status, response.data)
      return Promise.reject(response)
    }
    ElMessage.error('请求失败')
    // return true
  }
)

export default instance
