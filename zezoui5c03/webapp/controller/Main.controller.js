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

    return Controller.extend("zezoui5c03.controller.Main", {
      onInit: function () {
        this.getView().setModel(new JSONModel(), "main");

        this.getView().setModel(new JSONModel(), "mod");

        this.getView().setModel(new JSONModel(), "txt");

        this._defaultSet();
      },
      _defaultSet: function () {
        // odata model 변수 세팅
        this.oModel = this.getOwnerComponent().getModel();
        //json model 변수 세팅
        this.oMainModel = this.getView().getModel("main");
        this.oModModel = this.getView().getModel("mod");
        this.oTxtModel = this.getView().getModel("txt");
        //table 객체
        this.oTable = this.byId("table");
      },
      onSearchPress: function () {
        var oTable = this.getView().byId("table");
        var oMatnumInput = this.getView().byId("MatnumInput");
        var oMattxtInput = this.getView().byId("MattxtInput");
        var oMultiComboBox = this.byId("MattypeBox");
        var aComboMatValues = oMultiComboBox.getSelectedKeys();

        var aFilters = [];

        var oMatnumValue = oMatnumInput.getValue();
        var oMattxtValue = oMattxtInput.getValue();

        if (oMatnumValue) {
          var oMatnumFilter = new Filter(
            "Matnum",
            FilterOperator.Contains,
            oMatnumValue
          );
          aFilters.push(oMatnumFilter);
        }

        if (oMattxtValue) {
          var oMattxtFilter = new Filter(
            "Mattxt",
            FilterOperator.Contains,
            oMattxtValue
          );
          aFilters.push(oMattxtFilter);
        }

        if (aComboMatValues.length > 0) {
          var aMattypeFilters = aComboMatValues.map(function (sMattypeValue) {
            return new Filter("Mattype", FilterOperator.EQ, sMattypeValue);
          });
          var oMattypeFilter = new Filter({
            filters: aMattypeFilters,
            and: false,
          });
          aFilters.push(oMattypeFilter);
        }

        var oBinding = oTable.getBinding("rows");
        oBinding.filter(aFilters);
      },
      formatPrice: function (value) {
        var formatter = new sap.ui.model.type.Integer({
          decimalSeparator: ",",
          groupingSeparator: ",",
          groupingEnabled: true,
        });
        return formatter.formatValue(value, "string");
      },
      formatDays: function (sValue) {
        if (sValue) {
          var days = parseInt(sValue, 10); // 문자열을 정수로 변환
          return days;
        }
        return "";
      },
      onCreatePress: function () {
        var oView = this.getView();

        if (!this._pDialog) {
          this._pDialog = Fragment.load({
            id: oView.getId(),
            name: "zezoui5c03.view.Dialog",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            return oDialog;
          });
        }

        this._pDialog.then(function (oDialog) {
          if (oDialog.isOpen()) {
            oDialog.close();
          } else {
            oDialog.open();
          }
        });
      },
      onClose: function (oEvent) {
        var oDialog = oEvent
          .getSource() /*Button 객체 가져옴*/
          .getParent(); //Dialog 객체

        oDialog.close();
      },
      onCloseModDialog: function (oEvent) {
        var oDialog = oEvent
          .getSource() /*Button 객체 가져옴*/
          .getParent(); //Dialog 객체

        oDialog.close();
      },

      onSaveDialog: function (oEvent) {
        var oData = this.oMainModel.getData();
        var oTxtData = this.oTxtModel.getData();
        var oDialog = oEvent.getSource().getParent();

        var oMattype = this.getView().byId("idMattype").getSelectedKey();
        var oUnit = this.getView().byId("idUnit").getSelectedKey();
        var oDelflag = this.getView().byId("idDelflag").getSelected()
          ? "X"
          : "";
        var oMatnum = this.getView().byId("idMatnum").getValue();

        oData.Mattype = oMattype;
        oData.Langu = "3";
        oData.Unit = oUnit;
        oData.Currency = "KRW";
        oData.Delflag = oDelflag;
        // oTxtData.Langu = "E";
        oTxtData.Matnum = oMatnum;

        // Check if all fields have values
        if (
          oData.Matnum &&
          oData.Mattype &&
          oData.Mattxt &&
          oTxtData.Mattxt &&
          oData.Unit &&
          oData.Scrap &&
          oData.Matper &&
          oData.Prodper &&
          oData.Stdprice
        ) {
          // All fields have values, proceed with creating
          var that = this; // Controller reference variable

          this.oModel.create("/MatSet", oData, {
            success: function () {
              this.oModel.create("/MattextSet", oTxtData);
              sap.m.MessageToast.show("등록 성공!");
              oDialog.close();

              var oView = that.getView();

              oView.byId("idMatnum").setValue("");
              oView.byId("idMattype").setSelectedKey("");
              oView.byId("idMattxt").setValue("");
              oView.byId("idMattxte").setValue("");
              oView.byId("idUnit").setSelectedKey("");
              oView.byId("idScrap").setValue("");
              oView.byId("idMatper").setValue("");
              oView.byId("idProdper").setValue("");
              oView.byId("idStdprice").setValue("");
              oView.byId("idDelflag").setSelected(false);
            }.bind(this),
            error: function () {
              sap.m.MessageToast.show("등록 오류!");
            },
          });
        } else {
          // Show an error message indicating that all fields are required
          sap.m.MessageBox.error("모든 값을 입력해주세요.");
        }
      },

      onSaveModDialog: function () {
        var oData = this.oModModel.getData();
        var oDelflag = this.getView().byId("idDelflag1").getSelected()
          ? "X"
          : "";
        oData.Delflag = oDelflag;

        // Perform validation
        if (this.validateFields(oData)) {
          // Validation successful, proceed with updating
          this.oModel.update("/MatSet('" + oData.Matnum + "')", oData, {
            success: function () {
              sap.m.MessageToast.show("수정 성공!");
              var oDialog = this.byId("modDialog");
              if (oDialog) {
                oDialog.close();
              }
            }.bind(this),
            error: function () {
              sap.m.MessageToast.show("수정 오류!");
            },
          });
        } else {
          // Validation failed, show error message
          sap.m.MessageBox.error("모든 값을 입력해주세요.");
        }
      },

      validateFields: function (oData) {
        // Perform validation checks on the fields
        if (
          oData.Matnum &&
          oData.Mattype &&
          oData.Mattxt &&
          oData.Unit &&
          oData.Scrap &&
          oData.Matper &&
          oData.Prodper &&
          oData.Stdprice
        ) {
          return true; // All fields have values
        } else {
          return false; // Some fields are missing values
        }
      },

      // onSaveModDialog: function () {
      //   var oData = this.oModModel.getData();
      //   var oDelflag = this.getView().byId("idDelflag1").getSelected()
      //     ? "X"
      //     : "";
      //   oData.Delflag = oDelflag;

      //   // 저장 로직 추가
      //   this.oModel.update("/MatSet('" + oData.Matnum + "')", oData, {
      //     success: function () {
      //       sap.m.MessageToast.show("Update Success!");
      //       var oDialog = this.byId("modDialog");
      //       if (oDialog) {
      //         oDialog.close();
      //       }
      //     }.bind(this),
      //     error: function () {
      //       sap.m.MessageToast.show("Update Error!");
      //     },
      //   });
      // },

      onCloseDialog: function () {
        var oDialog = this.getView().byId("addDialog");

        this.getView().byId("idMatnum").setValue("");
        this.getView().byId("idMattype").setSelectedKey("");
        // this.getView().byId("idLangu").setSelectedKey("");
        this.getView().byId("idMattxt").setValue("");
        this.getView().byId("idMattxte").setValue("");
        this.getView().byId("idUnit").setSelectedKey("");
        this.getView().byId("idScrap").setValue("");
        this.getView().byId("idMatper").setValue("");
        this.getView().byId("idProdper").setValue("");
        this.getView().byId("idStdprice").setValue("");
        this.getView().byId("idDelflag").setSelected(false);

        oDialog.close();
      },

      onRowSelect: function (oEvent) {
        var oRowContext = oEvent.getParameter("rowContext");
        var oModel = oRowContext.getModel();
        var sPath = oRowContext.getPath();
        var oRowData = oModel.getProperty(sPath);
        this.oModModel.setProperty("/", oRowData);
      },

      onModifyPress: function (oEvent) {
        var oTable = this.byId("table");
        var aSelectedIndices = oTable.getSelectedIndices();
        var oFDialog = this.byId("modDialog");

        if (aSelectedIndices.length === 0) {
          sap.m.MessageToast.show("수정할 Row를 선택해주세요.");
          return;
        }

        var oSource = oEvent.getSource();
        var oView = this.getView();

        if (!this._pModifyDialog) {
          this._pModifyDialog = Fragment.load({
            id: oView.getId(),
            name: "zezoui5c03.view.ModifyDialog",
            controller: this,
          }).then(function (oModifyDialog) {
            oView.addDependent(oModifyDialog);
            return oModifyDialog;
          });
        }

        this._pModifyDialog.then(function (oModifyDialog) {
          if (oModifyDialog.isOpen()) {
            oModifyDialog.close();
          } else {
            oModifyDialog.open();
          }
        });
      },

      onMatnumLiveChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Validate if the input is an 8-digit number
        var regex = /^\d{8}$/;
        var bValid = regex.test(sValue);

        oInput.setValueState(
          bValid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error
        );
        oInput.setValueStateText(
          bValid ? "" : "자재번호는 8자리 숫자로 입력해주세요."
        );

        // Disable the Save button if there is a validation error
        var oDialog = this.byId("addDialog");
        var oSaveButton = oDialog.getBeginButton();
        oSaveButton.setEnabled(bValid);
      },

      onMattxtLiveChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();
        var iLength = sValue.length;

        var bValid = iLength >= 1 && iLength <= 40;

        oInput.setValueState(
          bValid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error
        );
        oInput.setValueStateText(
          bValid ? "" : "1자에서 40자 사이의 글자로 입력해주세요."
        );

        // Disable the Save button if there is a validation error
        var oDialog = this.byId("addDialog");
        var oSaveButton = oDialog.getBeginButton();
        oSaveButton.setEnabled(bValid);
      },

      onMattxtLiveChange1: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();
        var iLength = sValue.length;

        var bValid = iLength >= 1 && iLength <= 40;

        oInput.setValueState(
          bValid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error
        );
        oInput.setValueStateText(
          bValid ? "" : "1자에서 40자 사이의 글자로 입력해주세요."
        );

        // Disable the Save button if there is a validation error
        var oDialog = this.byId("modDialog");
        var oSaveButton = oDialog.getBeginButton();
        oSaveButton.setEnabled(bValid);
      },

      onMattxteLiveChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Validate if the input contains only English letters, numbers, special characters, and spaces
        var regex =
          /^[a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\-\_\+\=\[\]\{\}\\\|\;\:\'\"\,\.\/\?\<\>\s]+$/;
        var bValid = regex.test(sValue);

        oInput.setValueState(
          bValid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error
        );
        oInput.setValueStateText(
          bValid ? "" : "영어, 숫자, 특수문자, 공백만 입력 가능합니다."
        );

        // Disable the Save button if there is a validation error
        var oDialog = this.byId("addDialog");
        var oSaveButton = oDialog.getBeginButton();
        oSaveButton.setEnabled(bValid);
      },

      onScrapLiveChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Validate if the input is a number with up to 1 decimal place
        var regex = /^\d+(\.\d{0,1})?$/;
        var bValid = regex.test(sValue);

        if (bValid) {
          // Validate if the value is within the range of 0 to 100
          var fValue = parseFloat(sValue);
          bValid = fValue >= 0 && fValue <= 100;
        }

        oInput.setValueState(
          bValid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error
        );
        oInput.setValueStateText(
          bValid
            ? ""
            : "숫자와 소수점 1자리까지 입력 가능하며, 최대값은 100입니다."
        );

        // Disable the Save button if there is a validation error
        var oDialog = this.byId("addDialog");
        var oSaveButton = oDialog.getBeginButton();
        oSaveButton.setEnabled(bValid);
      },
      onScrapLiveChange1: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Validate if the input is a number with up to 1 decimal place
        var regex = /^\d+(\.\d{0,1})?$/;
        var bValid = regex.test(sValue);

        if (bValid) {
          // Validate if the value is within the range of 0 to 100
          var fValue = parseFloat(sValue);
          bValid = fValue >= 0 && fValue <= 100;
        }

        oInput.setValueState(
          bValid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error
        );
        oInput.setValueStateText(
          bValid
            ? ""
            : "숫자와 소수점 1자리까지 입력 가능하며, 최대값은 100입니다."
        );

        // Disable the Save button if there is a validation error
        var oDialog = this.byId("modDialog");
        var oSaveButton = oDialog.getBeginButton();
        oSaveButton.setEnabled(bValid);
      },

      onMatperLiveChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Validate if the input is a positive integer greater than 0
        var regex = /^[1-9]\d*$/;
        var bValid = regex.test(sValue);

        oInput.setValueState(
          bValid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error
        );
        oInput.setValueStateText(bValid ? "" : "0보다 큰 정수를 입력해주세요.");

        // Disable the Save button if there is a validation error
        var oDialog = this.byId("addDialog");
        var oSaveButton = oDialog.getBeginButton();
        oSaveButton.setEnabled(bValid);
      },

      onMatperLiveChange1: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Validate if the input is a positive integer greater than 0
        var regex = /^[1-9]\d*$/;
        var bValid = regex.test(sValue);

        oInput.setValueState(
          bValid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error
        );
        oInput.setValueStateText(bValid ? "" : "0보다 큰 정수를 입력해주세요.");

        // Disable the Save button if there is a validation error
        var oDialog = this.byId("modDialog");
        var oSaveButton = oDialog.getBeginButton();
        oSaveButton.setEnabled(bValid);
      },

      onDeletePress: function () {},
      onBeforeOpen: function () {
        var oCheckbox = this.byId("idDelflag1");

        if (this.oModModel.getProperty("/Delflag") === "X") {
          oCheckbox.setSelected(true);
        } else {
          oCheckbox.setSelected(false);
        }
      },

      // onBeforeOpen: function () {
      //   var oCheckbox = this.byId("idDelflag1");
      //   var sDelflag = this.oModModel.getProperty("/Delflag");

      //   setTimeout(function () {
      //     if (sDelflag === "X") {
      //       oCheckbox.setSelected(true);
      //     } else {
      //       oCheckbox.setSelected(false);
      //     }
      //   }, 0);
      // },
    });
  }
);
