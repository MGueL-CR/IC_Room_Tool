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
        if (!e.data || !utils.validarCampoVacio(e.data)) {
            return;
        }
        if (e.target.tagName === "TEXTAREA") {
            const txtCopiado = e.data.trim().replace(/\n/g, "\t");
            const vSeparado = txtCopiado.split("\t");
            const vDatos = {
                "val1": vSeparado.at(0).trim(),
                "val2": vSeparado.at(6).trim(),
                "val3": vSeparado.at(8).trim()
            };
            completarCamposWO(vDatos)
        } else {
            // Continuar algo...
            completarCamposWO(vDatos)
        }
    },
    copiarComentarioWO() {
        const contenido = utils.obtenerValorPorID("commentWO");
        if (utils.validarCampoVacio(contenido)) {
            utils.copiarContenido(contenido);
        }
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

function completarCamposWO(pObj) {
    const comentario = `${pObj.val1} - QTY ${pObj.val2} - ${pObj.val3}`;
    asignarValor(document.getElementById("txtNumWO"), pObj.val1);
    asignarValor(document.getElementById("txtQty"), pObj.val2);
    asignarValor(document.getElementById("txtMachine"), pObj.val3);
    asignarValor(document.getElementById("commentWO"), comentario);
}