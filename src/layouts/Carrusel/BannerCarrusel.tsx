import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { usePromotion } from "../../Hooks/PromotionHook";
import { useNavigate } from "react-router-dom";
import InfinityLoader from "../../Helpers/loader";

const BannerCarrusel = () => {
  const sliderRef = useRef<Slider | null>(null);
  const { promotions, loading } = usePromotion();
  const navigate = useNavigate();

  if (loading) {
    return <InfinityLoader />;
  }

  if (!promotions.length)
    return (
      <p className="text-center text-lg text-gray-500">
        No hay promociones activas
      </p>
    );

  // Si solo hay un banner, duplicarlo para que el carrusel siga funcionando
  const bannersToShow =
    promotions.length === 1 ? [...promotions, ...promotions] : promotions;

  const nextSlide = () => sliderRef.current?.slickNext();
  const prevSlide = () => sliderRef.current?.slickPrev();

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {bannersToShow.map((banner) => (
          <div
            key={`${banner.id}`}
            className="relative w-full h-80 sm:h-[400px]  flex justify-center"
          >
            <div className="absolute inset-0 bg-background-900 bg-opacity-40 z-10">
              <img
                src={banner.bannerPath}
                alt={banner.phrase}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 z-20">
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold opacity-30 uppercase">
                  {banner.phrasetitle}
                </h2>
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold uppercase">
                  {banner.phrasetitle}
                </h2>
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold opacity-30 uppercase">
                  {banner.phrasetitle}
                </h2>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 drop-shadow-xl cursor-pointer">
                  {banner.phrase} en estos{" "}
                  <strong
                    onClick={() =>
                      navigate(`/promotions/${banner.id}/products`)
                    }
                    className="underline hover:text-accent-400 transition-colors"
                  >
                    PRODUCTOS
                  </strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition duration-300 shadow-lg"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition duration-300 shadow-lg"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default BannerCarrusel;
