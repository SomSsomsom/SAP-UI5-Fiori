sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("zprojectodatae0705.controller.Main", {
      onInit: function () {
        this.getView().setModel(new JSONModel(), "main");

        this._defaultSet();
      },
      _defaultSet: function () {
        // odata model 변수 세팅
        this.oModel = this.getOwnerComponent().getModel();
        //json model 변수 세팅
        this.oMainModel = this.getView().getModel("main");
        //table 객체
        this.oTable = this.byId("idTable");
      },
      onCreate: function () {
        let oData = this.oMainModel.getData();

        oData.Productno = Number(oData.Productno);

        this.oModel.create("/Products", oData, {
          success: function () {
            sap.m.MessageToast.show("Create Success!");
          },
          error: function () {
            sap.m.MessageToast.show("Create Error!");
          },
        });
      },
      onUpdate: function () {
        let jsonData = this.oMainModel.getProperty("/");
        let sFullPath = this.oModel.createKey("/Products", {
          Productno: jsonData.Productno,
        });

        jsonData.Productno = Number(jsonData.Productno);
        this.oModel.update(sFullPath, jsonData, {
          success: function () {
            sap.m.MessageToast.show("변경완료");
          },
        });
      },
      onDelete: function () {
        let index = this.oMainModel.getProperty("/Productno");
        let sFullPath = this.oModel.createKey("/Products", {
          Productno: Number(index),
        });
        this.oModel.remove(sFullPath, {
          success: function () {
            sap.m.MessageToast.show("삭제완료");
          },
        });
      },
      onReadEntity: function () {
        let index = this.oTable.getSelectedIndex();
        let sPath = this.oTable.getContextByIndex(index).getPath();

        // let sFullPath = this.oModel.createKey("/Products", {
        //   Productno: 2,
        // }); //Products(2)와 동일
        // oView.setBusy(true);
        this.oModel.read(sPath, {
          success: function (oReturn) {
            // oView.setBusy(false);
            console.log("READ :", oReturn);
            this.oMainModel.setProperty("/", oReturn);
            // this.byId("idInput1").setValue(oReturn.Productno);
            // this.byId("idInput2").setValue(oReturn.Productname);
            // this.byId("idInput3").setValue(oReturn.Fname);
            // this.byId("idInput4").setValue(oReturn.Lname);
            // this.byId("idInput5").setValue(oReturn.Memo);
          }.bind(this),
        });
      },
      onRefresh: function () {
        this.oModel.refresh(true);
      },
    });
  }
);
