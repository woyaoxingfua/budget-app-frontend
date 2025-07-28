<template>
  <div class="form-container">
    <h3>记一笔</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="description">描述</label>
        <input type="text" id="description" v-model="form.description" required />
      </div>
      <div class="form-group">
        <label for="amount">金额</label>
        <input type="number" id="amount" v-model.number="form.amount" required step="0.01" placeholder="输入金额试试看" />
      </div>

      <div v-if="banknoteDistribution.length > 0" class="banknote-preview">
        <div v-for="bill in banknoteDistribution" :key="bill.denomination" class="bill-item">
          <img :src="`/banknotes/${bill.denomination}.png`" :alt="`${bill.denomination}元`" />
          <span>× {{ bill.count }}</span>
        </div>
      </div>

      <div class="form-group">
        <label>类型</label>
        <div class="radio-group">
          <label><input type="radio" v-model="form.type" value="EXPENSE" /> 支出</label>
          <label><input type="radio" v-model="form.type" value="INCOME" /> 收入</label>
        </div>
      </div>
       <div class="form-group">
        <label for="date">日期</label>
        <input type="date" id="date" v-model="form.transactionDate" required />
      </div>

      <button type="submit">确认记账</button>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import apiService from '@/services/apiService';
import { calculateBanknotes } from '@/utils/banknoteCalculator';

const emit = defineEmits(['transaction-added']);

const form = reactive({
  description: '',
  amount: null,
  type: 'EXPENSE',
  transactionDate: new Date().toISOString().slice(0, 10),
});

const successMessage = ref('');

// 计算属性，它会“监视” form.amount 的变化，并自动重新计算
const banknoteDistribution = computed(() => {
  return calculateBanknotes(form.amount);
});

const handleSubmit = async () => {
  try {
    await apiService.addTransaction(form);
    successMessage.value = '记账成功！';
    emit('transaction-added');
    
    // 清空表单
    form.description = '';
    form.amount = null;
    setTimeout(() => { successMessage.value = '' }, 2000);

  } catch (error) {
    console.error('添加交易失败:', error);
    alert('添加失败，请检查控制台。');
  }
};
</script>

<style scoped>
/* 表单容器和通用组样式 */
.form-container {
  margin-top: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.form-group { 
  margin-bottom: 15px; 
}
label { 
  display: block; 
  margin-bottom: 5px; 
  color: #333; 
}
input[type="text"], input[type="number"], input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.radio-group label { 
  display: inline-block; 
  margin-right: 15px; 
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
.success-message { 
  color: green; 
  margin-top: 10px; 
}

/* 钞票实时预览区域的样式 */
.banknote-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* 增加了项目之间的间距 */
  padding: 15px; /* 增加了内边距 */
  margin-bottom: 15px;
  background-color: #f7f7f7;
  border: 1px solid #eee;
  border-radius: 4px;
}
.bill-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 8px 12px; /* 增加了图片和文字周围的内边距 */
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.bill-item img {
  width: 90px; /* 主要改动：图片从 60px 增大到 90px */
  height: auto;
  margin-right: 12px; /* 增加了图片和文字的间距 */
}
.bill-item span {
  font-weight: bold;
  font-size: 18px; /* 文字也相应增大 */
}
</style>