<template>
  <div class="wallet-container">
    <div class="wallet">
      <div v-for="billType in distributedBills" :key="billType.denomination" class="denomination-group">
        
        <div v-for="i in billType.stacksOfTen" :key="`stack-${i}`" class="bill-stack">
          <img :src="`/banknotes/${billType.denomination}.png`" class="stack-img-base">
          <img :src="`/banknotes/${billType.denomination}.png`" class="stack-img-top">
          <span class="stack-label">10 张</span>
        </div>

        <div
          v-for="k in billType.singleBillsCount"
          :key="`single-${k}`"
          class="single-bill"
        >
          <img :src="`/banknotes/${billType.denomination}.png`" :alt="`${billType.denomination}元`" />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// Script 部分的代码完全不需要改变！
import { computed } from 'vue';

const props = defineProps({
  remainingAmount: {
    type: Number,
    required: true,
    default: 0
  }
});

const distributedBills = computed(() => {
  const denominations = [100, 50, 20, 10, 5, 1, 0.5, 0.1];
  let amountLeft = props.remainingAmount;
  const distribution = [];

  for (const value of denominations) {
    const count = Math.floor(amountLeft / value);
    if (count > 0) {
      distribution.push({
        denomination: value,
        stacksOfTen: Math.floor(count / 10),
        singleBillsCount: count % 10
      });
      amountLeft = parseFloat((amountLeft - count * value).toFixed(2));
    }
  }
  return distribution;
});
</script>

<style scoped>
.wallet-container {
  padding: 10px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  /* 移除 overflow-x: auto; 以允许内容自然换行 */
}

.wallet {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
  min-height: 100px;
}

.denomination-group {
  display: flex;
  flex-wrap: wrap; /* 允许组内内容换行 */
  align-items: center;
  gap: 10px; /* 组内元素间距 */
}

/* 通用的钞票/钞票堆尺寸 */
.bill-stack, .single-bill img {
  width: 120px; /* 减小基础宽度以适应移动设备 */
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.bill-stack {
  position: relative;
  height: 56px; /* 根据新的宽度调整高度 */
  flex-shrink: 0;
}

.stack-img-base, .stack-img-top {
  position: absolute;
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.stack-img-top {
  top: 2px;
  left: 2px;
}

.stack-label {
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 10px;
  z-index: 5;
}

.single-bill {
  flex-shrink: 0;
  transition: transform 0.2s ease-out;
  width: 120px; /* 明确宽度 */
}

.single-bill img {
  display: block;
}

/* 移动端扇形效果调整 */
.single-bill:not(:first-child) {
  margin-left: -105px; /* 根据新宽度调整重叠距离 */
}
.bill-stack + .single-bill {
  margin-left: -110px; /* 调整与钞票堆的距离 */
}

.single-bill:hover {
  transform: translateY(-8px) scale(1.05);
  z-index: 100;
}

/* 桌面端样式 - 恢复较大尺寸和间距 */
@media (min-width: 768px) {
  .wallet-container {
    padding: 20px;
  }

  .bill-stack, .single-bill, .single-bill img {
    width: 200px; /* 恢复桌面端宽度 */
  }

  .bill-stack {
    height: 94px; /* 恢复桌面端高度 */
  }

  .single-bill:not(:first-child) {
    margin-left: -170px; /* 恢复桌面端重叠距离 */
  }
  .bill-stack + .single-bill {
    margin-left: -180px;
  }
}
</style>