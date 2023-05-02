sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("zprojectodatae0704.controller.Detail", {
      onInit: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPatternMatched, this);
      },
      _onPatternMatched: function (oEvent) {
        var oArgu = oEvent.getParameter("arguments");
        var oModel = this.getView().getModel();
        var oFilter = new sap.ui.model.Filter("OrderID", "EQ", "oArgu.key");
        console.log(oArgu);

        oModel.read("/Orders", {
          filters: [oFilter],
          success: function (oReturn) {
            console.log(oReturn.results[0]);
          },
        });
      },
    });
  }
);
