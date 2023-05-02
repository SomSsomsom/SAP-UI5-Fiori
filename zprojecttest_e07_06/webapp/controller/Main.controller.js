sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/f/library",
	"sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, library, Fragment, MessageToast, MessageBox) {
        "use strict";
        var DynamicPageTitleArea = library.DynamicPageTitleArea;

        return Controller.extend("zprojectteste0706.controller.Main", {
            onInit: function () {
                let datas = {
                //     title : {
                //         subTitle : 'Json Title'
                // },
                // list : [
                //     // {name : 'moon', age : 20 },
                //     // {name : 'hong', age : 21 },
                //     // {name : 'kim', age : 22 },
                //     // {name : 'park', age : 23 },
                //     // {name : 'song', age : 24 }
                //     {num1:33, oper:'+', num2:10, result:43}
                // ],
                todo : [
                    {content : '공부'},
                    {content : '솜이 돌보기'},
                    {content : '빨래'},
                    {content : '청소'}
                ]
            };
                // var oModel = new JSONModel();
                // oModel.loadData( sap.ui.require.toUrl("zprojectteste0704/model/data.json") );
                this.getView().setModel(new JSONModel(datas), 'MainModel');
            },
           
            onAdd: function() {
                // sap.ui.core.Fragment.load({
                //     name: "zprojectteste0703.fragment.helloDialog",
                //     type: "xml",
                //     Controller: this
                // }.then(function(oDialog) {
                //     oDialog.open();
                // }));
                var oDialog = this.byId("addDialog"); 
                // oDialog.open();
                if (oDialog) {
                    oDialog.open();
                    return;               
                 }

                this.loadFragment({
                    name: "zprojectteste0706.view.fragment.AddDialog"
                }).then(function(oDialog) {
                    oDialog.open();
                }, this);
            },
                onClose: function(oEvent){
                    var oDialog = oEvent.getSource().getParent(); //Dialog 객체
                    // var sValue = oDialog.getContent()[0].getItems()[1].getValue();
                    var oModel = this.getView().getModel("MainModel");    
                    var aTodo = oModel.getData().todo;               
     
                    // console.log(sValue);
                    var sValue = this.getView().getModel("root").getProperty("/value");
                    if(sValue){
                        aTodo.unshift({ Content : sValue});
                        oModel.setProperty("/todo", aTodo);
                    }

                   oDialog.close();
        },
        onBeforeOpen: function(){
            this.byId("InputTodo").setValue();
        },
        
        onDelete: function(){
            var oTable = this.byId("todoTable");
            var oModel = this.getView().getModel("MainModel");
            var aSelectedIndices =  oTable.getSelectedIndices();
            var aDatas = oModel.getProperty("/todo");
            var sMsg = "삭제하시겠습니까?"
    
            MessageBox.show(sMsg, {
                      
                icon: MessageBox.Icon.INFORSPMATION,
                title: "정말 삭제하시겠습니까?",
                actions: [MessageBox.Action.YES,MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.YES,
                onClose: function (oAction) { 
                if(oAction === 'YES'){
                    for(var i = aSelectedIndices.length-1; i >= 0 ; i--) {
                        aDatas.splice(aSelectedIndices[i], 1); //여러건 선택 삭제
                        
                        oModel.setProperty("/todo",aDatas);
                    }
    
                }
            }
                });
    
        },
        onRowDelete:function(oEvent){
    
            var oModel = this.getView().getModel("MainModel");
            var aDatas = oModel.getProperty("/todo");
            var iSelectedIndex = oEvent.getParameters().row.getIndex();
    
    
            aDatas.splice(iSelectedIndex, 1);
    
            oModel.setProperty("/todo",aDatas);
        },
        onPressOpenPopover: function (oEvent) {
            var oView = this.getView(),
                oSourceControl = oEvent.getSource();

            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sap.f.sample.DynamicPageFreeStyle.view.Card"
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }

            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oSourceControl);
            });
        },
    });
});