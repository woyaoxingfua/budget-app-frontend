<template>
  <div v-if="authStore.isAuthenticated" class="app-layout">
    <header class="main-header">
      <nav class="main-nav">
        <router-link to="/">主页</router-link>
        <router-link to="/history">账单历史</router-link>
        <router-link to="/budget">预算设置</router-link>
      </nav>

      <h1 class="app-title">我的钱包</h1>

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

// 将退出登录的逻辑移动到这里
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

/* 应用主布局 */
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 顶部导航栏样式 */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 0 40px;
  height: 64px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex-shrink: 0; /* 防止页头被压缩 */
}

.app-title {
  font-size: 20px;
  font-weight: 600;
  color: #000;
}

.main-nav a {
  margin-right: 24px;
  text-decoration: none;
  color: #555;
  font-weight: 500;
  transition: color 0.2s;
}

.main-nav a:hover {
  color: #007bff;
}

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

/* 内容区域样式 */
.content-area {
  flex-grow: 1; /* 占据剩余所有空间 */
  padding: 20px;
}

.app-footer {
    text-align: center;
    padding: 20px;
    font-size: 12px;
    color: #999;
    background-color: #f4f7fa;
    flex-shrink: 0; /* 保证 footer 不会被压缩 */
  }
</style>