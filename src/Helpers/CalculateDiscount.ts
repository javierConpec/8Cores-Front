export const calculateDiscount = (basePrice: number, currentPrice: number): number => {
  if (basePrice <= 0 || currentPrice >= basePrice) return 0;
  return Math.round((1 - currentPrice / basePrice) * 100);
};
