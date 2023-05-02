sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("C05.zprojectteste0702.controller.View1", {
            onInit: function () {

            },

            onSubmit: function() {
                let sValue = this.byId("idInput").getValue();
                this.byId("idText").setText(sValue);

            },
            onButtonPress: function() {
                let oSelect = this.byId("idSelect").getSelectedItem(),
                iNum1 = Number(this.byId("idInput1").getValue()),
                iNum2 = Number(this.byId("idInput2").getValue()),
                result = 0;

                switch (oSelect.getKey()) {
                    case 'plus' :
                        result = iNum1 + iNum2;
                        break;
                    case 'minus' :
                        result = iNum1 - iNum2;
                        break;
                    case 'multiply' :
                        result = iNum1 * iNum2;
                        break;
                   case 'divide' :
                        result = iNum1 / iNum2;
                        break;
                    // default;
                }

               let sMsg = `${iNum1} ${oSelect.getText()} ${iNum2} = ${result}`;

                // MessageToast.show(sMsg);
                MessageBox.show(sMsg, {
                  
			icon: MessageBox.Icon.INFORMATION,
			title: "My message box title",
			actions: [MessageBox.Action.YES],
			emphasizedAction: MessageBox.Action.YES,
			onClose: function (oAction) { / * do something * / }
                });
            }
        });
    });