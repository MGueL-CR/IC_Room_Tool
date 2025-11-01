function generarNotaDependencia() {
    const notaDependencia = `${validarDisponibilidadTotal()} ${agregarseparadores()} ${validarUnidadesCompartidas()} ${validarUnidadesDisponibles()} ${validarIndicaciones()}`;

    establecerValorPorID("resultado", notaDependencia);
}

function validarDisponibilidadTotal() {
    if (obtenerEstadoCheckBox("cantExacta")) {
        return "Para procesar su solicitud se requiere totalmente del retorno de:";
    } else {
        return "Para procesar su solicitud se requiere el retorno de:";
    }
}

function validarUnidadesCompartidas() {
    if (obtenerEstadoCheckBox("comparteUds")) {
        return " ** (comparten las mismas unidades)";
    } else {
        return "";
    }
}

function validarUnidadesDisponibles() {
    const cantidad = Number.parseInt(obtenerValorPorID("uDisponibles"));

    if (cantidad < 1) {
        return "** No se cuentan con unidades disponibles";
    } else if (cantidad == 1) {
        return `** Solamente se cuenta con ${cantidad} unidad disponible`;
    } else {
        return `** Solamente se cuenta con ${cantidad} unidades disponibles`;
    }
}

function validarIndicaciones() {
    if (obtenerEstadoCheckBox("darIndicacion")) {
        return "** Favor de indicar como proceder **";
    } else {
        return "**";
    }
}

function agregarseparadores() {
    return obtenerValorPorID("listaLotes").trim().replace(/ /g, " * ");
}

function copiarNotaDependencia() {
    if (validarCampoVacio(obtenerValorPorID("listaLotes"))) {
        copiarContenido(obtenerValorPorID("resultado"));
    }
}