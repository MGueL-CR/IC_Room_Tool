import { config } from "./config.js";
import { utils } from "./utils.js";

export const settings = {
    mostrarOcultarMenu() {
        utils.obtenerObjetoPorID("mainMenu").classList.toggle("show-menu");
    },
    cambiarTema(e) {
        const nvoBoton = e.target;
        if (nvoBoton.tagName === "INPUT") {
            const newConfig = config.cargar();
            newConfig.btnCurrent = nvoBoton.id;
            newConfig.typeTheme = nvoBoton.value;
            config.guardar(newConfig);
        }
    },
    cambiarFondo(e) {
        const nvoFondo = e.target;
        if (nvoFondo.id !== "lstFondos") {
            const myConfig = config.cargar();

            utils.establecerValorPorID("btnFondoMain", nvoFondo.textContent);
            cambiarItemSeleccionado(e, "lstFondos", ".opcFondo");
            mostrarFondo(nvoFondo.id);

            myConfig.bgCurrent = nvoFondo.id;
            myConfig.divFondo = nvoFondo.textContent;

            config.guardar(myConfig);
        }
    },
    cambiarColor(e) {
        const nvoColor = e.target;
        if (nvoColor.id !== "lstColores") {
            const myConfig = config.cargar();

            const divColor = utils.obtenerObjetoPorID(nvoColor.id);
            const newColor = divColor.style.getPropertyValue("color");
            const newBackground = divColor.style.getPropertyValue("background-color");

            establecerTemaColores(newColor, newBackground);
            cambiarItemSeleccionado(e, "lstColores", ".div-color");

            myConfig.clrTheme = newColor;
            myConfig.bgTheme = newBackground;
            myConfig.divColor = nvoColor.id;

            config.guardar(myConfig);
        }
    },
    establecerIniciales() {
        const myConfig = config.cargar();
        myConfig.myInitials = utils.obtenerValorPorID("userInitials");
        config.guardar(myConfig);
    },
    obtenerAjustes() {
        const configGeneral = config.cargar();

        if (configGeneral) {
            if (configGeneral.clrTheme && configGeneral.bgTheme) {
                establecerTemaColores(configGeneral.clrTheme, configGeneral.bgTheme);
                utils.obtenerObjetoPorID(configGeneral.divColor).classList.add("clr-active");
            }
            if (configGeneral.bgCurrent) {
                utils.obtenerObjetoPorID(configGeneral.bgCurrent).classList.add("clr-active");
                utils.establecerValorPorID("btnFondoMain", configGeneral.divFondo);
                mostrarFondo(configGeneral.bgCurrent);
            }
            if (configGeneral.myInitials) {
                utils.establecerValorPorID("userInitials", configGeneral.myInitials);
            }
            if (configGeneral.typeTheme) {
                utils.obtenerObjetoPorID(configGeneral.btnCurrent).click();
            }
        }

        utils.establecerValorPorID("nota01", utils.leerMemLocal("nota01"));
        utils.establecerValorPorID("nota02", utils.leerMemLocal("nota02"));
        utils.establecerValorPorID("nota03", utils.leerMemLocal("nota03"));
    }
}

function mostrarFondo(pOpcion) {
    utils.obtenerObjetoPorID("galeriaFondos")
        .querySelectorAll("svg")
        .forEach((wl) => wl.classList.add("no-svg"));

    switch (pOpcion) {
        case "bg01":
            utils.obtenerObjetoPorID("Layer_1").classList.remove("no-svg");
            break;
        case "bg02":
            utils.obtenerObjetoPorID("Layer_2").classList.remove("no-svg");
            break;
        case "bg03":
            utils.obtenerObjetoPorID("Layer_3").classList.remove("no-svg");
            break;
        case "bg04":
            utils.obtenerObjetoPorID("Layer_4").classList.remove("no-svg");
            break;
        case "bg05":
            utils.obtenerObjetoPorID("Layer_5").classList.remove("no-svg");
            break;
        case "bg06":
            utils.obtenerObjetoPorID("Layer_6").classList.remove("no-svg");
            break;
        case "bg07":
            utils.obtenerObjetoPorID("Layer_7").classList.remove("no-svg");
            break;
        default:
            break;
    }
}

function cambiarItemSeleccionado(pItem, pLista, pClase) {
    utils.obtenerObjetoPorID(pLista)
        .querySelectorAll(pClase)
        .forEach((dv) => dv.classList.remove("clr-active"));
    pItem.target.classList.add("clr-active");
}

function establecerTemaColores(pColor, pBackground) {
    const thisBody = utils.obtenerObjetoPorID("bodyMain");
    thisBody.style.setProperty("--color-theme", pColor);
    thisBody.style.setProperty("--bg-theme", pBackground);
}
