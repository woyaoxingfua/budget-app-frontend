import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue' // ← 导入新组件
import { useAuthStore } from '@/stores/auth' // 导入我们的 auth store
import HistoryView from '../views/HistoryView.vue'
import BudgetView from '../views/BudgetView.vue'; // ← 导入新组件

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // ★★★ 给这个路由添加一个元信息，表示它需要认证
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    // ↓↓↓ 新增这个路由 ↓↓↓
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
      meta: { requiresAuth: true } // ★ 同样标记为需要认证
    },
    {
      path: '/budget',
      name: 'budget',
      component: BudgetView,
      meta: { requiresAuth: true } // ★ 同样需要登录
    }
  ]
})

// ★★★ 全局前置导航守卫 ★★★
router.beforeEach((to, from, next) => {
  // 在守卫中初始化 auth store，因为在文件顶层无法获取
  const authStore = useAuthStore()

  // 检查目标路由是否需要认证
  const requiresAuth = to.meta.requiresAuth

  // 检查用户是否已登录
  const isAuthenticated = authStore.isAuthenticated

  if (requiresAuth && !isAuthenticated) {
    // 如果需要认证但用户未登录，则重定向到登录页
    next('/login')
  } else if (to.name === 'login' && isAuthenticated) {
    // 如果用户已登录，但又想访问登录页，则将他重定向到主页
    next('/')
  } else {
    // 其他所有情况，正常放行
    next()
  }
})

export default router