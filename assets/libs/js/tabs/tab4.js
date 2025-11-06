import { utils } from "../utils.js";

function commentTier2() {
    utils.obtenerObjetoPorID("nVPO").textContent = utils.obtenerValorPorID("txtActual");
}

function copiarCommentTier2() {
    if (utils.validarCampoVacio(utils.obtenerObjetoPorID("nVPO").textContent)) {
        const contenido = utils.obtenerObjetoPorID("txtTier2").textContent.trim();
        const sinFormato = eliminarEspacios(contenido);
        utils.copiarContenido(sinFormato);
    }
}

export function mostrarContenido(e) {
    if (e.target.tagName == "DIV") {
        return;
    }

    let parrafo = "";
    const opciones = {
        asignado: utils.obtenerValorPorID("txtAsignado"),
        unidades: utils.obtenerValorPorID("txtUnidades"),
        otrosLotes: utils.obtenerValorPorID("txtMaterial"),
    };

    if (e.target.tagName == "H4") {
        parrafo = eliminarEspacios(e.target.parentElement.children[2].textContent);
    }
    if (e.target.tagName == "BLOCKQUOTE") {
        parrafo = eliminarEspacios(e.target.children[2].textContent);
    }

    parrafo = parrafo
        .replace("@Asignado", opciones.asignado)
        .replace("@Cant", opciones.unidades)
        .replace("@Lotes", opciones.otrosLotes);
    utils.establecerValorPorID("txtExcepcion", parrafo);

    document
        .getElementById("lstExcepciones")
        .parentElement.removeAttribute("open");
}

function eliminarEspacios(pValor) {
    return pValor.replace(/\n/g, " ").replace(/  /g, "").trim();
}

function copiarComentarioTier2() {
    const vComentario = utils.obtenerValorPorID("txtExcepcion");

    if (utils.validarCampoVacio(vComentario)) {
        utils.copiarContenido(vComentario);
    }
}

export function abrirModal(e) {
    const idModal = e.target.dataset.modal;
    utils.obtenerObjetoPorID(idModal).showModal();
}

function guardarNuevaExcepcion() {
    // body...
}

function cerrarModal(e) {
    const idModal = e.target.dataset.modal;
    utils.obtenerObjetoPorID(idModal).close();
}
