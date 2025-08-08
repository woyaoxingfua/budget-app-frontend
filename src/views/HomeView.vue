<template>
  <div v-if="loading" class="loading-indicator">正在加载数据...</div>

  <div v-if="error" class="error-message">
    <p>{{ error }}</p>
    <p>看起来你还没有为当前时段设置预算。</p>
    <router-link to="/budget" class="action-button">
      前往设置预算
    </router-link>
  </div>
  <div v-if="!loading && budgetStatus" class="dashboard-content">
    </div>

  <div v-if="!loading && budgetStatus" class="dashboard-content">
    <div class="status-card">
      <div class="status-item">
        <span class="label">总预算</span>
        <span class="value primary">¥ {{ budgetStatus.totalBudget.toFixed(2) }}</span>
      </div>
      <div class="status-item">
        <span class="label">总支出</span>
        <span class="value danger">¥ {{ budgetStatus.totalSpending.toFixed(2) }}</span>
      </div>
      <div class="status-item">
        <span class="label">剩余金额</span>
        <span class="value success">¥ {{ budgetStatus.remainingAmount.toFixed(2) }}</span>
      </div>
    </div>

    <BanknoteDisplay :remaining-amount="budgetStatus.remainingAmount" />
    <AddTransactionForm @transaction-added="fetchData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BanknoteDisplay from '@/components/BanknoteDisplay.vue';
import AddTransactionForm from '@/components/AddTransactionForm.vue';
import apiService from '@/services/apiService';

// 退出登录的逻辑已经移到 App.vue，这里不再需要
// const authStore = useAuthStore();
// const router = useRouter();

const budgetStatus = ref(null);
const loading = ref(true);
const error = ref('');

// handleLogout 方法也已经移走

const fetchData = async () => {
  loading.value = true;
  error.value = '';
  try {
    const response = await apiService.getBudgetStatus();
    budgetStatus.value = response.data;
  } catch (err) {
    console.error('获取预算状态失败:', err);
    error.value = '加载预算数据失败。请确保您已设置当月预算。';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.dashboard-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 15px; /* 在移动端添加水平内边距 */
}
.status-card {
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 30px;
}
.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.label {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}
.value {
  font-size: 24px;
  font-weight: bold;
}
.primary { color: #007bff; }
.danger { color: #dc3545; }
.success { color: #28a745; }

.loading-indicator, .error-message {
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #666;
}

.action-button {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .status-card {
    flex-direction: column;
    gap: 20px; /* 在垂直排列时增加间距 */
  }
  .value {
    font-size: 20px; /* 在移动端稍微减小字体大小 */
  }
}
</style>