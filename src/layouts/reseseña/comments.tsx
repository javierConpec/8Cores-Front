import React from "react";
import { useCommentByProduct } from "../../Hooks/ReseñaHook";

interface Props {
  productId: string;
}

const ProductComments: React.FC<Props> = ({ productId }) => {
  const { comments, loading, error } = useCommentByProduct(productId);

  if (loading) return;
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary-500"></div>
  </div>;
  if (error) return <p>Error al cargar: {error}</p>;
  if (comments.length === 0) return;

  return (
    <div className="md:w-[95%]  m-auto">
      <div className="w-full h-[1px] bg-text-300 mt-3 mb-5"></div>
      <ul className="w-full  grid grid-cols-1 md:grid-cols-3">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="bg-background-0  dark:bg-background-100 border rounded-xl m-2 p-4"
          >
            <div className="flex  justify-between">
              <strong className="text-text-800">{comment.title}</strong>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < comment.calification
                        ? "text-accent-500"
                        : "text-background-200"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <p className="text-text-300 text-[12px] md:text-sm">por {comment.authorName}</p>

            <p className="text-text-600 text-[13px] md:text-md mt-2">{comment.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductComments;
