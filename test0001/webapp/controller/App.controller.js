sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("test0001.controller.App", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.attachRouteMatched(this.onRouteMatched, this);
        this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
      },

      onRouteMatched: function (oEvent) {
        this._updateUIElements();
      },

      onBeforeRouteMatched: function (oEvent) {
        var oModel = this.getOwnerComponent().getModel("fcl");

        var sLayout = oEvent.getParameters().arguments.layout;

        if (!sLayout) {
          var oNextUIState = this.getOwnerComponent()
            .getHelper()
            .getNextUIState(0);
          sLayout = oNextUIState.layout;
        }

        if (sLayout) {
          oModel.setProperty("/layout", sLayout);
        }
      },

      onStateChanged: function () {
        this._updateUIElements();
      },

      _updateUIElements: function () {
        var oModel = this.getOwnerComponent().getModel("fcl"),
          oUIState = this.getOwnerComponent().getHelper().getCurrentUIState();

        oModel.setData(oUIState);
      },

      onExit: function () {
        this.oRouter.detachRouteMatched(this.onRouteMatched, this);
        this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
      },
    });
  }
);
