sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/f/library",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, library, JSONModel) {
    "use strict";

    return Controller.extend("test0001.controller.Main", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
      },

      /**
       * ColumnListItem Event : 아이템 클릭 시 Detail View로 이동
       */
      onListItemPress: function (oEvent) {
        this.oView
          .getParent()
          .getParent()
          .setLayout(library.LayoutType.TwoColumnsMidExpanded);
        this.oRouter.navTo("Detail", {
          layout: library.LayoutType.TwoColumnsMidExpanded,
          key: 1,
        });
      },
    });
  }
);
