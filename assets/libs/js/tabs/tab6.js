import { utils } from "../utils.js";

export const tab6 = {
    copiarDestinatarios() {
        const listaDestinatarios = utils.obtenerObjetoPorID("lstDestinatarios").children;

        const nvaLista = Array.from(listaDestinatarios);

        const vDestinatarios = nvaLista
            .map(x => x.title).join("; ")

        if (utils.validarCampoVacio(vDestinatarios)) {
            utils.copiarContenido(vDestinatarios);
        }
    },
    copiarAsunto() {
        const asunto = utils.obtenerValorPorID("suject");

        if (utils.validarCampoVacio(asunto)) {
            utils.copiarContenido(asunto);
        }
    },
    copiarMensaje() {
        const mensaje = utils.obtenerValorPorID("textMail");

        if (utils.validarCampoVacio(mensaje)) {
            utils.copiarContenido(mensaje);
        }
    },
    generarComentarioMEP() {
        const tipoViejo = utils.obtenerValorPorID("tipoOpcOld");
        const numViejo = utils.obtenerValorPorID("numOld");
        const tipoNueva = utils.obtenerValorPorID("tipoOpcionN");
        const numNuevo = utils.obtenerValorPorID("numNew");

        const asuntoFinal = `Help needed: Return ${tipoViejo} ${numViejo} to process a ${tipoNueva} ${numNuevo}`;
        const mensajeFinal = `Hi \n\nWe need your help to return this ${tipoViejo} ${numViejo} to process a ${tipoNueva} ${numNuevo}. \n\nPlease return this ${tipoViejo} as soon as possible. \n\n\n [INSERT IMAGEN LOT-CONTROL] \n\n\nRegards…`;

        utils.establecerValorPorID("suject", asuntoFinal);
        utils.establecerValorPorID("textMail", mensajeFinal);
    },
    generarComentarioImpMaterial() {
        const numRAN = utils.obtenerValorPorID("numRAN");
        const numBOL = utils.obtenerValorPorID("txtBOL");

        const asuntoFinal = `Help needed: Indicate Product name and Part type for RAN ${numRAN} BLS/ISM ${numBOL}`;
        const mensajeFinal = `Hi \n\nWe recently received a material at CRML Inventory Control Room, but we are not able to create the material in our system because we were not able to get the "Lot name", "Product name" and "Part type" for this material. \n\nCan you please let us know which Product name and Part type we should use to register this material in our system? \n\n1. Lot: ?? \n2. Product: ?? \n3. Part type: ?? \n\n\n  [INSERT IMAGE] \n\n\nVIDs: \n\nRegards…`;

        utils.establecerValorPorID("suject", asuntoFinal);
        utils.establecerValorPorID("textMail", mensajeFinal);
    },
    generarComentarioProspal() {
        const numMRS = utils.obtenerValorPorID("numMRS");
        const partType = utils.obtenerValorPorID("txtType");
        const productName = utils.obtenerValorPorID("txtName");

        const asuntoFinal = `Help needed: Create part type in Prospal to MRS# ${numMRS}`;
        const mensajeFinal = `Hi all, \n\nWe need you help to create a part type in Prospal to ship MRS# ${numMRS}.\n\nPart type: ${partType} \n\nProduct name: ${productName} \n\n\nRegards…`;

        utils.establecerValorPorID("suject", asuntoFinal);
        utils.establecerValorPorID("textMail", mensajeFinal);
    }
}