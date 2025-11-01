
function generarComentarioCRAT(e) {
    const iniciales = obtenerValorPorID("userInitials").trim();

    if (validarCampoVacio(e.target.value)) {
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
}

function asignarValor(pObj, pValor) {
    if (typeof pValor != "undefined") {
        pObj.value = pValor.trim();
    }
}

function copiarValoresCTR(e) {
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
}


function generarComentarioWO(e) {
    const txtCopiado = e.target.value.trim().split("\n");

    if (txtCopiado.length <= 1) {
        return;
    }

    const masparrafo = txtCopiado[2].split("\t");
    const comentario = `${txtCopiado[0].trim()} - QTY ${masparrafo[3]} - ${masparrafo[5]
        }`;
    asignarValor(document.getElementById("commentWO"), comentario);
}

function copiarComentarioWO(e) {
    const contenido = e.target.value;
    if (validarCampoVacio(contenido)) {
        copiarContenido(contenido);
    }
}

function copiarInfoAdicionalWO() {
    if (validarCampoVacio(obtenerValorPorID("commentWO"))) {
        const comentarioWO = obtenerValorPorID("commentWO").split("-");
        copiarContenido(
            `\n\nVPO:\t- ${comentarioWO[0].trim()}\n\t- ${comentarioWO[1].trim()}\n\t- ${comentarioWO[2].trim()}\n`
        );
        const nvaVPO = window.btoa(
            JSON.stringify({
                numero: comentarioWO[0].trim(),
                cantidad: comentarioWO[1].trim(),
                maquina: comentarioWO[2].trim(),
            })
        );
        abrirVortex(nvaVPO);
    }
}

function genernarComentarioRAN() {
    const nRAN = obtenerValorPorID("nRan").trim();
    const vTipo = isNaN(obtenerValorPorID("codBol")) ? "BLS" : "ISM";
    const nBOL = obtenerValorPorID("codBol").trim();
    const vNom = obtenerValorPorID("userInitials").trim();

    if (!validarCampoVacio(nRAN) || !validarCampoVacio(nBOL)) {
        establecerValorPorID("ranComment", "Existen campos vacios!!");
        return;
    }

    const location =
        vTipo == "BLS" ? "ACTIVE: RAW" : "ACTIVE: TEMP ENG. INCOMING";
    establecerValorPorID("ranLocation", location);

    const nuevoComentario = `RAN ${nRAN} ${vTipo} ${nBOL} ${vNom}`;
    establecerValorPorID("ranComment", nuevoComentario);
}

function copiarCommentRAN() {
    const comentario = obtenerValorPorID("ranComment");

    if (validarCampoVacio(comentario)) {
        copiarContenido(comentario);
    }
}
