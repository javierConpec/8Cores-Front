import { useState } from "react";
import ProductListOnSale from "../layouts/Card/Product/ProductListByPromotion";
import FilterProduct from "../Components/Dropdown/FilterDropdown";
import FilterProductMobile from "../layouts/Navbar/RelevanciaMobileNabvar";

const PageProductPromotion = () => {
  const [sortOption, setSortOption] = useState("");

  return (
    <div>
      <FilterProductMobile  sortOption={sortOption} setSortOption={setSortOption} />
      <div className="flex ">
      <div>
        <FilterProduct sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      <div className="w-full">
        <ProductListOnSale sortOption={sortOption} />
      </div>
    </div>
    </div>
    
  );
};

export default PageProductPromotion;
