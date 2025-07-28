<template>
  <div class="login-container">
    <div class="login-box">
      <h1>用户登录</h1>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">登录</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
      
      <p class="register-link">
        还没有账户？ <router-link to="/register">立即注册</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'; // 导入我们的 auth store
import { useRouter } from 'vue-router';    // 导入 vue-router
import apiService from '@/services/apiService'; // 导入我们的 api 服务

const username = ref('testuser'); // 可以设置默认值方便测试
const password = ref('password123');
const errorMessage = ref('');

const authStore = useAuthStore(); // 初始化 auth store
const router = useRouter();       // 初始化 router

const handleLogin = async () => {
  errorMessage.value = ''; // 先清空错误信息
  try {
    // 调用 apiService 中的登录方法
    const response = await apiService.loginUser({
      username: username.value,
      password: password.value
    });

    // 从响应中获取 token
    const token = response.data.token;

    // 调用 store 中的 login action 来保存 token
    authStore.login(token);

    // 登录成功，跳转到主页
    router.push('/');

  } catch (error) {
    // 如果登录失败
    console.error('登录失败:', error);
    errorMessage.value = '用户名或密码错误，请重试。';
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}
.login-box {
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 360px;
}
h1 {
  text-align: center;
  margin-bottom: 24px;
}
.input-group {
  margin-bottom: 20px;
}
.input-group label {
  display: block;
  margin-bottom: 8px;
}
.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* 保证 padding 不会撑大宽度 */
}
button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #0056b3;
}
.error-message {
  color: red;
  text-align: center;
  margin-top: 16px;
}

/* ↓↓↓ 为新链接添加一点样式 ↓↓↓ */
.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}
</style>