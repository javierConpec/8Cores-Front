const PolíticasYTerminos = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <a
          href="#envios"
          className="text-text-800 font-semibold mx-4 hover:underline hover:text-text-600 transition duration-300"
        >
          Políticas de Envío
        </a>
        <a
          href="#terminos"
          className="text-text-800 font-semibold mx-4 hover:underline hover:text-text-600 transition duration-300"
        >
          Términos y Condiciones
        </a>
      </div>

      <section
        id="envios"
        className="bg-background-0 dark:bg-background-100 p-8 rounded-3xl shadow-lg mb-16 transition-transform duration-300 hover:scale-105"
      >
        <h2 className="text-4xl text-text-800 font-extrabold mb-8">
          Políticas de Envío
        </h2>

        <div className="mb-6">
          <h3 className="text-2xl text-text-700 font-semibold mb-4 flex items-center">
            <i className="fas fa-truck mr-3 text-text-600"></i> Proceso de
            Envío
          </h3>
          <p className="text-lg text-text-700">
            Los pedidos serán procesados en un plazo de 1 a 2 días hábiles desde
            la confirmación de compra. Una vez procesado, se notificará al
            cliente mediante correo electrónico cuando el pedido haya sido
            enviado. Existen diferentes modalidades de envío, ajustadas a las
            necesidades de cada cliente. El envío estándar tiene un tiempo de
            entrega estimado de 5 a 7 días hábiles, mientras que el envío exprés
            tiene un tiempo estimado de 2 a 3 días hábiles, con un costo
            adicional. Para envíos internacionales, los tiempos de entrega
            pueden variar dependiendo del destino y la gestión aduanera del país
            de recepción, que podría generar retrasos ajenos a la
            responsabilidad de la tienda.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl text-text-700 font-semibold mb-4 flex items-center">
            <i className="fas fa-tag mr-3 text-text-600"></i> Tarifas y
            Seguimiento
          </h3>
          <p className="text-lg text-text-700">
            En cuanto a las tarifas, se ofrece envío gratuito para pedidos
            nacionales que superen los $100 USD. Para aquellos pedidos cuyo
            importe sea menor, se aplicarán cargos por envío basados en el peso
            del paquete y el destino de entrega. Además, se proporcionará al
            cliente un número de seguimiento para consultar el estado del envío
            en cualquier momento, lo que garantiza un seguimiento transparente
            del pedido.
          </p>
        </div>
      </section>

      {/* Sección Términos y Condiciones */}
      <section
        id="terminos"
        className="bg-background-0 dark:bg-background-100 p-8 rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <h2 className="text-4xl text-text-800 font-extrabold mb-8">
          Términos y Condiciones
        </h2>

        <div className="mb-6">
          <h3 className="text-2xl text-text-700 font-semibold mb-4 flex items-center">
            <i className="fas fa-check-circle mr-3 text-text-600"></i>{" "}
            Aceptación de Términos
          </h3>
          <p className="text-lg text-text-700">
            El uso de este sitio web implica la aceptación de los siguientes
            términos y condiciones. Al acceder, navegar o utilizar el sitio, el
            usuario acepta estar sujeto a estos términos. En caso de no estar de
            acuerdo, se recomienda no utilizar este sitio web. Los términos y
            condiciones pueden ser actualizados sin previo aviso, y es
            responsabilidad del usuario revisar las modificaciones.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl text-text-700 font-semibold mb-4 flex items-center">
            <i className="fas fa-laptop mr-3 text-text-600"></i> Uso del Sitio
            Web
          </h3>
          <p className="text-lg text-text-700">
            El acceso a este sitio web es exclusivamente para fines personales y
            no comerciales. Está prohibido modificar, copiar, distribuir,
            transmitir, exhibir, reproducir, publicar, licenciar o vender
            cualquier información, software, productos o servicios obtenidos a
            través de este sitio. El usuario se compromete a no utilizar el
            sitio para ningún propósito ilícito o prohibido por estos términos.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl text-text-700 font-semibold mb-4 flex items-center">
            <i className="fas fa-credit-card mr-3 text-text-600"></i> Precio y
            Pagos
          </h3>
          <p className="text-lg text-text-700">
            Todos los precios mostrados en el sitio están en la moneda indicada
            y no incluyen los costos de envío, que se calculan y añaden en el
            proceso de compra. Los pagos se realizarán a través de los métodos
            aceptados en el sitio y deberán ser confirmados antes del envío del
            producto. Nos reservamos el derecho de cancelar cualquier pedido en
            caso de errores en los precios o problemas relacionados con el pago.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl text-text-700 font-semibold mb-4 flex items-center">
            <i className="fas fa-hand-holding-box mr-3 text-text-600"></i>{" "}
            Devoluciones y Cambios
          </h3>
          <p className="text-lg text-text-700">
            Las devoluciones y cambios se aceptan dentro de un plazo de 30 días
            naturales desde la recepción del pedido. Los productos deben
            encontrarse en su estado original, sin haber sido utilizados y en su
            empaque original. Se aplicarán las políticas específicas de
            devoluciones descritas en la sección correspondiente del sitio web.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl text-text-700 font-semibold mb-4 flex items-center">
            <i className="fas fa-shield-alt mr-3 text-text-600"></i> Garantías
            y Limitación de Responsabilidad
          </h3>
          <p className="text-lg text-text-700">
            Los productos vendidos en el sitio están garantizados según las
            políticas del fabricante. No se ofrece garantía adicional por parte
            de la tienda, salvo la especificada en los términos aplicables. En
            ningún caso la tienda será responsable por daños indirectos,
            incidentales o consecuentes relacionados con el uso o la
            imposibilidad de uso de los productos.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PolíticasYTerminos;
