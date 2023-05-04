sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("test0001.controller.Detail", {
            onInit: function () {
                this._setChartInView();
            },
            _setChartInView: function() {
                var oData = {
                    list : [
                        {name:'국어', rate: '100', cost: '10'},
                        {name:'영어', rate: '50', cost: '22'},
                        {name:'수학', rate: '80', cost: '66'},
                        {name:'도덕', rate: '80', cost: '44'},
                        {name:'체육', rate: '70', cost: '33'}
                    ]
                };
                var chartUid = this.byId("idViewChart").getVizUid();

                this.getView().setModel(new JSONModel(oData), "view");
                
                this.byId("idViewPopover").connect(chartUid);
            }
        });
    });
