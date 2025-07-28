<template>
  <div class="register-container">
    <div class="register-box">
      <h1>创建账户</h1>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="form.username" required>
        </div>
        <div class="input-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="form.password" required>
        </div>
        <button type="submit">注册</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      </form>
      <p class="login-link">
        已经有账户了？ <router-link to="/login">点此登录</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '@/services/apiService';

const form = reactive({
  username: '',
  email: '',
  password: ''
});

const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

const handleRegister = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  try {
    await apiService.registerUser(form);
    successMessage.value = '注册成功！即将跳转到登录页面...';

    // 注册成功后，等待2秒，然后跳转到登录页
    setTimeout(() => {
      router.push('/login');
    }, 2000);

  } catch (error) {
    console.error('注册失败:', error.response.data);
    errorMessage.value = error.response.data || '注册失败，请重试。';
  }
};
</script>

<style scoped>
/* 这里的样式和登录页非常相似，你可以直接复用或者微调 */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}
.register-box {
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 360px;
}
.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}
/* 其他样式（h1, input-group, button, error-message 等）可以从 LoginView.vue 复制过来 */
</style>