sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("zprojectodatae0704.controller.Detail", {
      onInit: function () {
        this.getView().setModel(new JSONModel(), "DetailModel");
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPatternMatched, this);

        // let detail = {
        //   Customer: [
        //     {
        //       OrderID: "",
        //       CompanyName: "",
        //     },
        //   ],
        // };
      },
      _onPatternMatched: function (oEvent) {
        var oView = this.getView();
        var oArgu = oEvent.getParameter("arguments");
        var oDetailModel = oView.getModel("DetailModel");
        var oModel = oView.getModel();
        var oFilter = new sap.ui.model.Filter("OrderID", "EQ", oArgu.key);
        console.log(oArgu);

        oView.setBusy(true);

        oModel.read("/Orders", {
          urlParameters: {
            $expand: "Customer,Employee",
          },
          filters: [oFilter],
          success: function (aaa) {
            oView.setBusy(false);
            console.log(aaa.results[0]); //한건의 데이터 불러옴
            oDetailModel.setProperty("/data", aaa.results[0]);
          }.bind(this),
          error: function () {
            oView.setBusy(false);
            sap.m.MessageToast.show("에러 발생");
          },
        });
      },
    });
  }
);
