sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  //   "sap/viz/ui5/data/FlattenedDataSet",
  //   "sap/viz/ui5/controls/common/feeds/FeedItem",
  //   "sap/ui/model/json/JSONModel",

  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, FlattenedDataSet, FeedItem) {
    "use strict";

    return Controller.extend("sap.btp.ux410solvinge07.controller.Main", {
      onInit: function () {
        var oVizFrame = this.getView().byId("idVizFrame");
        oVizFrame.setVizType("bar");

        var data = {
          list: [
            { type: "bar" },
            { type: "column" },
            { type: "line" },
            { type: "donut" },
          ],
        };

        var oModel = new JSONModel();
        oModel.setData(data);

        this.getView().setModel(oModel, "typeList");
        var oTypeModel = this.getView().getModel("typeList");
      },
      onSearch: function () {
        var oComboBox = this.byId("idOrderID");
        var sSelectedValue = oComboBox.getSelectedKey();

        var oFilter = new sap.ui.model.Filter({
          path: "OrderID",
          operator: "EQ",
          value1: sSelectedValue,
        });

        var oVizFrame = this.byId("idVizFrame");
        var oChartBinding = oVizFrame.getDataset().getBinding("data");

        oChartBinding.filter([oFilter]);
      },

      onTypeChange: function (oEvent) {
        var oInput = oEvent.getSource();

        var iValue = parseInt(oInput.getValue());
        var sValue = this.getView().byId("idType").getSelectedKey();
        var oListModel = this.getView().getModel("typeList"),
          aList = oListModel.getProperty("/list");

        var isValidType = aList.some(function (item) {
          return item.type === sValue;
        });

        if (isValidType) {
          oInput.setValueState(sap.ui.core.ValueState.None);
          oInput.setValueStateText("");
        } else {
          oInput.setValueState(sap.ui.core.ValueState.Error);
          oInput.setValueStateText("올바른 Type을 입력하세요");
        }

        var oVizFrame = this.getView().byId("idVizFrame");

        var sSelectedChartType = this.getView().byId("idType").getSelectedKey();

        switch (sSelectedChartType) {
          case "bar":
            oVizFrame.setVizType("bar");
            break;
          case "column":
            oVizFrame.setVizType("column");
            break;
          case "line":
            oVizFrame.setVizType("line");
            break;
          case "donut":
            oVizFrame.setVizType("donut");
            break;
          default:
            break;
        }
      },
      onSelect: function (oEvent) {
        var oSelectedData = oEvent.getParameter("data");
        var sSelectedOrderID = oSelectedData[0].data.OrderID;
        var sSelectedProductID = oSelectedData[0].data.ProductID;

        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("RouteDetail", {
          OrderID: sSelectedOrderID,
          ProductID: sSelectedProductID,
        });
      },
    });
  }
);
