import { utils } from "../utils.js";
export const tab2 = {
    generarComentarioCRAT(e) {
        const iniciales = utils.obtenerValorPorID("userInitials").trim();

        if (utils.validarCampoVacio(e.target.value)) {
            const contenido = e.target.value.split("\t");
            if (contenido.length <= 1) { return; }

            utils.establecerValorPorID("commenCTR", `${contenido.at(0).trim()} ${iniciales}`);
            utils.establecerValorPorID("txtOwner", contenido.at(8));
            utils.establecerValorPorID("txtLotName", contenido.at(9));
            utils.establecerValorPorID("txtPartType", contenido.at(10));
            utils.establecerValorPorID("txtUnits", contenido.at(11));
            utils.establecerValorPorID("txtQDF", contenido.at(14));
            utils.establecerValorPorID("txtLocation", "ACTIVE: RAW");
        }
    },
    copiarValoresCTR(e) {
        const input = e.target;
        if (input.tagName == "INPUT") {
            if (utils.validarCampoVacio(input.value)) {
                const vContenido = aplicarFormatosEspeciales(input.id, input.value);
                utils.copiarContenido(vContenido);
            }
        }
    },
    generarComentarioWO(e) {
        if (!utils.validarCampoVacio(e.target.value)) {
            return;
        }
        if (e.target.tagName === "TEXTAREA") {
            const txtCopiado = e.data.trim().replace(/\n/g, "\t");
            const vSeparado = txtCopiado.split("\t");
            const vDatos = {
                "val1": vSeparado.at(0).trim(),
                "val2": vSeparado.at(6).trim(),
                "val3": vSeparado.at(8).trim(),
                "val4": e.target.tagName
            };
            completarCamposWO(vDatos)
        } else {
            const vInputs = {
                "val1": utils.obtenerValorPorID("txtNumWO"),
                "val2": utils.obtenerValorPorID("txtQty"),
                "val3": utils.obtenerValorPorID("txtMachine"),
                "val4": e.target.tagName
            };
            completarCamposWO(vInputs)
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
                    maquina: comentarioWO[2].trim()
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


function completarCamposWO(pObj) {
    const comentario = `${pObj.val1} - QTY ${pObj.val2} - ${pObj.val3}`;
    if (pObj.val4 !== "INPUT") {
        utils.establecerValorPorID("txtNumWO", pObj.val1);
        utils.establecerValorPorID("txtQty", pObj.val2);
        utils.establecerValorPorID("txtMachine", pObj.val3);
    }
    utils.establecerValorPorID("commentWO", comentario);
}

function aplicarFormatosEspeciales(pID, pValor) {
    switch (pID) {
        case "txtOwner":
            if (pValor.includes(",")) {
                return pValor;
            } else {
                const nvoArray = pValor.split(" ");
                return `${nvoArray[1]} ${nvoArray[2]}, ${nvoArray[0]}`;
            }
        case "txtPartType":
            return pValor.split(" ").at(0).substring(2);
        case "txtQDF":
            return pValor.substring(0, 4);
        default:
            return pValor;
    }
}