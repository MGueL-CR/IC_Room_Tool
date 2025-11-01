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

export const config = {
    cargar() {
        const vConfig = JSON.parse(window.localStorage.getItem("confiGen"));
        return vConfig ? vConfig : new Config();
    },

    guardar(pNewConfig) {
        window.localStorage.setItem("confiGen", JSON.stringify(pNewConfig));
    }
}