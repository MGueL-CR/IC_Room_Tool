import { utils } from "../utils.js";

function obtenerLotesDesdeMole(pContenido) {
    const descripcion = pContenido.split(";");

    if (!utils.validarCampoVacio(descripcion[0])) {
        return;
    }

    descripcion.forEach((item) => {
        if (item.includes("SOURCE")) {
            utils.establecerValorPorID("listLots", getListSourceLots(item.trim()));
        }
    });
}

function getListSourceLots(pValue) {
    let info = "";

    if (pValue.includes("INVENTORY")) {
        info = splitSourceLots(pValue, "|", "(", ",");
    } else if (pValue.includes("|")) {
        info = splitSourceLots(
            pValue.slice(pValue.indexOf("|"), pValue.length),
            "|",
            "(",
            ","
        );
    } else {
        info = splitSourceLots(pValue, ":", "(", ",");
    }
    return formatList(info).trim();
}

function splitSourceLots(pValue, pIni, pEnd, pSplit) {
    return pValue
        .slice(pValue.indexOf(pIni) + 1, pValue.indexOf(pEnd))
        .split(pSplit);
}

function getNameSourceLot(pArray) {
    const names = [];

    pArray.forEach((item) => {
        names.push(item.trim().split(" ")[0].trim());
    });

    return formatList(names);
}

function formatList(pArray) {
    let namesList = "";
    pArray.forEach((name) => {
        namesList += name.trim() + "\n";
    });

    return namesList;
}

function obtenerLotesDesdeWombat(pContenido) {
    const descripcion = pContenido.trim().split("\n");
    const nombreLotes = [];

    if (!utils.validarCampoVacio(descripcion[0])) {
        return;
    }

    descripcion.forEach((item) => {
        nombreLotes.push(item.split(",")[0].split(":")[1].trim());
    });

    const sinDuplicados = [...new Set(nombreLotes)];

    utils.establecerValorPorID("listLots", formatList(sinDuplicados));
}

function obtenerLotesDesdeRunCard(pContenido) {
    const descripcion = pContenido.trim().split("\n");
    const nombreLotes = [];

    if (!utils.validarCampoVacio(descripcion[0])) {
        return;
    }

    descripcion.forEach((item) => {
        nombreLotes.push(item.split(";")[0]);
    });

    const descartarDuplicdos = [...new Set(nombreLotes)];

    utils.establecerValorPorID("listLots", formatList(descartarDuplicdos));
}

function obtenerLotesDesdeCorreo(pContenido) {
    const listaLotes = [];
    const txtTabla = pContenido.trim().split("\n");

    txtTabla.forEach((item) => {
        listaLotes.push(item.split(/[\s,]+/)[0]);
    });

    utils.establecerValorPorID("listLots", formatList(listaLotes));
}

export const tab5 = {
    filtrarLotesPorContenido(e) {
        const contenido = e.target.value.toUpperCase();

        if (contenido.includes("SOURCE:")) {
            obtenerLotesDesdeMole(contenido);
            return;
        }

        if (contenido.includes("VPO") || contenido.includes("LOT")) {
            obtenerLotesDesdeWombat(contenido);
            return;
        }

        if (
            contenido.includes("RUN") ||
            contenido.includes("PASS") ||
            contenido.includes("BIN")
        ) {
            obtenerLotesDesdeRunCard(contenido);
            return;
        }

        if (contenido.includes("RAN")) {
            obtenerLotesDesdeCorreo(contenido);
            return;
        }
    },
    copiarListaLotes() {
        const listaLotes = utils.obtenerValorPorID("listLots");

        if (utils.validarCampoVacio(listaLotes)) {
            if (listaLotes.includes("[")) {
                utils.copiarContenido(getNameSourceLot(listaLotes.split("\n")));
            } else {
                utils.copiarContenido(listaLotes);
            }
        }
    }
}