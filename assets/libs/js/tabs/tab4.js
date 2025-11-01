function commentTier2() {
    obtenerObjetoPorID("nVPO").textContent = obtenerValorPorID("txtActual");
}

function copiarCommentTier2() {
    if (validarCampoVacio(obtenerObjetoPorID("nVPO").textContent)) {
        const contenido = obtenerObjetoPorID("txtTier2").textContent.trim();
        const sinFormato = eliminarEspacios(contenido);
        copiarContenido(sinFormato);
    }
}

function mostrarContenido(e) {
    if (e.target.tagName == "DIV") {
        return;
    }

    let parrafo = "";
    const opciones = {
        asignado: obtenerValorPorID("txtAsignado"),
        unidades: obtenerValorPorID("txtUnidades"),
        otrosLotes: obtenerValorPorID("txtMaterial"),
    };

    if (e.target.tagName == "H4") {
        parrafo = eliminarEspacios(e.target.parentElement.children[2].textContent);
    }
    if (e.target.tagName == "BLOCKQUOTE") {
        parrafo = eliminarEspacios(e.target.children[2].textContent);
    }

    parrafo = parrafo
        .replace("@Asignado", opciones.asignado)
        .replace("@Cant", opciones.unidades)
        .replace("@Lotes", opciones.otrosLotes);
    establecerValorPorID("txtExcepcion", parrafo);

    document
        .getElementById("lstExcepciones")
        .parentElement.removeAttribute("open");
}

function eliminarEspacios(pValor) {
    return pValor.replace(/\n/g, " ").replace(/  /g, "").trim();
}

function copiarComentarioTier2() {
    const vComentario = obtenerValorPorID("txtExcepcion");

    if (validarCampoVacio(vComentario)) {
        copiarContenido(vComentario);
    }
}

function abrirModal(e) {
    const idModal = e.target.dataset.modal;
    obtenerObjetoPorID(idModal).showModal();
}

function guardarNuevaExcepcion() {
    // body...
}

function cerrarModal(e) {
    const idModal = e.target.dataset.modal;
    obtenerObjetoPorID(idModal).close();
}
