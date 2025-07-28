import axios from 'axios'
import { useAuthStore } from '@/stores/auth' // 导入 auth store

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ★★★ 请求拦截器 ★★★
// 在每个请求被发送之前，都会执行这个函数
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token

    if (token) {
      // 如果存在 token，则在请求头中添加 Authorization
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 导出一个包含所有 API 请求方法的对象
export default {
  // 登录请求
  loginUser(credentials) {
    return apiClient.post('/auth/login', credentials)
  },

  // 注册用户请求
  registerUser(userData) {
    return apiClient.post('/auth/register', userData)
  },

  // ↓↓↓ 新增的 API 方法 ↓↓↓

  // 获取当前预算状态
  getBudgetStatus() {
    return apiClient.get('/v1/budget/status')
  },

  // 获取所有交易记录
  getTransactions() {
    return apiClient.get('/v1/transactions')
  },

  // 添加新交易记录
  addTransaction(transactionData) {
    return apiClient.post('/v1/transactions', transactionData)
  },
  setBudget(budgetData) {
    return apiClient.post('/v1/budget', budgetData);
  }
}