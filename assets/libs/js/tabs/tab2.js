import { utils } from "../utils.js";
export const tab2 = {
    generarComentarioCRAT(e) {
        const iniciales = utils.obtenerValorPorID("userInitials").trim();

        if (utils.validarCampoVacio(e.target.value)) {
            const contenido = e.target.value.split("\t");
            if (contenido.length <= 1) {
                return;
            }

            asignarValor(
                document.getElementById("commenCTR"),
                `${contenido[0].trim()} ${iniciales}`
            );
            asignarValor(document.getElementById("txtOwner"), contenido[8]);
            asignarValor(document.getElementById("txtLotName"), contenido[9]);
            asignarValor(document.getElementById("txtPartType"), contenido[10]);
            asignarValor(document.getElementById("txtUnits"), contenido[11]);
            asignarValor(document.getElementById("txtQDF"), contenido[14]);
            asignarValor(document.getElementById("txtLocation"), "ACTIVE: RAW");
        }
    },
    copiarValoresCTR(e) {
        const input = e.target;

        if (input.tagName == "INPUT") {
            let vContenido = input.value;

            if (input.id == "txtOwner") {
                if (!vContenido.includes(",")) {
                    nvoArray = vContenido.split(" ");
                    vContenido = `${nvoArray[1]} ${nvoArray[2]}, ${nvoArray[0]}`;
                }
            }

            if (input.id == "txtPartType") {
                vContenido = input.value.split(" ")[0].substring(2);
            }

            if (input.id == "txtQDF") {
                vContenido = input.value.split(" ")[0].substring(0, 4);
            }

            if (validarCampoVacio(vContenido)) {
                copiarContenido(vContenido);
            }
        }
    },
    generarComentarioWO(e) {
        const txtCopiado = e.target.value.trim().split("\n");

        if (txtCopiado.length <= 1) {
            return;
        }

        const masparrafo = txtCopiado[2].split("\t");
        const comentario = `${txtCopiado[0].trim()} - QTY ${masparrafo[3]} - ${masparrafo[5]
            }`;
        asignarValor(document.getElementById("txtNumWO"), txtCopiado[0].trim());
        asignarValor(document.getElementById("txtQty"), masparrafo[3]);
        asignarValor(document.getElementById("txtMachine"), masparrafo[5]);
        asignarValor(document.getElementById("commentWO"), comentario);
    },
    copiarComentarioWO() {
        const contenido = utils.obtenerValorPorID("commentWO");
        if (utils.validarCampoVacio(contenido)) {
            utils.copiarContenido(contenido);
        } vvv
    },
    copiarInfoAdicionalWO() {
        if (utils.validarCampoVacio(utils.obtenerValorPorID("commentWO"))) {
            const comentarioWO = utils.obtenerValorPorID("commentWO").split("-");
            utils.copiarContenido(
                `\n\nVPO:\t- ${comentarioWO[0].trim()}\n\t- ${comentarioWO[1].trim()}\n\t- ${comentarioWO[2].trim()}\n`
            );
            const nvaVPO = window.btoa(
                JSON.stringify({
                    numero: comentarioWO[0].trim(),
                    cantidad: comentarioWO[1].trim(),
                    maquina: comentarioWO[2].trim(),
                })
            );
            utils.abrirVortex(nvaVPO);
        }
    },
    genernarComentarioRAN(e) {
        if (e.target.tagName === "INPUT") {
            const nRAN = utils.obtenerValorPorID("nRan");
            const vTipo = isNaN(utils.obtenerValorPorID("codBol")) ? "BLS" : "ISM";
            const nBOL = utils.obtenerValorPorID("codBol");
            const vNom = utils.obtenerValorPorID("userInitials");

            if (!utils.validarCampoVacio(nRAN) || !utils.validarCampoVacio(nBOL)) {
                utils.establecerValorPorID("ranComment", "Existen campos vacios!!");
                return;
            }

            const location =
                vTipo == "BLS" ? "ACTIVE: RAW" : "ACTIVE: TEMP ENG. INCOMING";
            utils.establecerValorPorID("ranLocation", location);

            const nuevoComentario = `RAN ${nRAN} ${vTipo} ${nBOL} ${vNom}`;
            utils.establecerValorPorID("ranComment", nuevoComentario.toUpperCase());
        }
    },
    copiarCommentRAN() {
        const comentario = utils.obtenerValorPorID("ranComment");

        if (utils.validarCampoVacio(comentario)) {
            utils.copiarContenido(comentario);
        }
    }
}

function asignarValor(pObj, pValor) {
    if (typeof pValor != "undefined") {
        pObj.value = pValor.trim();
    }
}