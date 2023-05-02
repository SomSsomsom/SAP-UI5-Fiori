sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/Filter"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Filter) {
    "use strict";

    return Controller.extend("NT.zprojectodatae0703.controller.Main", {
      formatter: {
        onSum: function (a, b) {
          return a + b;
        },
        dateTime: function (oDate) {
          let oDateTimeInstance =
            sap.ui.core.format.DateFormat.getDateTimeInstance({
              pattern: "yyyy-MM-dd hh:mm:ss",
            });

          return oDateTimeInstance.format(oDate);
        },
      },
      onInit: function () {},
      onSearch: function () {
        let oOrderDate = this.byId("idOrderDate").getDateValue();
        let sInputValue = Number(this.byId("idOrderID").getValue());
        let oFilter = new Filter({
          filters: [
            new Filter({
              path: "OrderID",
              operator: "EQ",
              value1: sInputValue,
            }),
            new Filter({
              path: "OrderDate",
              operator: "GE",
              value1: oOrderDate,
            }),
          ],
          and: true,
        });

        this.byId("idProductsTable").getBinding("items").filter([oFilter]);

        // let oOrderDate = this.byId("idOrderDate");
        // let sInputValue = Number(this.byId("idOrderID").getValue()),
        //       oFilter = new sap.ui.model.Filter("OrderID", "EQ", sInputValue),
        //       aFilter = [];

        //     let oFilter2 = new sap.ui.model.Filter(
        //       "OrderDate",
        //       "GE",
        //       oOrderDate.getDateValue()
        //     );

        //     aFilter.push(oFilter);
        //     aFilter.push(oFilter2);

        //     this.byId("idProductsTable").getBinding("items").filter(aFilter);
        //   },
      },
    });
  }
);
