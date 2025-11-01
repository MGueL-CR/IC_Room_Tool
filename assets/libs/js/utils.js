export const utils = {

    crearEvento(pID, pTipo, pFuncion) {
        document.getElementById(pID).addEventListener(pTipo, pFuncion, false);
    },

    copiarContenido(pparrafo) {
        try {
            navigator.clipboard.writeText(pparrafo); //console.log('parrafo copiado al portapapeles')
        } catch (err) {
            alert(`Atencion!\n\nError al copiar al portapapeles: \nError: ${err}`);
        }
    },

    obtenerObjetosPorTag(pClase) {
        return document.getElementsByTagName(pClase);
    },

    obtenerElementoPorTag(pObj, pClase) {
        return pObj.getElementsByTagName(pClase);
    },

    obtenerObjetosPorClase(pClase) {
        return document.getElementsByClassName(pClase);
    },

    obtenerElementoPorClase(pObj, pClase) {
        return pObj.getElementsByClassName(pClase);
    },

    obtenerObjetoPorID(pID) {
        return document.getElementById(pID);
    },

    obtenerValorPorID(pID) {
        return document.getElementById(pID).value;
    },

    obtenerEstadoCheckBox(pID) {
        return document.getElementById(pID).checked;
    },

    establecerValorPorID(pID, pNuevoValor) {
        return (document.getElementById(pID).value = pNuevoValor);
    },

    validarCampoVacio(pContenido) {
        return pContenido.trim() !== "";
    },

    println(pvalor) {
        console.log(pvalor);
    },

    printError(pErr) {
        console.error("Detalles del error: \n", pErr);
    },

    leerMemTemp(pKey) {
        return window.sessionStorage.getItem(pKey);
    },

    guardarMemTemp(pKey, pValue) {
        window.sessionStorage.setItem(pKey, pValue);
    },

    leerMemLocal(pKey) {
        return window.localStorage.getItem(pKey);
    },

    guardarMemLocal(pKey, pValue) {
        window.localStorage.setItem(pKey, pValue);
    },

    abrirVortex(pValor) {
        window.open(
            `https://vortexreports.intel.com/Reports/Card/RunCardFilter.aspx?obj=${pValor}`,
            "_blank"
        );
    }
}
