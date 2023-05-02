sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("zprojectodatae0704.controller.Main", {
      formatter: {
        dateTime: function (oDate) {
          let oDateTimeInstance =
            sap.ui.core.format.DateFormat.getDateTimeInstance({
              pattern: "yyyy-MM-dd",
            });
          return oDateTimeInstance.format(oDate);
        },
      },
      onInit: function () {},
      onChange: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        var sPath = oEvent.getParameters().listItem.getBindingContextPath();
        var sKey = this.getView()
          .getModel()
          .getProperty(sPath + "/OrderID");
        oRouter.navTo("RouteDetail", {
          key: sKey,
        });
      },
      onValueHelpRequest: function () {
        var oDialog = this.byId("addDialog");
        // oDialog.open();
        if (oDialog) {
          oDialog.open();
          return;
        }

        this.loadFragment({
          name: "zprojectodatae0704.view.fragment.CustomerDialog",
        }).then(function (oDialog) {
          oDialog.open();
        }, this);
        sap.m.MessageToast.show("Input Help !!!");
      },
      onClose: function (oEvent) {
        var oDialog = oEvent
          .getSource() /*Button 객체 가져옴*/
          .getParent(); //Dialog 객체
        //    var sValue = oDialog.getContent()[0].getItems()[1].getValue();

        //    console.log(sValue);
        // var sValue = this.getView().getModel().getProperty();
        // var oModel = this.getView().getModel();
        // var aTodo = oModel.getData().todo;

        oDialog.close();
      },
      onSelectChange: function (oEvent) {
        var oDialog = oEvent.getSource().getParent();
        var sPath = oEvent.getParameters().rowContext.sPath;
        var sKey = this.getView()
          .getModel()
          .getProperty(sPath + "/CustomerID");
        var oModel = this.getView().getModel();
        var oFilter = new sap.ui.model.Filter("CustomerID", "EQ", "sKey");
        this.byId("idInput1").setValue(sKey);
        oDialog.close();
        this._search(sKey);
      },
      _search: function (sKey) {
        var oFilter = new sap.ui.model.Filter("CustomerID", "EQ", sKey);
        // debugger;
        this.byId("idCustomerTable").getBinding("items").filter([oFilter]);
      },
    });
  }
);
