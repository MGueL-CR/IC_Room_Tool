import * as settings from "./settings.js";
import { utils } from "./utils.js";
import { tab1 } from "./tabs/tab1.js";
import { tab5 } from "./tabs/tab5.js";

try {
  const tabs = document.getElementsByClassName('tab');
  /* 
  *      CONFIG & SETTINGS 
    crearEvento("btnSun", "click", cambiarTema);  
    crearEvento("btnMoon", "click", cambiarTema);  
    crearEvento("btnInitial", "click", establecerIniciales);    
    crearEvento("lstColores", "click", cambiarColor);
    crearEvento("lstFondos", "click", cambiarFondo);
  */
  document.querySelector("body").addEventListener("load", settings.obtenerAjustes, true);
  utils.crearEvento("btnColapse", "click", settings.mostrarOcultarMenu);



  /** *      TAB #1 
    crearEvento("anotaciones", "input", guardarMisNotas);
  */
  tab1.eventosTab1(tabs.item(0));

  /* *      TAB #2 
    crearEvento("textCopiedCRT", "input", generarComentarioCRAT);
    crearEvento("boxCRT", "click", copiarValoresCTR);
    crearEvento("ranComment", "click", genernarComentarioRAN);  
    crearEvento("btnRan", "click", copiarCommentRAN);
    crearEvento("textCopied", "input", generarComentarioWO);
    crearEvento("commentWO", "click", copiarComentarioWO);
    crearEvento("btnCopyMore", "click", copiarInfoAdicionalWO);
  */




  /* *      TAB #3 
    crearEvento("btnDependencia", "click", generarNotaDependencia);
    crearEvento("resultado", "focusin", generarNotaDependencia);
    crearEvento("btnDependencia", "click", copiarNotaDependencia);
  */



  /* *      TAB #4 
    crearEvento("btnTier2", "click", copiarCommentTier2);
    crearEvento("btnContenido", "click", copiarComentarioTier2);
    crearEvento("lstExcepciones", "click", mostrarContenido);
    crearEvento("btnAgregar", "click", abrirModal);
    crearEvento("btnToBoss", "click", abrirModal);
    crearEvento("btnGuardar", "click", guardarNuevaExcepcion);
    crearEvento("btnCerrar", "click", cerrarModal);
    crearEvento("btnTier2Del", "click", cerrarModal);
  */



  /* *      TAB #5  
  */
  utils.crearEvento("dscLotes", "input", tab5.filtrarLotesPorContenido);
  utils.crearEvento("btnLotsCopy", "click", tab5.copiarListaLotes);


  /* *      TAB #6 
    crearEvento("btnMaterialOut", "click", generarComentarioMEP);
    crearEvento("btnImpMaterial", "click", generarComentarioImpMaterial);
    crearEvento("btnProspal", "click", generarComentarioProspal);
    crearEvento("btnToMail", "click", copiarDestinatarios);
    crearEvento("btnSuject", "click", copiarAsunto);  
    crearEvento("btnMail", "click", copiarMensaje);
  */


} catch (err) {
  utils.printError(err);
}
