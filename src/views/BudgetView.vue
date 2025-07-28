<template>
  <div class="budget-container">
    <h2>预算设置</h2>
    <p class="description">在这里为自己设定一个预算周期和总金额。</p>

    <form @submit.prevent="handleSetBudget" class="budget-form">
      <div class="form-group">
        <label for="totalAmount">总预算金额 (¥)</label>
        <input type="number" id="totalAmount" v-model="form.totalAmount" required step="100">
      </div>
      <div class="form-group">
        <label for="startDate">开始日期</label>
        <input type="date" id="startDate" v-model="form.startDate" required>
      </div>
      <div class="form-group">
        <label for="endDate">结束日期</label>
        <input type="date" id="endDate" v-model="form.endDate" required>
      </div>
      <button type="submit">保存预算</button>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '@/services/apiService';

const router = useRouter();

const form = reactive({
  totalAmount: 1000,
  startDate: new Date().toISOString().slice(0, 8) + '01', // 默认为本月第一天
  endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().slice(0, 10) // 默认为本月最后一天
});

const successMessage = ref('');
const errorMessage = ref('');

const handleSetBudget = async () => {
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await apiService.setBudget(form);
    successMessage.value = '预算设置成功！即将跳转回主页...';
    setTimeout(() => {
      router.push('/'); // 保存成功后跳转回主页
    }, 2000);
  } catch (error) {
    console.error('设置预算失败:', error);
    errorMessage.value = '设置预算失败，请重试。';
  }
};
</script>

<style scoped>
.budget-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.description {
  color: #666;
  margin-bottom: 20px;
}
.budget-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
/* 其他表单样式可以复用或自定义 */
</style> 