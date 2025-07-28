// 这个函数接收一个数字金额，返回一个包含各面额数量的数组
export function calculateBanknotes(amount) {
  const denominations = [100, 50, 20, 10, 5, 1, 0.5, 0.1];
  let amountLeft = amount;
  const distribution = [];

  if (typeof amountLeft !== 'number' || amountLeft <= 0) {
    return []; // 如果金额无效，返回空数组
  }

  for (const value of denominations) {
    const count = Math.floor(amountLeft / value);
    if (count > 0) {
      distribution.push({
        denomination: value,
        count: count
      });
      amountLeft = parseFloat((amountLeft - count * value).toFixed(2));
    }
  }
  return distribution;
}