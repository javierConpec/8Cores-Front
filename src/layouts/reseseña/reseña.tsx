import { useEffect, useState } from "react";
import { Check, OctagonX, Star } from "lucide-react";
import { useValidateComment } from "../../Hooks/ReseñaHook";
import ModalReseña from "../../Components/Modal/ModalReseña";
import Modal from "../../Components/Modal/Modal";

const IntoReseña = ({
  personId,
  productId,
}: {
  personId: string;
  productId: string;
}) => {
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalValidateOpen, setIsModalValidateOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [validateMessage, setValidateMessage] = useState("");
  const { validation } = useValidateComment(personId, productId);

  const handleOpenModal = () => {
    console.log("Validation data:", validation);

    if (!validation) return;

    if (validation.hasPurchased) {
      setValidateMessage(
        "No puedes calificar este producto, porque no lo has comprado aún."
      );
      setIsModalValidateOpen(true);
      return;
    }

    if (validation.isCommentAproved) {
      setValidateMessage(
        "No puedes calificar este producto, porque ya has dejado una calificación."
      );
      setIsModalValidateOpen(true);
      return;
    }

    if (validation.isCommentPending) {
      setValidateMessage(
        "No puedes calificar este producto, porque tienes un comentario en proceso."
      );
      setIsModalValidateOpen(true);
      return;
    }

    // Si pasa todas las validaciones
    setIsModalOpen(true);
  };

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    setIsCreateModalOpen(true);
  };

  useEffect(() => {
    console.log("Validation updated:", validation);
  }, [validation]);
  console.log("setRaiting", setRating);

  return (
    <>
      <div
        className="w-full  md:w-[400px] h-[40px] rounded-xl py-2 px-4 bg-background-0 dark:bg-background-100 flex items-center text-center justify-between gap-2 border border-primary-500"
        onClick={handleOpenModal}
      >
        <p className="text-sm md:text-lg font-semibold text-text-900">Califica este Producto</p>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 md:w-5 md:h-5 cursor-pointer ${
                index < rating
                  ? "text-accent-700 fill-accent-400"
                  : "text-accent-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal de reseña (para calificar) */}
      <ModalReseña
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
        }}
        autoClose={true}
      >
        <div className="flex flex-col items-center text-center space-y-4 p-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            ¡Reseña enviada correctamente!
          </h2>
          <p className="text-gray-500">
            La reseña se ha enviado correctamente, gracias por tu apoyo.
          </p>
        </div>
      </Modal>
      {/* Modal de validación (mensajes de error) */}
      {isModalValidateOpen && (
        <Modal
          isOpen={isModalValidateOpen}
          onClose={() => setIsModalValidateOpen(false)}
          autoClose={true}
        >
          <div className="flex flex-col items-center text-center space-y-4 p-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
              <OctagonX className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              ¡Validación Incorrecta!
            </h2>
            <p className="text-gray-500">{validateMessage}</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default IntoReseña;
