<template>
  <div v-if="authStore.isAuthenticated" class="app-layout">
    <header class="main-header">
      <h1 class="app-title">我的钱包</h1>
      <nav class="main-nav">
        <router-link to="/">主页</router-link>
        <router-link to="/history">账单历史</router-link>
        <router-link to="/budget">预算设置</router-link>
      </nav>
      <button @click="handleLogout" class="logout-button">退出登录</button>
    </header>

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
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
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

/* 移动端优先样式 */
.main-header {
  display: flex;
  flex-direction: column; /* 移动端默认垂直排列 */
  align-items: center;
  background-color: #ffffff;
  padding: 10px 15px; /* 调整移动端内边距 */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.app-title {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin-bottom: 10px; /* 标题和导航间距 */
}

.main-nav {
  display: flex;
  gap: 15px; /* 使用 gap 替代 margin */
  margin-bottom: 10px; /* 导航和按钮间距 */
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
  width: 100%; /* 移动端按钮宽度 */
  max-width: 200px; /* 按钮最大宽度 */
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

/* 桌面端样式 - 使用媒体查询 */
@media (min-width: 768px) {
  .main-header {
    flex-direction: row; /* 桌面端恢复水平排列 */
    justify-content: space-between;
    height: 64px;
    padding: 0 40px;
  }

  .app-title {
    margin-bottom: 0; /* 移除桌面端标题下边距 */
  }

  .main-nav {
    margin-bottom: 0; /* 移除桌面端导航下边距 */
    gap: 24px; /* 桌面端导航间距 */
  }

  .logout-button {
    width: auto; /* 恢复按钮自动宽度 */
  }
}
</style>