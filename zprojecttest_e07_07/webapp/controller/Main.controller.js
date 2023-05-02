sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("zprojectteste0707.controller.Main", {
      onInit: function () {},
      onButtonPress: function () {
        var oRouter = this.getOwnerComponent().getRouter(); //this.getOwnerComponent()는 controller보다 한단계 위
        oRouter.navTo("RouteDetail", {
          aa: "Apple",
          bb: "Banana",
        });
      },
    });
  }
);
