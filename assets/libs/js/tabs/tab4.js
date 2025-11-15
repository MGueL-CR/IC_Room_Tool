import { utils } from "../utils.js";
import { nuevaExcepcion } from "../components.js";

export const tab4 = {
    generarNuevaExcepcion(e) {
        const dtForm = Object.fromEntries(new FormData(e.target));
        if (utils.validarCampoVacio(dtForm.txtContenido)) {
            const lstExcepciones = utils.obtenerObjetoPorID("lstExcepciones").firstElementChild;
            const vIndex = lstExcepciones.children.length + 1;
            const nvaExcep = nuevaExcepcion(vIndex, dtForm);
            utils.guardarListaEnMemLocal("lstExcepciones", dtForm)
            lstExcepciones.appendChild(nvaExcep);
            e.target.reset();
        }
    },
    copiarCommentTier2(e) {
        const dtForm = Object.fromEntries(new FormData(e.target));
        if (utils.validarCampoVacio(dtForm.nVPO)) {
            const contenido = `Cris, la VPO ${dtForm.nVPO.toUpperCase()} queda con dependencia al Tier-2.`;
            utils.copiarContenido(contenido);
            e.target.reset()
        }
    },
    cambiarValores(e) {
        if (e.target.tagName === "INPUT") {
            const vID = utils.obtenerValorPorID("txtTipoExcep");
            if (utils.validarCampoVacio(vID)) {
                const vParrafo = eliminarEspacios(utils.obtenerObjetoPorID(vID).lastElementChild);
                const vContenido = reemplazarOpciones(vParrafo);
                utils.establecerValorPorID("txtExcepcion", vContenido);
            }
        }
    },
    mostrarContenido(e) {
        if (e.target.tagName !== "DIV") {
            const parrafo = obtenertextoParrafo(e.target);

            const nvoComentario = reemplazarOpciones(parrafo)
            utils.establecerValorPorID("txtExcepcion", nvoComentario);
            document
                .getElementById("lstExcepciones")
                .parentElement.removeAttribute("open");
        }
    },
    copiarComentarioTier2() {
        const vComentario = utils.obtenerValorPorID("txtExcepcion");

        if (utils.validarCampoVacio(vComentario)) {
            utils.copiarContenido(vComentario);
        }
    },
    eventosModal(e) {
        const nvoBoton = e.target;
        if (nvoBoton.tagName === "INPUT") {
            if (nvoBoton.id === "btnAgregar" || nvoBoton.id === "btnToBoss") {
                utils.abrirModal(nvoBoton);
            }
            if (nvoBoton.id === "btnCerrar" || nvoBoton.id === "btnTier2Del") {
                utils.cerrarModal(nvoBoton);
            }
        }
    }
}

function obtenertextoParrafo(pElemento) {
    if (pElemento.tagName == "H4") {
        utils.establecerValorPorID("txtTipoExcep", pElemento.parentElement.id);
        return eliminarEspacios(pElemento.parentElement.children[2]);
    }
    if (pElemento.tagName == "BLOCKQUOTE") {
        utils.establecerValorPorID("txtTipoExcep", pElemento.id);
        return eliminarEspacios(pElemento.lastElementChild);
    }
}

function reemplazarOpciones(pContenido) {
    const opciones = {
        asignado: utils.obtenerValorPorID("txtAsignado"),
        unidades: utils.obtenerValorPorID("txtUnidades"),
        otrosLotes: utils.obtenerValorPorID("txtMaterial"),
    };
    return pContenido
        .replace("@Asignado", opciones.asignado)
        .replace("@Cant", opciones.unidades)
        .replace("@Lotes", opciones.otrosLotes);
}

function eliminarEspacios(pValor) {
    return pValor.textContent.replace(/\n/g, " ").replace(/  /g, "").trim();
}