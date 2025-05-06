import { Iproduct } from "../Interfaces/product";
import { calculateDiscount } from "./CalculateDiscount"; // Importamos la función existente

/**
 * Filtra productos según el criterio especificado.
 * @param products Lista de productos disponibles.
 * @param filterType Tipo de filtro ("discount", "price", "random").
 * @param minDiscount Descuento mínimo requerido (ejemplo: 50 para 50%).
 * @param maxPrice Precio máximo permitido.
 * @returns Productos filtrados.
 */
export const filterProducts = (
  products: Iproduct[],
  filterType: "discount" | "price" | "random",
  minDiscount: number = 1, // Descuento mínimo (opcional)
  maxPrice: number = Infinity // Precio máximo (opcional)
): Iproduct[] => {
  if (!products || products.length === 0) return [];
  const minValidDiscount = Math.max(minDiscount, 1);
  switch (filterType) {
    case "discount":
  return products
    .filter((p) => {
      const basePrice = parseFloat(p.prices.basePrice);
      const currentPrice = parseFloat(p.prices.currentPrice);
      const discount = calculateDiscount(basePrice, currentPrice);
      console.log(p.name, "->", discount + "%");

      return (
        basePrice > 0 &&
        currentPrice > 0 &&
        discount >= minValidDiscount
      );
    })
    .sort(
      (a, b) =>
        calculateDiscount(Number(b.prices.basePrice), Number(b.prices.currentPrice)) -
        calculateDiscount(Number(a.prices.basePrice), Number(a.prices.currentPrice))
    )
    .slice(0, 5);


    case "price":
      return products
        .filter(
          (p) => {
            const currentPrice = Number(p.prices.currentPrice); // Convertimos a número
            return currentPrice > 0 && currentPrice <= maxPrice;
          })
          .sort((a, b) => Number(a.prices.currentPrice) - Number(b.prices.currentPrice))

        .slice(0, 5);

    case "random":
      return [...products].sort(() => Math.random() - 0.5).slice(0, 5);

    default:
      return products;
  }
};
