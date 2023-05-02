sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zprojectteste0703.controller.HelloPanel", {
            onInit: function () {

            },
            onHelloPress: function() {
                // sap.ui.core.Fragment.load({
                //     name: "zprojectteste0703.fragment.helloDialog",
                //     type: "xml",
                //     Controller: this
                // }.then(function(oDialog) {
                //     oDialog.open();
                // }));
                var oDialog = this.byId("helloDialog"); //undefined
                // oDialog.open();
                if (oDialog) {
                    oDialog.open();
                    return;               
                 }

                this.loadFragment({
                    name: "zprojectteste0703.view.fragment.HelloDialog"
                }).then(function(oDialog) {
                    oDialog.open();
                }, this);
            },
            onClose: function(oEvent) {
               var oDialog = oEvent.getSource()/*Button 객체 가져옴*/.getParent(); //Dialog 객체

               oDialog.close();
            }
        });
    });
