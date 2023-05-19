sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  function (Controller, Filter, FilterOperator, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("exprograme07.controller.Main", {
      onInit: function () {
        var oTable = this.getView().byId("idTable");

        var data = {
          list: [{ code: "USD" }, { code: "EUR" }, { code: "KRW" }],
        };

        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData(data);

        this.getView().setModel(oModel, "currList");
      },

      onButtonPress: function (oEvent) {
        var oInput = this.byId("idCarrname");
        var sInputValue = oInput.getValue();

        var oComboBox = this.byId("idCurrcode");
        var sSelectedValue = oComboBox.getSelectedKey();

        var aFilters = [];

        if (sSelectedValue) {
          var oComboBoxFilter = new Filter(
            "Currcode",
            FilterOperator.EQ,
            sSelectedValue
          );
          aFilters.push(oComboBoxFilter);
        }

        if (sInputValue) {
          var oInputFilter = new Filter(
            "Carrname",
            FilterOperator.Contains,
            sInputValue
          );
          aFilters.push(oInputFilter);
        }

        var oTable = this.byId("idTable");
        var oBinding = oTable.getBinding("items");
        oBinding.filter(aFilters);
      },

      onResButtonPress: function (oEvent) {
        var oSelectedItem = oEvent
          .getSource()
          .getParent()
          .getBindingContextPath();
        var oODataModel = this.getView().getModel();
        var oDialog = this.byId("infoDialog");

        oODataModel.read(oSelectedItem, {
          urlParameters: { $expand: "to_Item" },
          success: function (oReturn) {
            Fragment.load({
              name: "exprograme07.view.fragment.Info",
              controller: this,
            }).then(function (oFragment) {
              oDialog = oFragment;
              var oModel = new JSONModel();
              oModel.setData(oReturn);
              //   oModel.setProperty(oReturn);
              oDialog.setModel(oModel, "carrierData");

              //   oFragment.setModel(oModel, "carrierData");

              oDialog.open();
            });
          }.bind(this),
        });
      },
      onClose: function (oEvent) {
        var oDialog = oEvent
          .getSource() /*Button 객체 가져옴*/
          .getParent(); //Dialog 객체

        oDialog.close();
      },
    });
  }
);
