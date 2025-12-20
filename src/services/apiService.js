import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// API 基址：优先读取环境变量，未设置则回退到本机 8080 端口
const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
if (import.meta.env.DEV) {
  // 方便定位移动端未取到正确基址的情况
  console.info('[api] baseURL =', apiBaseURL)
}

const apiClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器：自动附加 Authorization 头
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('[api] request error before send', error)
    }
    return Promise.reject(error)
  }
)

export default {
  // 登录
  loginUser(credentials) {
    return apiClient.post('/auth/login', credentials)
  },

  // 注册
  registerUser(userData) {
    return apiClient.post('/auth/register', userData)
  },

  // 获取预算状态
  getBudgetStatus() {
    return apiClient.get('/v1/budget/status')
  },

  // 获取交易列表
  getTransactions() {
    return apiClient.get('/v1/transactions')
  },

  // 添加交易
  addTransaction(transactionData) {
    return apiClient.post('/v1/transactions', transactionData)
  },

  // 设置预算
  setBudget(budgetData) {
    return apiClient.post('/v1/budget', budgetData)
  }
}