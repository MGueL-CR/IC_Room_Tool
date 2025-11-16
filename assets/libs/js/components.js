import { utils } from "./utils.js";

export function nuevoContacto(pData) {
    const nvoContacto = utils.nuevoElemento("div");
    nvoContacto.classList.add("contacto", "pos-relativo", "bg-blaco");

    const nvoTag = utils.nuevoElemento("span");
    nvoTag.title = pData.txtCorreoDest;
    nvoTag.textContent = pData.txtNombDest;

    const tagQuitar = utils.nuevoElemento("span");
    tagQuitar.textContent = "close_small";
    tagQuitar.classList.add("material-symbols-outlined");

    nvoContacto.appendChild(nvoTag);
    nvoContacto.appendChild(tagQuitar);

    return nvoContacto;
}

export function nuevaExcepcion(pIndex, pData) {
    const nvoDiv = utils.nuevoElemento("div");
    const nvoBlock = utils.nuevoElemento("blockquote");
    const nvoTitulo = utils.nuevoElemento("h4");
    const nvoTexto = utils.nuevoElemento("p");

    nvoDiv.classList.add("col");
    nvoBlock.id = `bq${pIndex}`;
    nvoBlock.classList.add("marginles", "bg-blanco");
    nvoTitulo.textContent = pData.txtTitulo;
    nvoTexto.textContent = pData.txtContenido;

    nvoBlock.appendChild(nvoTitulo);
    nvoBlock.appendChild(utils.nuevoElemento("hr"));
    nvoBlock.appendChild(nvoTexto);
    nvoDiv.appendChild(nvoBlock);

    return nvoDiv;
}