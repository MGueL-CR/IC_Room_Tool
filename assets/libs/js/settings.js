import { config } from "./config.js";
import { utils } from "./utils.js";


export function mostrarOcultarMenu() {
    utils.obtenerObjetoPorID("mainMenu").classList.toggle("show-menu");
}

function cambiarTema() {
    let newConfig = getMyConfig();

    newConfig.btnCurrent = this.id;
    newConfig.typeTheme = this.name;

    if (this.id === "btnSun") {
        obtenerObjetoPorID("btnMoon").classList.remove("btn-active");
        obtenerObjetoPorID("btnSun").classList.add("btn-active");
    } else {
        obtenerObjetoPorID("btnSun").classList.remove("btn-active");
        obtenerObjetoPorID("btnMoon").classList.add("btn-active");
    }

    document.querySelector("body").className = newConfig.typeTheme;
    setMyConfig(newConfig);
}

function cambiarFondo(e) {
    if (e.target.id === "lstFondos") {
        return;
    }

    const myConfig = getMyConfig();

    establecerValorPorID("btnFondoMain", e.target.textContent);
    cambiarItemSeleccionado(e, "lstFondos", ".opcFondo");
    mostrarFondo(e.target.id);

    myConfig.bgCurrent = e.target.id;
    myConfig.divFondo = e.target.textContent;

    setMyConfig(myConfig);
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

    if (configGeneral !== null) {
        if (configGeneral.typeTheme) {
            document.querySelector("body").classList.add(configGeneral.typeTheme);
            utils.obtenerObjetoPorID(configGeneral.btnCurrent).classList.add("btn-active");
        }
        if (
            configGeneral.clrTheme !== undefined &&
            configGeneral.bgTheme !== undefined
        ) {
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
    }

    utils.establecerValorPorID("nota01", utils.leerMemLocal("nota01"));
    utils.establecerValorPorID("nota02", utils.leerMemLocal("nota02"));
    utils.establecerValorPorID("nota03", utils.leerMemLocal("nota03"));
}

function cambiarColor(e) {
    if (e.target.id === "lstColores") {
        return;
    }

    const myConfig = config.cargar();

    const divColor = obtenerObjetoPorID(e.target.id);
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
    obtenerObjetoPorID(pLista)
        .querySelectorAll(pClase)
        .forEach((dv) => dv.classList.remove("clr-active"));
    pItem.target.classList.add("clr-active");
}

function establecerTemaColores(pColor, pBackground) {
    utils.obtenerObjetoPorID("bodyMain").style.setProperty("--color-theme", pColor);
    utils.obtenerObjetoPorID("bodyMain").style.setProperty("--bg-theme", pBackground);
}

function establecerIniciales() {
    const myConfig = config.cargar();

    myConfig.myInitials = obtenerValorPorID("userInitials");

    config.guardar(myConfig);
}
