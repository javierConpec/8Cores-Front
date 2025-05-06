import CartSummary from "../layouts/Card/resumen/CartSumary";
import ResumenCart from "../layouts/Table/resumenCart";

const resumen = () => {
    return (
      <div className="p-4 md:p-0 md:flex">
        <ResumenCart />
        <CartSummary />
      </div>
    );
  };
  
  export default resumen;
  