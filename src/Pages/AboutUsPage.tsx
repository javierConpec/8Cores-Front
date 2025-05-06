export const AboutUS = () => {
  return (
    <div>
    
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden">
        <img
          src="./AboutUs.jpg"
          alt="Fondo de quienes somos"
          className="w-full h-full object-cover"
        />
        <div className="absolute right-5 md:right-16 top-1/2 transform -translate-y-1/2 text-right px-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            ¿QUIÉNES <br /> SOMOS?
          </h1>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            className="fill-[#eeebfa] dark:fill-secondary-50"
            fillOpacity="1"
            d="M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,181.3C672,160,768,96,864,101.3C960,107,1056,181,1152,208C1248,235,1344,213,1392,202.7L1440,192L1440,320L0,320Z"
          ></path>
        </svg>
      </section>

      <section className="px-4 py-14 md:px-20 space-y-12 text-text-800">
        <div className="flex flex-col lg:flex-row justify-between gap-10  bg-background-0 dark:bg-background-100 rounded-3xl p-8 shadow-xl ">
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <img
              src="/LogoNew.png"
              alt="Logo 8Cores"
              className="w-full max-w-md object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2 flex items-center">
            <p className="text-lg md:text-xl text-justify leading-relaxed">
              <strong>8Cores</strong> es más que una tienda: es una experiencia
              tecnológica. Nuestro nombre representa la potencia y rendimiento
              de los procesadores de ocho núcleos, y simboliza nuestra pasión
              por la innovación. Nos especializamos en productos electrónicos
              modernos, eficientes y con estilo, seleccionados con rigor para
              ofrecer calidad y confianza.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-10">
  <section className="w-full bg-background-0 dark:bg-background-100 rounded-3xl p-8 shadow-xl">
    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-800">
      Nuestra Misión
    </h2>
    <p className="text-lg leading-relaxed text-justify">
      Brindar soluciones tecnológicas que mejoren la vida de nuestros
      clientes. Desde computadoras y accesorios hasta dispositivos de
      última generación, cada producto es elegido con el objetivo de
      garantizar el mejor rendimiento y una experiencia satisfactoria. Nos
      esforzamos por combinar servicio al cliente excepcional con
      productos que marcan la diferencia.
    </p>
  </section>

  <section className="w-full bg-background-0 dark:bg-background-100 rounded-3xl p-8 shadow-xl">
    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-800">
      Nuestra Visión
    </h2>
    <p className="text-lg leading-relaxed text-justify">
      Aspiramos a convertirnos en la tienda de referencia en comercio
      electrónico tecnológico en Latinoamérica. Nos proponemos anticipar
      tendencias, liderar con innovación y empoderar a nuestros usuarios
      para que logren más a través de la tecnología. Queremos ser
      reconocidos por nuestra confiabilidad, cercanía y calidad.
    </p>
  </section>
</div>


        <section className="bg-background-0 dark:bg-background-100 rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-800">
        ¿Por qué elegirnos?
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            En <strong>8Cores</strong>, un nombre que evoca la potencia y el
            rendimiento de los procesadores de ocho núcleos, representa nuestra
            dedicación a ofrecer productos electrónicos de alta calidad. Nuestra
            tienda está diseñada para satisfacer las necesidades de los usuarios
            modernos, buscando siempre la innovación y la eficiencia en cada
            producto que ofrecemos..
          </p>
        </section>
      </section>
    </div>
  );
};
