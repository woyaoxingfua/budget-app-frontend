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
  overflow-x: auto;
}
.wallet {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
  padding-bottom: 20px;
  min-height: 150px;
}
.denomination-group {
  display: flex;
  align-items: center;
}

.bill-stack {
  position: relative;
  width: 200px;
  height: 94px;
  flex-shrink: 0;
  margin-right: 15px;
}

@media (max-width: 767px) {
  .bill-stack {
    width: 120px;
    height: 56px;
    margin-right: 10px;
  }
}

.stack-img-base, .stack-img-top {
  position: absolute;
  width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.stack-img-top {
  top: 3px;
  left: 3px;
}

@media (max-width: 767px) {
  .stack-img-top {
    top: 2px;
    left: 2px;
  }
}

.stack-label {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  z-index: 2;
}

@media (max-width: 767px) {
  .stack-label {
    bottom: 4px;
    right: 4px;
    font-size: 10px;
  }
}

.single-bill {
  width: 180px;
  margin-right: -100px;
  transition: transform 0.2s ease-out;
  flex-shrink: 0;
}

@media (max-width: 767px) {
  .single-bill {
    width: 110px;
    margin-right: -65px;
  }
}

.single-bill img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.single-bill:hover {
  transform: translateY(-10px) scale(1.05);
  z-index: 100;
}

.bill-stack + .single-bill {
  margin-left: 10px;
}
</style>
