import { Menu, ShoppingBag } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button/Button";
import SidebarCat from "./Sidebar/CategorySid";
import SidebarCart from "./Sidebar/CarritoSid";
import SearchComponent from "../Components/Search/SearchComponent";
import CartIcon from "../Components/Cart/CartIcon";
import AuthDropdown from "../Components/Dropdown/AuthDropdown";
import { useCart } from "../Contexts/cartContextType";
import { useAuth } from "../Contexts/AuthContext";
import MobileSidebar from "./Sidebar/MobileSid";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce(
    (sum, item) => sum + (item.existences?.quantity || 0),
    0
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCartOpen, setSidebarCartOpen] = useState(false);
  const [menuMobilOpen, setMenuMobilOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  //options
  const guestOptions = [{ id: 1, name: "Iniciar sesión", path: "/login" }];

  const userOptions = [
    { id: 1, name: "Perfil", path: "/profile" },
    { id: 2, name: "Mis pedidos", path: "/orders" },
    { id: 3, name: "Cerrar sesión", path: "/home" },
  ];
  const options = user ? userOptions : guestOptions;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      navigate("/orders");
    }
  };

  return (
    <>
      <div className=" sticky top-0 z-[1] shadow-xl">
        <nav className="bg-secondary-50 top-0 w-full py-2 sm:px-10 flex ">
          <div className="flex items-center">
            <button
              className="block md:hidden mx-2 text-accent-900"
              onClick={() => setMenuMobilOpen(true)}
            >
              <Menu size={28} />
            </button>
            <img
              src="/LogoText.png"
              alt="Logo de la empresa"
              className="cursor-pointer drop-shadow-[0_0_4px_white] hover:drop-shadow-[0_0_6px_white]  h-8 mr-2 md:h-10 2xl:h-[60px]"
              onClick={() => navigate("/home")}
            />

            <Button
              icon={<Menu />}
              text="Categorías"
              onClick={() => setSidebarOpen(true)}
              variant="cat"
            />

            <SidebarCat isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="relative w-[200px] sm:w-[550px] md:w-[600px] lg:w-[600px] xl:w[600px] 2xl:w-[900px] ">
              <SearchComponent />
            </div>

            <AuthDropdown />
            <div className="h-[20px] w-[1px] bg-secondary-200 mx-3 2xl:mx-5 hidden md:flex"></div>

            <a
              href="/orders"
              className="text-center text-accent-900 hover:bg-secondary-100 rounded-lg p-2 m-auto text-[14px] flex items-center gap-1 hidden md:flex 2xl:px-5 "
              onClick={handleClick}
            >
              <ShoppingBag size={24} className="text-accent-900" />
              Mis Compras
            </a>
            <SidebarCart
              isOpen={sidebarCartOpen}
              setIsOpen={setSidebarCartOpen}
            />

            <div className="h-[20px] w-[1px] bg-secondary-200 mx-3 2xl:mx-5 hidden md:flex"></div>

            {/* Carrito */}
            <CartIcon
              itemCount={totalItems}
              onClick={() => setSidebarCartOpen(true)}
            />
          </div>
        </nav>

        {/* Menú inferior */}
        <div className="bg-secondary-100 flex justify-end px-10 py-1 text-[10px] text-gray-600">
          <a
            href="/contact"
            className="mx-4 hover:underline hover:text-primary-800 hover:font-bold"
          >
            Contactanos
          </a>
          <a
            href="/aboutUs"
            className="hover:underline hover:text-primary-800 hover:font-bold"
          >
            Sobre nosotros
          </a>
        </div>
        <MobileSidebar
          menuMobilOpen={menuMobilOpen}
          setMenuMobilOpen={setMenuMobilOpen}
          user={user}
          options={options}
          logout={logout}
          
        />
      </div>
    </>
  );
};

export default Navbar;
