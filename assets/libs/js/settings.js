import { config } from "./config.js";
import { utils } from "./utils.js";


export function mostrarOcultarMenu() {
    utils.obtenerObjetoPorID("mainMenu").classList.toggle("show-menu");
}

export function cambiarTema(e) {
    const nvoBoton = e.target;
    if (nvoBoton.tagName === "INPUT") {
        const newConfig = config.cargar();
        newConfig.btnCurrent = nvoBoton.id;
        newConfig.typeTheme = nvoBoton.value;
        config.guardar(newConfig);
    }
}

export function cambiarFondo(e) {
    if (e.target.id === "lstFondos") {
        return;
    }

    const myConfig = config.cargar();

    utils.establecerValorPorID("btnFondoMain", e.target.textContent);
    cambiarItemSeleccionado(e, "lstFondos", ".opcFondo");
    mostrarFondo(e.target.id);

    myConfig.bgCurrent = e.target.id;
    myConfig.divFondo = e.target.textContent;

    config.guardar(myConfig);
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

export function obtenerAjustes() {
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

export function cambiarColor(e) {
    if (e.target.id === "lstColores") {
        return;
    }

    const myConfig = config.cargar();

    const divColor = utils.obtenerObjetoPorID(e.target.id);
    const newColor = divColor.style.getPropertyValue("color");
    const newBackground = divColor.style.getPropertyValue("background-color");

    establecerTemaColores(newColor, newBackground);
    cambiarItemSeleccionado(e, "lstColores", ".div-color");

    myConfig.clrTheme = newColor;
    myConfig.bgTheme = newBackground;
    myConfig.divColor = e.target.id;

    config.guardar(myConfig);
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

export function establecerIniciales() {
    const myConfig = config.cargar();

    myConfig.myInitials = utils.obtenerValorPorID("userInitials");

    config.guardar(myConfig);
}
