import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// defineStore 的第一个参数是 store 的唯一 ID
export const useAuthStore = defineStore('auth', () => {
  // --- State ---
  // 从浏览器的 localStorage 中获取初始 token，这样刷新页面后登录状态不会丢失
  const token = ref(localStorage.getItem('jwt_token'))

  // --- Getters ---
  // 一个计算属性，用来判断用户是否已认证
  const isAuthenticated = computed(() => !!token.value)

  // --- Actions ---
  // 登录成功后调用的方法
  function login(newToken) {
    token.value = newToken
    localStorage.setItem('jwt_token', newToken)
  }

  // 退出登录时调用的方法
  function logout() {
    token.value = null
    localStorage.removeItem('jwt_token')
  }

  // 将 state, getters, actions return 出去，供组件使用
  return { token, isAuthenticated, login, logout }
})