export const appearance = {
  theme: "default",
  hiddenCulqiLogo: true,
  hiddenBannerContent: false,
  hiddenBanner: false,
  hiddenToolBarAmount: false,
  hiddenEmail: false,
  menuType: "sliderTop", // default/sidebar / sliderTop / select
  buttonCardPayText: "Pagar", // hexadecimal
  logo: "https://i.imgur.com/PXRr4zz.png",
  defaultStyle: {
    bannerColor: "black", // hexadecimal
    buttonBackground: "#ad7ab5", // hexadecimal
    menuColor: "pink", // hexadecimal
    linksColor: "green", // hexadecimal
    buttonTextColor: "black", // hexadecimal
    priceColor: "black",
  },
  variables: {
    fontFamily: "Sans-serif",
    fontWeightNormal: "500",
    borderRadius: "100px",
    colorBackground: "#5136c9",
    colorPrimary: "#5c44bb",
    colorPrimaryText: "#000",
    colorText: "white",
    colorTextSecondary: "white",
    colorTextPlaceholder: "#727F96",
    colorIconTab: "white",
    colorLogo: "dark",
    soyUnaVariable: "f1f1f1",
  },
  rules: {
    ".Culqi-Main-Container": {
      background: "#fff",
      fontFamily: "var(--fontFamily)",
    },
    ".Culqi-ToolBanner": {
      background: "#5c44bb",
      fontFamily: "var(--fontFamily)",
      color: "white",
    },
    // cambia el color del texto y del ícono
    ".Culqi-Toolbar-Price": {
      color: "black",
      fontFamily: "var(--fontFamily)",
    },
    // cambia el color solo del ícono
    ".Culqi-Toolbar-Price .Culqi-Icon": {
      color: "var(--colorPrimary)",
    },
    ".Culqi-Main-Method": {
      background: "#9686df",
      padding: "10px 20px",
      color: "black",
    },

    // aplica color al texto del link y al Icon del link
    ".Culqi-Text-Link": {
      color: "red",
    },
    // Solo aplica color al Icon del link
    ".Culqi-Text-Link .Culqi-Icon": {
      color: "blue",
    },
    // Message, color aplica para text e ícono
    ".Culqi-message": {
      color: "blue",
    },
    // cambia el color solo del ícono
    ".Culqi-message .Culqi-Icon": {
      color: "red",
    },
    ".Culqi-message-warning": {
      background: "white",
      color: "black",
    },
    ".Culqi-message-info": {
      background: "white",
      color: "black",
    },
    ".Culqi-message-error": {
      background: "black",
      color: "black",
    },
    ".Culqi-message-error .Culqi-Icon": {
      color: "black",
    },

    // aplica a los labels
    ".Culqi-Label": {
      color: "var(--soyUnaVariable)",
      marginBottom: "10px",
      fontSize: "15px",
    },
    ".Culqi-Input": {
      border: "1px solid white ",
      color: "var(--soyUnaVariable)",
    },
    ".Culqi-Input:focus": {
      border: "2px solid blue",
    },
    ".Culqi-Input.input-valid": {
      border: "1px solid #2b1881",
      color: "var(--soyUnaVariable)",
    },
    ".Culqi-Input-Icon-Spinner": {
      color: "blue",
    },
    ".Culqi-Input-Select": {
      border: "1px solid red",
      color: "blue",
    },
    // aplica para al hacer hover en los options del select
    ".Culqi-Input-Select-Options-Hover": {
      color: "red",
      background: "black",
    },
    // aplica para el seleccionado al ser activado
    ".Culqi-Input-Select-Selected": {
      color: "green",
    },
    ".Culqi-Input-Select.active": {
      // utíl cuando le das click al control
      border: "1px solid red",
      background: "pink",
    },
    // aplica a los botones
    ".Culqi-Button": {
      background: "#4828d7",
    },

    //--------Menu GENERALES----------------
    // el color se aplica para el texto y el ícono del menú
    ".Culqi-Menu": {
      color: "black",
      //background: "white",
    },

    // el color se aplica para el ícono del menú
    ".Culqi-Menu .Culqi-Icon": {
      color: "green",
    },
    //-------FIN Menu GENERALES----------------

    //----------------- MENU SLIDERTOP Y SIDEBAR----------------------

    ".Culqi-Menu-Item": {
      background: 'white',
      color: 'black',
      width: '200px',
      height: '80px',
      zIndex: '1',
    },

    // cambia el color para el item menu, tanto texto e ícono seleccionado (no aplica en el select menu)
    ".Culqi-Menu-Item.active": {
      color: "black",
      border: "1px solid #9686df",
      fontSize: "14px",
    },
    // cambia el color para el ICONO del item menu seleccionado (no aplica en el select menu)
    ".Culqi-Menu-Item.active .Culqi-Icon": {
      color: "blue",
    },

    // MODIFICA EL TEXTO DEL MENÚ(no aplica al menú select)
    ".Culqi-Menu-Item-Text": {
      // reemplaza a la clase .Culqi-Menu-Item
      fontSize: "14px",
      color: "blue",
    },

    // cambia el color de los ICONOS ARROW DE sliderTop
    ".Culqi-Menu .Culqi-Icon-Arrow": {
      color: "blue",
    },
    // CAMBIA EL COLOR DE LA BARRA LATERAL DE SIDEBAR
    ".Culqi-Menu-Item.active .Culqi-Bar": {
      background: "blue",
    },
  },
};
