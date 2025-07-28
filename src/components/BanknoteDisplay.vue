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
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  overflow-x: auto; /* 允许横向滚动 */
}
.wallet {
  display: flex;
   flex-wrap: wrap;
  gap: 20px; /* 不同面额之间的间距 */
  align-items: flex-start;
  padding-bottom: 20px;
  min-height: 150px;
}
.denomination-group {
  display: flex; /* ★ 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
}

/* “一捆”钞票的样式 */
.bill-stack {
  position: relative; /* 用于标签定位 */
  width: 200px;
  height: 94px; /* 根据图片高度设定 */
  flex-shrink: 0; /* 防止被压缩 */
  margin-right: 15px; /* 和后面的钞票保持间距 */
}
.stack-img-base, .stack-img-top {
  position: absolute;
  width: 200px;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.stack-img-top {
  /* 稍微错开一点，营造厚度感 */
  top: 3px;
  left: 3px;
}
.stack-label {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  z-index: 5;
}

/* “零散”钞票的样式 */
.single-bill {
  flex-shrink: 0; /* 防止被压缩 */
  transition: transform 0.2s ease-out;
}
.single-bill img {
  width: 200px;
  height: auto;
  display: block; /* 消除图片下方的空白间隙 */
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* ★★★ 实现堆叠/扇形效果的核心 ★★★ */
/* 让除了第一个之外的所有零散钞票，都向左移动大部分身位，只露出一点边缘 */
.single-bill:not(:first-child) {
  margin-left: -170px; 
}
/* 如果一捆钱后面紧跟着一张散钱，给它们之间留出一些空隙 */
.bill-stack + .single-bill {
  margin-left: -180px;
}

.single-bill:hover {
  transform: translateY(-10px) scale(1.05);
  z-index: 100;
}
</style>