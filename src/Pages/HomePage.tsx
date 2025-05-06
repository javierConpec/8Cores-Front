import BannerCarrusel from "../layouts/Carrusel/BannerCarrusel";
import ProductList from "../layouts/Card/Product/ProductList";
//import BannerUnico from "../Components/Banner/BannerUnico";
//import CategoryList from "../layouts/Card/Category/CategoryList";
import { useProductTop } from "../Hooks/ProductHook";

const Home = () => {
  return (
    <div>
      <BannerCarrusel />
      <ProductList
        title="Descuentos para morirse"
        filterType="random"
        minDiscount={40}
      />
      {/* <CategoryList />*/}

      {/*<BannerUnico banners={banners} loading={loading} index={0} /> */}
      <ProductList
        title="Precios de Locos"
        filterType="price"
        maxPrice={200}
      />
      <ProductList title="Creo que te encantaran" filterType="random" />
      <ProductList
        title="Productos mejor calificados"
        useProductHook={useProductTop}
        filterType="random"
      />

      {/*<BannerUnico banners={banners} loading={loading} index={0} /> */}
    </div>
  );
};

export default Home;
