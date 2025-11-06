import { utils } from "../utils.js";

export const tab3 = {
    generarNotaDependencia(e) {
        const nvoInput = e.target;
        if (nvoInput.tagName !== "TEXTAREA") {
            const notaDependencia = `${validarDisponibilidadTotal()} ${agregarseparadores()} ${validarUnidadesCompartidas()} ${validarUnidadesDisponibles()} ${validarIndicaciones()}`;
            utils.establecerValorPorID("resultado", notaDependencia);
        }
    },
    copiarNotaDependencia() {
        if (utils.validarCampoVacio(utils.obtenerValorPorID("listaLotes"))) {
            utils.copiarContenido(utils.obtenerValorPorID("resultado"));
        }
    }
}

function validarDisponibilidadTotal() {
    if (utils.obtenerEstadoCheckBox("cantExacta")) {
        return "Para procesar su solicitud se requiere totalmente del retorno de:";
    } else {
        return "Para procesar su solicitud se requiere el retorno de:";
    }
}

function validarUnidadesCompartidas() {
    if (utils.obtenerEstadoCheckBox("comparteUds")) {
        return " ** (comparten las mismas unidades)";
    } else {
        return "";
    }
}

function validarUnidadesDisponibles() {
    const cantidad = Number.parseInt(utils.obtenerValorPorID("uDisponibles"));

    if (cantidad < 1) {
        return "** No se cuentan con unidades disponibles";
    } else if (cantidad == 1) {
        return `** Solamente se cuenta con ${cantidad} unidad disponible`;
    } else {
        return `** Solamente se cuenta con ${cantidad} unidades disponibles`;
    }
}

function validarIndicaciones() {
    if (utils.obtenerEstadoCheckBox("darIndicacion")) {
        return "** Favor de indicar como proceder **";
    } else {
        return "**";
    }
}

function agregarseparadores() {
    return utils.obtenerValorPorID("listaLotes").trim().replace(/ /g, " * ");
}
