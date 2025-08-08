<template>
  <div class="skeleton-wrapper">
    <!-- 模拟 StatusCard 的骨架 -->
    <div class="skeleton-status-card">
      <div class="skeleton-status-item"></div>
      <div class="skeleton-status-item"></div>
      <div class="skeleton-status-item"></div>
    </div>
    <!-- 模拟 BanknoteDisplay 的骨架 -->
    <div class="skeleton-banknote-display"></div>
    <!-- 模拟 AddTransactionForm 的骨架 -->
    <div class="skeleton-form">
      <div class="skeleton-form-title"></div>
      <div class="skeleton-form-input"></div>
      <div class="skeleton-form-input"></div>
      <div class="skeleton-form-button"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}

.skeleton-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 15px;
}

.skeleton-status-card {
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 30px;
}

.skeleton-status-item {
  width: 100px;
  height: 50px;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-banknote-display {
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  height: 150px;
  margin-bottom: 30px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.skeleton-form-title {
  width: 40%;
  height: 24px;
  margin-bottom: 20px;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-form-input {
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-form-button {
  width: 100%;
  height: 45px;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}


/* 响应式调整 */
@media (max-width: 768px) {
  .skeleton-status-card {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}
</style>
