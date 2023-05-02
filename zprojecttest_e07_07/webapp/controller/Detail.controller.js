sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("zprojectteste0707.controller.Detail", {
      onInit: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPatternMatched, this);
      },
      _onPatternMatched: function (oEvent) {
        var oArgu = oEvent.getParameter("arguments");
        console.log(oArgu);
      },
      onNavButtonPress: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteMain", {}, true);
      },
    });
  }
);
