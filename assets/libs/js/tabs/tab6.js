
function copiarDestinatarios() {
    const listaDestinatarios = obtenerObjetoPorID("lstDestinatarios").children;

    const nvaLista = Array.from(listaDestinatarios);

    const vDestinatarios = nvaLista
        .map((x) => x.title)
        .toString()
        .replace(/,/g, "; ");

    if (validarCampoVacio(vDestinatarios)) {
        copiarContenido(vDestinatarios);
    }
}

function copiarAsunto() {
    const asunto = obtenerValorPorID("suject");

    if (validarCampoVacio(asunto)) {
        copiarContenido(asunto);
    }
}

function copiarMensaje() {
    const mensaje = obtenerValorPorID("textMail");

    if (validarCampoVacio(mensaje)) {
        copiarContenido(mensaje);
    }
}

function generarComentarioMEP() {
    const tipoViejo = obtenerValorPorID("tipoOpcOld");
    const numViejo = obtenerValorPorID("numOld");
    const tipoNueva = obtenerValorPorID("tipoOpcionN");
    const numNuevo = obtenerValorPorID("numNew");

    const asuntoFinal = `Help needed: Return ${tipoViejo} ${numViejo} to process a ${tipoNueva} ${numNuevo}`;
    const mensajeFinal = `Hi \n\nWe need your help to return this ${tipoViejo} ${numViejo} to process a ${tipoNueva} ${numNuevo}. \n\nPlease return this ${tipoViejo} as soon as possible. \n\n\n [INSERT IMAGEN LOT-CONTROL] \n\n\nRegards…`;

    establecerValorPorID("suject", asuntoFinal);
    establecerValorPorID("textMail", mensajeFinal);
}

function generarComentarioImpMaterial() {
    const numRAN = obtenerValorPorID("numRAN");
    const numBOL = obtenerValorPorID("txtBOL");

    const asuntoFinal = `Help needed: Indicate Product name and Part type for RAN ${numRAN} BLS/ISM ${numBOL}`;
    const mensajeFinal = `Hi \n\nWe recently received a material at CRML Inventory Control Room, but we are not able to create the material in our system because we were not able to get the lot name, Product name and Part type for this material. \n\nCan you please let us know which Product name and Part type we should use to register this material in our system? \n\n1. Lot? \n2. Product: ? \n3. Part type: ? \n\n\n  [INSERT IMAGE] \n\n\nVIDs: \n\nRegards…`;

    establecerValorPorID("suject", asuntoFinal);
    establecerValorPorID("textMail", mensajeFinal);
}

function generarComentarioProspal() {
    const numMRS = obtenerValorPorID("numMRS");
    const partType = obtenerValorPorID("txtType");
    const productName = obtenerValorPorID("txtName");

    const asuntoFinal = `Help needed: Create part type in Prospal to MRS# ${numMRS}`;
    const mensajeFinal = `Hi all, \n\nWe need you help to create a part type in Prospal to ship MRS# 0 \nPart type: ${partType} \n\nProduct name: ${productName} \n\n\nRegards…`;

    establecerValorPorID("suject", asuntoFinal);
    establecerValorPorID("textMail", mensajeFinal);
}
