import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" bg-background-200 dark:bg-background-100 text-text-700 py-8 mt-10 w-full">
      <div className=" mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* Información de la tienda */}
        <div>
          <img
            src="/LogoText.png"
            alt="Logo de la empresa"
            className="h-[30px] md:h-[50px] drop-shadow-[0_0_4px_white] hover:drop-shadow-[0_0_6px_white]"
          />
          <p className="text-[10px] md:text-sm text-text-600 mt-2">
            Echos para complacerte y brindarte la mejor tecnologia con la mejor
            calidad en cada producto. 8Cores cada vez brindandote lo mejor de lo
            mejor
          </p>
        </div>

        <div>
          <h3 className="text-sm md:text-lg font-semibold">Enlaces</h3>
          <ul className="text-sm md:text-md mt-2 space-y-2">
            <li>
              <a
                href="/aboutUs"
                className="text-text-600 hover:text-text-800 hover:underline"
              >
                Sobre nosotros
              </a>
            </li>
            <li>
              <a
                href="/PolíticasYTerminos"
                className="text-text-600 hover:text-text-800 hover:underline"
              >
                Politica y Terminos
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-text-400 hover:text-text-800 hover:underline"
              >
                Contacto
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/uGN45twgGUkDn61H8"
                className="text-text-400 hover:text-text-800 hover:underline"
              >
                Ubicanos en
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Síguenos</h3>
          <div className="flex md:justify-start justify-between space-x-4 mt-2">
            <a
              href="https://www.facebook.com/jxviiiiiiZzzz"
              className="text-text-400 hover:text-accent-500"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.instagram.com/eduxxcp/"
              className="text-text-400 hover:text-accent-500"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@javi19cp?_t=ZM-8tQyzblErCf&_r=1"
              className="text-text-400 hover:text-accent-500"
            >
              <FaTiktok size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} 8Cores. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
