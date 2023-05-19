sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sap.btp.ux400solvinge07.controller.Main", {
      formatter: {
        customFormat: function (value) {
          return value ? "Yes" : "No";
        },
      },
      onInit: function () {
        let datas = { lists: [{ value: 1 }] };

        this.getView().setModel(new JSONModel(datas), "list");

        // this._defaultSet();
      },
      //   _defaultSet: function () {
      //     // this.oModel = this.getOwnerComponent().getModel();
      //     // this.oListModel = this.getView().getModel("list");
      //     // this.oTable = this.byId("idTable");
      //   },
      onRandomPress: function (oEvent) {
        var oListModel = this.getView().getModel("list"),
          aList = oListModel.getProperty("/lists");
        this.byId("idInput1").setValue(Math.floor(Math.random() * 100) + 1);
        var sValue = this.byId("idInput1").getValue();
        // var sValue = this.byId("idInput1").getValue();
        // var oTable = this.byId("idTable");
        aList.push({ value: sValue });

        oListModel.setProperty("/lists", aList);
      },
      onProductButtonPress: function () {
        var oDialog = this.byId("addDialog"); //.getSource().getParent();
        // oDialog.open();
        if (oDialog) {
          oDialog.open();
          return;
        }

        this.loadFragment({
          name: "sap.btp.ux400solvinge07.view.fragment.Products",
        }).then(function (oDialog) {
          oDialog.open();
        }, this);
        // sap.m.MessageToast.show("Input Help !!!");
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
      onValueChange: function (oEvent) {
        // var sValue = oEvent.getParameter("value");
        var oInput = oEvent.getSource();

        var iValue = parseInt(oInput.getValue());

        var oListModel = this.getView().getModel("list"),
          aList = oListModel.getProperty("/lists");

        var sValue = this.byId("idInput1").getValue();

        if (iValue >= 1 && iValue <= 100) {
          aList.push({ value: iValue });
          oListModel.setProperty("/lists", aList);
          oInput.setValueState(sap.ui.core.ValueState.None);
          oInput.setValueStateText("");
        } else {
          oInput.setValueState(sap.ui.core.ValueState.Error);
          oInput.setValueStateText("1이상 100이하의 숫자를 입력하세요");
        }
      },
    });
  }
);
