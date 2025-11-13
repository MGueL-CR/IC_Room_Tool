
export function nuevoContacto(pData) {
    const nvoContacto = document.createElement("div");
    nvoContacto.classList.add("contacto", "pos-relativo", "bg-blaco");

    const nvoTag = document.createElement("span");
    nvoTag.title = pData.txtCorreoDest;
    nvoTag.textContent = pData.txtNombDest;

    const tagQuitar = document.createElement("span");
    tagQuitar.textContent = "close_small";
    tagQuitar.classList.add("material-symbols-outlined");

    nvoContacto.appendChild(nvoTag);
    nvoContacto.appendChild(tagQuitar);

    return nvoContacto;
}