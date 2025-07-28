<template>
  <div class="history-container">
    <div v-if="loading" class="loading">正在加载...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && !error">
      <table v-if="transactions.length > 0" class="transaction-table">
        <thead>
          <tr>
            <th>日期</th>
            <th>描述</th>
            <th>类型</th>
            <th>金额</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in transactions" :key="t.id">
            <td>{{ t.transactionDate }}</td>
            <td>{{ t.description }}</td>
            <td>
              <span :class="t.type === 'INCOME' ? 'income-tag' : 'expense-tag'">
                {{ t.type === 'INCOME' ? '收入' : '支出' }}
              </span>
            </td>
            <td :class="t.type === 'INCOME' ? 'amount-income' : 'amount-expense'">
              ¥ {{ t.amount.toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="no-data">还没有任何账单记录。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiService from '@/services/apiService';

const transactions = ref([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const response = await apiService.getTransactions();
    transactions.value = response.data;
  } catch (err) {
    console.error('获取账单历史失败:', err);
    error.value = '无法加载账单历史，请稍后再试。';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.history-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}
.loading, .error, .no-data {
  text-align: center;
  margin-top: 30px;
  font-size: 18px;
  color: #666;
}
.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.transaction-table th, .transaction-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
.transaction-table th {
  background-color: #f8f8f8;
}
.income-tag, .expense-tag {
  padding: 4px 8px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
}
.income-tag { background-color: #28a745; }
.expense-tag { background-color: #dc3545; }
.amount-income { color: #28a745; font-weight: bold; }
.amount-expense { color: #dc3545; font-weight: bold; }
</style>