import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Props {
  images: string[];
}

const ProductImageGallery: React.FC<Props> = ({ images }) => {
  if (images.length === 0) {
    return <p className="text-text-500">No hay imágenes disponibles</p>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex items-start gap-2  md:gap-4 bg-background-0  dark:bg-background-100 w-[300px] md:w-[550px] p-2">
      {/* Miniaturas a la izquierda */}
      <div className="flex flex-col gap-2"> 
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index + 1}`}
            className={`p-2 bg-background-0 dark:bg-background-100  md:w-16 md:h-16 object-cover cursor-pointer border-2 transition ${
              index === currentIndex
                ? "border-primary-500"
                : "border-secondary-100"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Imagen principal con botones */}
      <div className="relative  w-[3900px]  h-[300px] md:w-[500px] md:h-[300px]">
        <img
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className=" w-full h-full object-cover transition-all duration-300"
        />

        {/* Botón Anterior */}
        <button
          onClick={handlePrev}
          className=" absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary-100 text-background-0 p-2 rounded-full hover:bg-secondary-300 transition"
        >
          <ChevronLeft  />
        </button>

        {/* Botón Siguiente */}
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-100 text-background-0 p-2 rounded-full hover:bg-secondary-300 transition"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ProductImageGallery;
