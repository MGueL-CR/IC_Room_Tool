import { utils } from "../utils.js";

export const tab1 = {
    eventosTab1(pTab) {
        const coleccion = utils.obtenerElementoPorTag(pTab, 'TEXTAREA');
        for (const element of coleccion) {
            utils.crearEvento(element.id, 'input', guardarMisNotas);
        }
    }
}

function guardarMisNotas(e) {
    utils.guardarMemLocal(e.target.id, e.target.value);
}