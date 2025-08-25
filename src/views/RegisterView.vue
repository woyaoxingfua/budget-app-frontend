<template>
  <div class="register-container">
    <div class="register-box">
      <h1>创建账户</h1>
      <form @submit.prevent="handleRegister" novalidate>
        <div class="input-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="form.username" required :class="{ 'input-error': errors.username }">
          <p v-if="errors.username" class="field-error-message">{{ errors.username }}</p>
        </div>
        <div class="input-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="form.email" required :class="{ 'input-error': errors.email }">
          <p v-if="errors.email" class="field-error-message">{{ errors.email }}</p>
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="form.password" required :class="{ 'input-error': errors.password }">
          <p v-if="errors.password" class="field-error-message">{{ errors.password }}</p>
        </div>
        <button type="submit" :disabled="!isFormValid">注册</button>
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
import { reactive, ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '@/services/apiService';

const form = reactive({
  username: '',
  email: '',
  password: ''
});

const errors = reactive({
  username: '',
  email: '',
  password: ''
});

const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

// --- Validation Logic ---
const validateUsername = () => {
  if (!form.username) {
    errors.username = '用户名不能为空。';
  } else if (form.username.length < 3) {
    errors.username = '用户名长度不能少于3个字符。';
  } else {
    errors.username = '';
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email) {
    errors.email = '邮箱不能为空。';
  } else if (!emailRegex.test(form.email)) {
    errors.email = '请输入有效的邮箱地址。';
  } else {
    errors.email = '';
  }
};

const validatePassword = () => {
  if (!form.password) {
    errors.password = '密码不能为空。';
  } else if (form.password.length < 6) {
    errors.password = '密码长度不能少于6个字符。';
  } else {
    errors.password = '';
  }
};

// Watch for changes and validate
watch(() => form.username, validateUsername);
watch(() => form.email, validateEmail);
watch(() => form.password, validatePassword);

const isFormValid = computed(() => {
  return !errors.username && !errors.email && !errors.password && form.username && form.email && form.password;
});

const handleRegister = async () => {
  // Final validation check before submitting
  validateUsername();
  validateEmail();
  validatePassword();
  if (!isFormValid.value) {
    errorMessage.value = '请修正表单中的错误。';
    return;
  }

  errorMessage.value = '';
  successMessage.value = '';
  try {
    await apiService.registerUser(form);
    successMessage.value = '注册成功！即将跳转到登录页面...';
    setTimeout(() => {
      router.push('/login');
    }, 2000);

  } catch (error) {
    console.error('注册失败:', error.response.data);
    errorMessage.value = error.response?.data?.message || error.response?.data || '注册失败，请重试。';
  }
};
</script>

<style scoped>
/* 样式与登录页共享，可提取为公共样式 */
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
  box-sizing: border-box;
}
h1 {
  text-align: center;
  margin-bottom: 24px;
}
.input-group {
  margin-bottom: 15px; /* 减小一点间距以容纳错误信息 */
  position: relative;
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
  box-sizing: border-box;
}

.input-error {
  border-color: #dc3545;
}
.input-error:focus {
  outline-color: #dc3545;
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
  transition: background-color 0.2s;
}
button:hover {
  background-color: #0056b3;
}
button:disabled {
  background-color: #a0c7ff;
  cursor: not-allowed;
}

.field-error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  height: 1em; /* 占据空间以防止布局抖动 */
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 16px;
}
.success-message {
  color: #28a745;
  text-align: center;
  margin-top: 16px;
}
.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}
</style>