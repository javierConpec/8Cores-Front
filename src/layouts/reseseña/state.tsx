import React from "react";
import { useStatByProduct } from "../../Hooks/ReseñaHook";

interface Props {
  productId: string;
}

const ProductStats: React.FC<Props> = ({ productId }) => {
  const { stats, loading, error } = useStatByProduct(productId);

  if (loading) return;
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary-500"></div>
  </div>;
  if (error) return <p>Error al cargar: {error}</p>;
  if (!stats)
    return (
      <p className="text-text-700 text-[12px] mb-2 md:mb-0 md:text-md font-[800]">
        Se el primero en calificar este producto
      </p>
    );

  const totalReviews = Number(stats.totalReviews);
  const averageRating = Math.round(Number(stats.averageRating));

  return (
    <div className="flex p-4 w-full  md:w-[500px]">
      <div className="m-5">
        <div className="flex items-end ">
          <span className="text-6xl font-semibold dark:text-text-300">
            {Number(stats.averageRating)}
          </span>
          <span className="text-text-500 text-4xl">/5</span>
        </div>

        <div className="">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`md:text-xl ${
                i < averageRating ? "text-accent-400" : "text-background-200"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div></div>
      <div className="w-full grid my-6 ml-2">
        {Object.entries(stats.countByRating)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([stars, count]) => (
            <div key={stars} className="flex items-center">
              <span className="w-10 text-sm text-text-700">{stars} ★</span>
              <div className="w-full bg-background-200 rounded-full h-2 mx-2">
                <div
                  className="bg-accent-600 h-2 rounded-full"
                  style={{
                    width: totalReviews
                      ? `${(count / totalReviews) * 100}%`
                      : "0%",
                  }}
                ></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductStats;
