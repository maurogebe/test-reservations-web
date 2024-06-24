export const formatMoney = (amount: number, decimals = 0): string => {
  return amount
    .toFixed(decimals)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}