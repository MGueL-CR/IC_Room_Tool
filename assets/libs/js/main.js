try {
  document.querySelector("body").addEventListener("load", obtenerAjustes, true);

  crearEvento("btnTier2", "click", copiarCommentTier2);

  crearEvento("btnDependencia", "click", generarNotaDependencia);

  crearEvento("resultado", "focusin", generarNotaDependencia);

  crearEvento("btnContenido", "click", copiarComentarioTier2);

  crearEvento("btnDependencia", "click", copiarNotaDependencia);

  crearEvento("btnMaterialOut", "click", generarComentarioMEP);

  crearEvento("btnImpMaterial", "click", generarComentarioImpMaterial);

  crearEvento("btnProspal", "click", generarComentarioProspal);

  crearEvento("btnSuject", "click", copiarAsunto);

  crearEvento("btnMail", "click", copiarMensaje);

  crearEvento("dscLotes", "input", filtrarLotesPorContenido);

  crearEvento("btnLotsCopy", "click", copiarListaLotes);

  crearEvento("ranComment", "click", genernarComentarioRAN);

  crearEvento("btnRan", "click", copiarCommentRAN);

  crearEvento("btnColapse", "click", mostrarOcultarMenu);

  crearEvento("btnSun", "click", cambiarTema);

  crearEvento("btnMoon", "click", cambiarTema);

  crearEvento("btnInitial", "click", establecerIniciales);

  crearEvento("textCopied", "input", generarComentarioWO);
  crearEvento("commentWO", "click", copiarComentarioWO);
  crearEvento("btnCopyMore", "click", copiarInfoAdicionalWO);

  crearEvento("anotaciones", "input", guardarMisNotas);
  crearEvento("lstExcepciones", "click", mostrarContenido);
  crearEvento("lstColores", "click", cambiarColor);
  crearEvento("lstFondos", "click", cambiarFondo);

  crearEvento("btnAgregar", "click", abrirModal);
  crearEvento("btnToBoss", "click", abrirModal);
  crearEvento("btnGuardar", "click", guardarNuevaExcepcion);
  crearEvento("btnCerrar", "click", cerrarModal);
  crearEvento("btnTier2Del", "click", cerrarModal);

  crearEvento("textCopiedCRT", "input", generarComentarioCRAT);
  crearEvento("boxCRT", "click", copiarValoresCTR);
  crearEvento("btnToMail", "click", copiarDestinatarios);
} catch (error) {
  println("Detalles del error: \n" + error);
}

/*
 * CODIGO DE METODOS GENERALES
 */

class Config {
  constructor(
    pBtnCurrent,
    pTypeTheme,
    pClrTheme,
    pBgTheme,
    pDivColor,
    pDivFondo,
    pBgCurrent,
    pInitials
  ) {
    this.btnCurrent = pBtnCurrent;
    this.typeTheme = pTypeTheme;
    this.clrTheme = pClrTheme;
    this.bgTheme = pBgTheme;
    this.divColor = pDivColor;
    this.divFondo = pDivFondo;
    this.bgCurrent = pBgCurrent;
    this.myInitials = pInitials;
  }
}

function crearEvento(pID, pTipo, pFuncion) {
  document.getElementById(pID).addEventListener(pTipo, pFuncion, false);
}

function copiarContenido(pparrafo) {
  try {
    navigator.clipboard.writeText(pparrafo); //console.log('parrafo copiado al portapapeles')
  } catch (err) {
    alert(`Atencion!\n\nError al copiar al portapapeles: \nError: ${err}`);
  }
}

function obtenerObjetoPorID(pID) {
  return document.getElementById(pID);
}

function obtenerValorPorID(pID) {
  return document.getElementById(pID).value;
}

function obtenerEstadoCheckBox(pID) {
  return document.getElementById(pID).checked;
}

function establecerValorPorID(pID, pNuevoValor) {
  return (document.getElementById(pID).value = pNuevoValor);
}

function validarCampoVacio(pContenido) {
  return pContenido.trim() !== "";
}

function println(pvalor) {
  console.log(pvalor);
}

function getMyConfig() {
  const vConfig = JSON.parse(window.localStorage.getItem("confiGen"));

  let myConfig = vConfig !== null ? vConfig : new Config();

  return myConfig;
}

function setMyConfig(pNewConfig) {
  window.localStorage.setItem("confiGen", JSON.stringify(pNewConfig));
}

function leerMemTemp(pKey) {
  return window.sessionStorage.getItem(pKey);
}

function GuardarMemTemp(pKey, pValue) {
  window.sessionStorage.setItem(pKey, pValue);
}

function leerMemLocal(pKey) {
  return window.localStorage.getItem(pKey);
}

function GuardarMemLocal(pKey, pValue) {
  window.localStorage.setItem(pKey, pValue);
}

function abrirVortex(pValor) {
  window.open(
    `https://vortexreports.intel.com/Reports/Card/RunCardFilter.aspx?obj=${pValor}`,
    "_blank"
  );
}

/**
 * CODIGO DEL TAB DEPENDENCIAS
 */
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

/*
 *     TAB EXCEPCIONES TIER-2
 */

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

/*
 *    CODIGO DEL TAB COMENTARIOS
 */

function guardarMisNotas(e) {
  GuardarMemLocal(e.target.id, e.target.value);
}

function generarComentarioWO(e) {
  const txtCopiado = e.target.value.trim().split("\n");

  if (txtCopiado.length <= 1) {
    return;
  }

  const masparrafo = txtCopiado[2].split("\t");
  const comentario = `${txtCopiado[0].trim()} - QTY ${masparrafo[3]} - ${
    masparrafo[5]
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

/*
 *    CODIGO DEL TAB PLANTILLAS CORREOS
 */

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

/*
 *   CODIGO DEL TAB OBTENER LOTES
 */

function copiarListaLotes() {
  let listaLotes = obtenerValorPorID("listLots");

  if (validarCampoVacio(listaLotes)) {
    if (listaLotes.includes("[")) {
      copiarContenido(getNameSourceLot(listaLotes.split("\n")));
    } else {
      copiarContenido(listaLotes);
    }
  }
}

function obtenerLotesDesdeMole(pContenido) {
  const descripcion = pContenido.split(";");

  if (!validarCampoVacio(descripcion[0])) {
    return;
  }

  descripcion.forEach((item) => {
    if (item.includes("SOURCE")) {
      establecerValorPorID("listLots", getListSourceLots(item.trim()));
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
  let names = [];

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

  if (!validarCampoVacio(descripcion[0])) {
    return;
  }

  descripcion.forEach((item) => {
    nombreLotes.push(item.split(",")[0].split(":")[1].trim());
  });

  let sinDuplicados = [...new Set(nombreLotes)];

  establecerValorPorID("listLots", formatList(sinDuplicados));
}

function obtenerLotesDesdeRunCard(pContenido) {
  const descripcion = pContenido.trim().split("\n");
  const nombreLotes = [];

  if (!validarCampoVacio(descripcion[0])) {
    return;
  }

  descripcion.forEach((item) => {
    nombreLotes.push(item.split(";")[0]);
  });

  const descartarDuplicdos = [...new Set(nombreLotes)];

  establecerValorPorID("listLots", formatList(descartarDuplicdos));
}

function obtenerLotesDesdeCorreo(pContenido) {
  const listaLotes = [];
  const txtTabla = pContenido.trim().split("\n");

  txtTabla.forEach((item) => {
    listaLotes.push(item.split(/[\s,]+/)[0]);
  });

  establecerValorPorID("listLots", formatList(listaLotes));
}

function filtrarLotesPorContenido(e) {
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
}

/*
 *   CODIGO DE TEMAS Y AJUSTES DEL MENU
 */

function mostrarOcultarMenu() {
  obtenerObjetoPorID("mainMenu").classList.toggle("show-menu");
}

function cambiarTema() {
  let newConfig = getMyConfig();

  newConfig.btnCurrent = this.id;
  newConfig.typeTheme = this.name;

  if (this.id === "btnSun") {
    obtenerObjetoPorID("btnMoon").classList.remove("btn-active");
    obtenerObjetoPorID("btnSun").classList.add("btn-active");
  } else {
    obtenerObjetoPorID("btnSun").classList.remove("btn-active");
    obtenerObjetoPorID("btnMoon").classList.add("btn-active");
  }

  document.querySelector("body").className = newConfig.typeTheme;
  setMyConfig(newConfig);
}

function cambiarFondo(e) {
  if (e.target.id === "lstFondos") {
    return;
  }

  const myConfig = getMyConfig();

  establecerValorPorID("btnFondoMain", e.target.textContent);
  cambiarItemSeleccionado(e, "lstFondos", ".opcFondo");
  mostrarFondo(e.target.id);

  myConfig.bgCurrent = e.target.id;
  myConfig.divFondo = e.target.textContent;

  setMyConfig(myConfig);
}

function mostrarFondo(pOpcion) {
  obtenerObjetoPorID("galeriaFondos")
    .querySelectorAll("svg")
    .forEach((wl) => wl.classList.add("no-svg"));

  switch (pOpcion) {
    case "bg01":
      obtenerObjetoPorID("Layer_1").classList.remove("no-svg");
      break;
    case "bg02":
      obtenerObjetoPorID("Layer_2").classList.remove("no-svg");
      break;
    case "bg03":
      obtenerObjetoPorID("Layer_3").classList.remove("no-svg");
      break;
    case "bg04":
      obtenerObjetoPorID("Layer_4").classList.remove("no-svg");
      break;
    case "bg05":
      obtenerObjetoPorID("Layer_5").classList.remove("no-svg");
      break;
    case "bg06":
      obtenerObjetoPorID("Layer_6").classList.remove("no-svg");
      break;
    case "bg07":
      obtenerObjetoPorID("Layer_7").classList.remove("no-svg");
      break;
    default:
      break;
  }
}

function obtenerAjustes() {
  const configGeneral = getMyConfig();

  if (configGeneral !== null) {
    if (configGeneral.typeTheme) {
      document.querySelector("body").classList.add(configGeneral.typeTheme);
      obtenerObjetoPorID(configGeneral.btnCurrent).classList.add("btn-active");
    }
    if (
      configGeneral.clrTheme !== undefined &&
      configGeneral.bgTheme !== undefined
    ) {
      establecerTemaColores(configGeneral.clrTheme, configGeneral.bgTheme);
      obtenerObjetoPorID(configGeneral.divColor).classList.add("clr-active");
    }
    if (configGeneral.bgCurrent) {
      obtenerObjetoPorID(configGeneral.bgCurrent).classList.add("clr-active");
      establecerValorPorID("btnFondoMain", configGeneral.divFondo);
      mostrarFondo(configGeneral.bgCurrent);
    }
    if (configGeneral.myInitials) {
      establecerValorPorID("userInitials", configGeneral.myInitials);
    }
  }

  establecerValorPorID("nota01", leerMemLocal("nota01"));
  establecerValorPorID("nota02", leerMemLocal("nota02"));
  establecerValorPorID("nota03", leerMemLocal("nota03"));
}

function cambiarColor(e) {
  if (e.target.id === "lstColores") {
    return;
  }

  let myConfig = getMyConfig();

  const divColor = obtenerObjetoPorID(e.target.id);
  const newColor = divColor.style.getPropertyValue("color");
  const newBackground = divColor.style.getPropertyValue("background-color");

  establecerTemaColores(newColor, newBackground);
  cambiarItemSeleccionado(e, "lstColores", ".div-color");

  myConfig.clrTheme = newColor;
  myConfig.bgTheme = newBackground;
  myConfig.divColor = e.target.id;

  setMyConfig(myConfig);
}

function cambiarItemSeleccionado(pItem, pLista, pClase) {
  obtenerObjetoPorID(pLista)
    .querySelectorAll(pClase)
    .forEach((dv) => dv.classList.remove("clr-active"));
  pItem.target.classList.add("clr-active");
}

function establecerTemaColores(pColor, pBackground) {
  obtenerObjetoPorID("bodyMain").style.setProperty("--color-theme", pColor);
  obtenerObjetoPorID("bodyMain").style.setProperty("--bg-theme", pBackground);
}

function establecerIniciales() {
  let myConfig = getMyConfig();

  myConfig.myInitials = obtenerValorPorID("userInitials");

  setMyConfig(myConfig);
}

/*
 *  Codigo sin ubicar y en desarrollo
 */

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
