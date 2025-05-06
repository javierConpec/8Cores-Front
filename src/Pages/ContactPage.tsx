export const Contact = () => {
  return (
    <section className=" px-6 md:px-20 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-900">
        Contáctanos
      </h2>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 space-y-10">
          <div className="bg-background-0 dark:bg-background-100 p-6 rounded-2xl shadow-lg  text-text-900">
            <h3 className="text-xl font-semibold text-accent-800 mb-2">
              Horario de trabajo
            </h3>
            <p>Lun ~ Vie: 08:00 - 22:00</p>
            <p>Sábado: 10:00 - 22:00</p>
            <p>Domingo: 10:00 - 15:00</p>
          </div>

          {/* Ubicación */}
          <div className="bg-background-0 dark:bg-background-100 p-6 rounded-2xl shadow-lg text-text-900">
            <h3 className="text-xl  font-semibold text-accent-800 mb-2">
              Ubicación de tienda
            </h3>
            <p>Av. Fray A. Alcalde 10</p>
            <p>44160, Jir. Bolht, Jal., Perú</p>
            <p>📧 info@8cores.com</p>
            <p>📞 +51-123-456-789</p>
          </div>
        </div>

        {/* Formulario */}
        <div className="lg:w-1/2 bg-background-0 dark:bg-background-100 p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold text-accent-800 mb-4">
            ¡Estamos aquí para ayudarte!
          </h3>
          <p className="mb-6 text-text-600">
            Completa el formulario con cualquier duda que tengas y te
            responderemos lo antes posible.
          </p>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-700"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-background-100 mt-1 p-3 border border-text-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400"
              />
            </div>

            <div>
              <label
                htmlFor="asunto"
                className="block text-sm font-medium text-text-700"
              >
                Asunto *
              </label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                required
                className="w-full bg-background-100 mt-1 p-3 border border-text-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400"
              />
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium text-text-700"
              >
                Mensaje *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                placeholder="Escribe tu mensaje aquí..."
                className="w-full bg-background-100  mt-1 p-3 border border-text-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-accent-600 text-text-900 px-6 py-3 rounded-lg hover:bg-accent-700 transition font-semibold w-full"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
