sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  //   "sap/viz/ui5/data/FlattenedDataSet",
  //   "sap/viz/ui5/controls/common/feeds/FeedItem",
  //   "sap/ui/model/json/JSONModel",

  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sap.btp.ux410solvinge07.controller.Detail", {
      onInit: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
        // var sOrderID = oEvent.getParameter("arguments").orderID;
        // var sProductID = oEvent.getParameter("arguments").productID;
        // var sUnitPrice = oEvent.getParameter("arguments").UnitPrice;
        // var sQuantity = oEvent.getParameter("arguments").Quantity;
        // var sDiscount = oEvent.getParameter("arguments").Discount;

        // var oView = this.getView(),
        // oModel = oView.getModel();
        // var oOrderIDText = oView.byId("idOrderID");
        // var oProductIDText = oView.byId("idProductID");
        // var oUnitPriceText = oView.byId("idUnitPrice");
        // var oQuantityText = oView.byId("idQuantity");
        // var oDiscountText = oView.byId("idDiscount");

        // oOrderIDText.setText(sOrderID);
        // oProductIDText.setText(sProductID);
        // oUnitPriceText.setText(sUnitPrice);
        // oQuantityText.setText(sQuantity);
        // oDiscountText.setText(sDiscount);

        const oView = this.getView(),
          oModel = oView.getModel(),
          oArgs = oEvent.getParameter("arguments");
        let sBindPath = oModel.createKey("/Order_Details", {
          OrderID: oArgs.OrderID,
          ProductID: oArgs.ProductID,
        });
        // sBindPath = '/Order_Details(OrderID='+oArgs.OrderID+',ProductID='+oArgs.ProductID+')';
        // sBindPath = '/Order_Details(OrderID=${oArgs.OrderID},ProductID=${oArgs.ProductID})';
        oView.bindElement(sBindPath);
      },
    });
  }
);
