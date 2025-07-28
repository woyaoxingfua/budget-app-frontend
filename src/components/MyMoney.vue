
<template>
  <div class="my-money">
    <!-- 导航栏 -->
    <van-nav-bar title="我的钱" left-text="主页" right-text="退出登录" @click-left="goHome" @click-right="logout">
      <template #left>
        <van-tabs v-model:active="activeTab" color="#409EFF">
          <van-tab title="账单历史"></van-tab>
          <van-tab title="预算设置"></van-tab>
        </van-tabs>
      </template>
    </van-nav-bar>

    <!-- 内容区域 -->
    <div class="content">
      <van-grid :column-num="3">
        <van-grid-item text="总预算">
          <span class="amount">¥ {{ totalBudget }}</span>
        </van-grid-item>
        <van-grid-item text="总支出">
          <span class="amount red">¥ {{ totalExpense }}</span>
        </van-grid-item>
        <van-grid-item text="剩余金额">
          <span class="amount green">¥ {{ remainingAmount }}</span>
        </van-grid-item>
      </van-grid>

      <!-- 图片展示区 -->
      <div class="image-container">
        <img src="https://placehold.co/600x400" alt="人民币样图" />
        <div class="image-count">10张</div>
      </div>

      <!-- IP地址显示 -->
      <div class="ip-address">
        <van-icon name="info-o" /> 192.168.0.9
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      totalBudget: '2500.00',
      totalExpense: '128.50',
      remainingAmount: '2371.50'
    };
  },
  methods: {
    goHome() {},
    logout() {}
  }
};
</script>

<style scoped>
.my-money {
  font-size: 16px;
}

@media (max-width: 768px) {
  .my-money {
    font-size: 14px;
  }

  .content {
    padding: 10px;
  }

  .image-container img {
    width: 100%;
    height: auto;
  }
}

.amount {
  font-size: 24px;
  font-weight: bold;
}

.red {
  color: red;
}

.green {
  color: green;
}

.image-container {
  border: 1px dashed #ccc;
  margin-top: 20px;
  position: relative;
}

.image-count {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.ip-address {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
</style>