<template>
  <div v-if="authStore.isAuthenticated" class="app-layout">
    <header class="main-header">
      <h1 class="app-title">我的钱包</h1>

      <!-- 移动端汉堡包按钮 -->
      <button @click="toggleMobileNav" class="mobile-nav-toggle">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

      <!-- 桌面端导航 -->
      <div class="desktop-nav-links">
        <nav class="main-nav">
          <router-link to="/">主页</router-link>
          <router-link to="/history">账单历史</router-link>
          <router-link to="/budget">预算设置</router-link>
        </nav>
        <button @click="handleLogout" class="logout-button">退出登录</button>
      </div>
    </header>

    <!-- 移动端展开的导航 -->
    <div v-if="isMobileNavOpen" class="mobile-nav-links">
      <nav class="main-nav">
        <router-link to="/">主页</router-link>
        <router-link to="/history">账单历史</router-link>
        <router-link to="/budget">预算设置</router-link>
      </nav>
      <button @click="handleLogout" class="logout-button">退出登录</button>
    </div>

    <main class="content-area">
      <RouterView />
    </main>
    <footer class="app-footer">
      Copyright © 2025 github-woyaoxingfua. All Rights Reserved.
    </footer>
  </div>
  <RouterView v-else />
</template>

<script setup>
import { ref, watch } from 'vue';
import { RouterView, RouterLink, useRouter, useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const isMobileNavOpen = ref(false);

const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value;
};

const handleLogout = () => {
  if (isMobileNavOpen.value) {
    isMobileNavOpen.value = false;
  }
  authStore.logout();
  router.push('/login');
};

// 监听路由变化，在导航后关闭移动端菜单
watch(() => route.path, () => {
  isMobileNavOpen.value = false;
});
</script>

<style>
/* 全局样式重置 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  background-color: #f4f7fa;
  color: #333;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 头部样式 */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 0 15px;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative; /* 为z-index生效 */
  z-index: 1000;
}

.app-title {
  font-size: 20px;
  font-weight: 600;
  color: #000;
}

/* 移动端汉堡包按钮 */
.mobile-nav-toggle {
  display: none; /* 默认隐藏 */
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.mobile-nav-toggle .icon-bar {
  width: 100%;
  height: 3px;
  background-color: #333;
  border-radius: 2px;
}

/* 移动端展开的导航菜单 */
.mobile-nav-links {
  display: none; /* 默认隐藏 */
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.mobile-nav-links .main-nav {
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.mobile-nav-links .logout-button {
  width: 100%;
  max-width: 200px;
}

/* 桌面端导航 */
.desktop-nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.main-nav a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  transition: color 0.2s;
  padding: 5px;
}

.main-nav a:hover,
.main-nav a.router-link-exact-active {
  color: #007bff;
}

.logout-button {
  background: none;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-button:hover {
  background-color: #f1f1f1;
  border-color: #aaa;
}

.content-area {
  flex-grow: 1;
  padding: 20px;
}

.app-footer {
  text-align: center;
  padding: 20px;
  font-size: 12px;
  color: #999;
  background-color: #f4f7fa;
  flex-shrink: 0;
}

/* 响应式媒体查询 */
@media (max-width: 768px) {
  .desktop-nav-links {
    display: none; /* 在移动端隐藏桌面导航 */
  }
  .mobile-nav-toggle {
    display: flex; /* 在移动端显示汉堡包按钮 */
  }
  .mobile-nav-links {
    display: flex; /* 当 v-if 为 true 时，flex 生效 */
  }
}
</style>