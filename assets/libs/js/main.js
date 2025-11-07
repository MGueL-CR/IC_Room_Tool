import { settings } from "./settings.js";
import { utils } from "./utils.js";
import { tab1 } from "./tabs/tab1.js";
import { tab2 } from "./tabs/tab2.js";
import { tab3 } from "./tabs/tab3.js";
import { tab4 } from "./tabs/tab4.js";
import { tab5 } from "./tabs/tab5.js";
import { tab6 } from "./tabs/tab6.js";

try {
  const tabs = document.getElementsByClassName('tab');
  /* 
  *      CONFIG & SETTINGS 
    crearEvento("btnSun", "click", cambiarTema);  y
    crearEvento("btnMoon", "click", cambiarTema);  y
    crearEvento("btnInitial", "click", establecerIniciales); y
    crearEvento("lstColores", "click", cambiarColor); y
    crearEvento("lstFondos", "click", cambiarFondo); y
  */
  document.addEventListener("DOMContentLoaded", settings.obtenerAjustes, true);
  utils.crearEvento("btnColapse", "click", settings.mostrarOcultarMenu);
  utils.crearEvento("grpThemes", "click", settings.cambiarTema);
  utils.crearEvento("lstFondos", "click", settings.cambiarFondo);
  utils.crearEvento("lstColores", "click", settings.cambiarColor);
  utils.crearEvento("btnInitial", "click", settings.establecerIniciales);

  /** *      TAB #1 
    crearEvento("anotaciones", "input", guardarMisNotas); y
  */
  tab1.eventosTab1(tabs.item(0));

  /* *      TAB #2 
    crearEvento("textCopiedCRT", "input", generarComentarioCRAT);
    crearEvento("boxCRT", "click", copiarValoresCTR);
    crearEvento("ranComment", "click", genernarComentarioRAN);  y
    crearEvento("btnRan", "click", copiarCommentRAN); y
    crearEvento("textCopied", "input", generarComentarioWO);
    crearEvento("commentWO", "click", copiarComentarioWO);
    crearEvento("btnCopyMore", "click", copiarInfoAdicionalWO);
  */

  utils.crearEvento("textCopied", "input", tab2.generarComentarioWO);
  utils.crearEvento("btnCopyWO", "click", tab2.copiarComentarioWO);
  utils.crearEvento("btnImprimirWO", "click", tab2.copiarInfoAdicionalWO);

  utils.crearEvento("inputsRANs", "input", tab2.genernarComentarioRAN);
  utils.crearEvento("btnRan", "click", tab2.copiarCommentRAN);

  /* *      TAB #3 
    crearEvento("btnDependencia", "click", generarNotaDependencia); X
    crearEvento("resultado", "focusin", generarNotaDependencia); y
    crearEvento("btnDependencia", "click", copiarNotaDependencia); y
  */
  utils.crearEvento("especificas", "input", tab3.generarNotaDependencia);
  utils.crearEvento("btnDependencia", "click", tab3.copiarNotaDependencia);


  /* *      TAB #4 
    crearEvento("btnTier2", "click", copiarCommentTier2); y
    crearEvento("btnContenido", "click", copiarComentarioTier2); y
    crearEvento("lstExcepciones", "click", mostrarContenido); y
    crearEvento("btnAgregar", "click", abrirModal); y
    crearEvento("btnToBoss", "click", abrirModal); y
    crearEvento("btnGuardar", "click", guardarNuevaExcepcion); X
    crearEvento("btnCerrar", "click", cerrarModal); y
    crearEvento("btnTier2Del", "click", cerrarModal); y
  */
  utils.crearEvento("inputsTier2", "input", tab4.cambiarValores);
  utils.crearEvento("lstExcepciones", "click", tab4.mostrarContenido);
  utils.crearEvento("frmToBoss", "submit", tab4.copiarCommentTier2);
  utils.crearEvento("btnContenido", "click", tab4.copiarComentarioTier2);
  utils.crearEvento("panelModalTier2", "click", tab4.eventosModal);
  utils.crearEvento("buttonsExceptions", "click", tab4.eventosModal);
  utils.crearEvento("buttonsToBoss", "click", tab4.eventosModal);


  /* *      TAB #5  
  */
  utils.crearEvento("dscLotes", "input", tab5.filtrarLotesPorContenido);
  utils.crearEvento("btnLotsCopy", "click", tab5.copiarListaLotes);


  /* *      TAB #6 
    crearEvento("btnMaterialOut", "click", generarComentarioMEP); y
    crearEvento("btnImpMaterial", "click", generarComentarioImpMaterial); y
    crearEvento("btnProspal", "click", generarComentarioProspal); y
    crearEvento("btnToMail", "click", copiarDestinatarios); y
    crearEvento("btnSuject", "click", copiarAsunto);  y
    crearEvento("btnMail", "click", copiarMensaje); y
  */
  utils.crearEvento("btnMaterialOut", "click", tab6.generarComentarioMEP);
  utils.crearEvento("btnImpMaterial", "click", tab6.generarComentarioImpMaterial);
  utils.crearEvento("btnProspal", "click", tab6.generarComentarioProspal);
  utils.crearEvento("btnToMail", "click", tab6.copiarDestinatarios);
  utils.crearEvento("btnSuject", "click", tab6.copiarAsunto);
  utils.crearEvento("btnMail", "click", tab6.copiarMensaje);

} catch (err) {
  utils.printError(err);
}
