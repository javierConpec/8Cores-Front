import { Star } from "lucide-react";
import { useProductByID } from "../../Hooks/ProductHook";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { usePostComment } from "../../Hooks/ReseñaHook";
import { useAuth } from "../../Contexts/AuthContext";

const ModalReseña = ({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess:()=>void;
}) => {
  const { user } = useAuth();
  const { id } = useParams();
  const { product, loading: productLoading } = useProductByID(id || ""); 

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { sendComment, loading, error } = usePostComment();

  if (!isOpen) return null; // Validación fuera del uso de hooks

  const handleSubmit = async () => {
    if (!rating || !title || !description) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!user?.sid) {
      alert("Error: No se encontró el usuario.");
      return;
    }

    try {
      await sendComment({
        personid: user.sid,
        productid: id!,
        calification: rating,
        title,
        description,
      });

      onClose();
      onSuccess();
      setRating(0);
      setTitle("");
      setDescription("");
    } catch {
      alert("Ocurrió un error al enviar la reseña.");
    }
  };

  return (
    <div
      className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]"
      aria-hidden={!isOpen}
      role="dialog"
    >
      <div className="bg-white p-6 rounded-xl shadow-xl w-full mx-4 md:mx-0 md:w-[500px]">
        <h2 className="text-md md:text-xl text-center font-semibold text-gray-800 mb-4">
          ¿Cómo calificarías este producto?
        </h2>

        {productLoading ? (
          <p className="text-center text-gray-500">Cargando producto...</p>
        ) : product ? (
          <div className="flex gap-4 items-center">
            <img
              src={product?.images?.[0] || ""}
              alt="Producto"
              className="w-[100px] h-[100px] object-cover rounded-lg border border-gray-300"
            />
            <div className="flex flex-col">
              <p className="text-gray-600 text-[12px] md:text-sm">{product.category?.name}</p>
              <p className="text-sm md:text-lg font-semibold text-gray-800">
                {product.name}
              </p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 md:w-7 md:h-7 cursor-pointer transition ${
                      index < rating
                        ? "text-yellow-500 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(index + 1)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">
            Error: No se encontró el producto.
          </p>
        )}

        <div className="mt-4">
          <label className="block text-[12px] md:text-sm text-gray-700 font-medium">
            Describe tu calificación con una frase:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b text-sm md:text-md border-gray-400 focus:outline-none focus:border-primary-500 p-2 text-gray-800"
          />

          <label className="block text-[12px] md:text-sm text-gray-700 mb-2 font-medium mt-4">
            ¿Qué tal te pareció este producto?
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-24 border border-gray-300 rounded-md p-3 focus:outline-none focus:border-primary-500 text-gray-800 text-sm md:text-md"
            placeholder="Escribe tu comentario..."
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-4 py-2 text-[12px] md:text-md bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md transition"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 text-[12px] md:text-md bg-primary-500 hover:bg-primary-600 text-white rounded-md transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalReseña;
