import { IPromotion } from "../../Interfaces/banners";

interface Props {
  banners: IPromotion[];
  loading: boolean;
  index: number; // Permite elegir un banner único diferente
}

const BannerUnico = ({ banners, loading, index }: Props) => {
  if (loading) {
    return (
      <p className="text-center text-lg text-gray-500">Cargando banner...</p>
    );
  }

  // Filtrar solo los banners
  const filteredBanners = banners.filter(
    (banner) => banner.image.type === "Banner"
  );

  // Excluir los primeros 3 banners del carrusel
  const bannerUnico = filteredBanners.slice(3)[index];

  if (!bannerUnico) {
    return (
      <p className="text-center text-lg text-gray-500">
        No hay más banners disponibles
      </p>
    );
  }

  return (
    <div className="m-10">
      <img
        src={bannerUnico.image.pathfile}
        alt={bannerUnico.title}
        className="h-auto w-auto object-cover"
      />
    </div>
  );
};

export default BannerUnico;
