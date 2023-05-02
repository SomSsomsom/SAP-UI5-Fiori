sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("zprojectteste0704.controller.Main", {
            onInit: function () {
                let datas = {
                    title : {
                        subTitle : 'Json Title'
                },
                list : [
                    // {name : 'moon', age : 20 },
                    // {name : 'hong', age : 21 },
                    // {name : 'kim', age : 22 },
                    // {name : 'park', age : 23 },
                    // {name : 'song', age : 24 }
                    {num1:33, oper:'+', num2:10, result:43}
                ],
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
            onChange: function () {
       
                var oModel = this.getView().getModel("MainModel");
                var oData = oModel.getProperty("/title/subTitle");

                // var oData = oModel.getData();

                // var sObject1 = oData.num1;
                // var sOper = oData.oper;
                // var 

                // var oData = oModel.getData(); // 전체 데이터를 다 가져옴

                // console.log('변경 전:', oData.title.subTitle);

                // oData.title.subTitle = 'change Title';
                
                // oModel.setData(oData);
                
                // var sText = oData.list[0].name; //'moon'
                // this.byId("idText").setText(sText);

                // oModel.getProperty("/title/subTitle"); //특정 경로에 해당하는 데이터 가져옴
                
                // var oModel = this.getView().getModel("MainModel");
                // var oData = oModel.getData();

            //    oModel.getProperty("/title/subTitle");
                console.log('변경 전:', oData);
                // console.log('변경전', oData.list[4].age);
                oModel.setProperty("/title/subTitle", "Change Title");
            },
            onDisplay: function () {
                var oModel = this.getView().getModel("MainModel");

                // var oData = oModel.getData(); // 전체 데이터를 다 가져옴
                // oData.list[4].age = 100;

                // console.log('변경 후:', oData.title.subTitle);
                // console.log('변경 후:', oData.list[4].age);

                // var oModel = this.getView().getModel("MainModel");
                // var oData = oModel.getData();
                var oData = oModel.getProperty("/title/subTitle");
                console.log('변경 후 :', oData);

              

            },
            onButtonPress: function(oEvent) {
                var oModel  = this.getView().getModel("MainModel"),
                    aList = oModel.getData().list; //배열을 가져옴 [{...}]

                let oSelect = this.byId("idSelect").getSelectedItem(),
                iNum1 = Number(this.byId("idInput1").getValue()),
                iNum2 = Number(this.byId("idInput2").getValue()),
                result = 0;
                let sMsg = '';

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

               
             sMsg = `${iNum1} ${oSelect.getText()} ${iNum2} = ${result}`;
              
            //  aList.push({
            //     num1: iNum1,
            //     oper: oSelect.getText(),
            //     num2: iNum2,
            //     result: result
            //    });

            //    oModel.setProperty("/list", aList);
                // MessageToast.show(sMsg);
                MessageBox.show(sMsg, {
                  
			icon: MessageBox.Icon.INFORMATION,
			title: "My message box title",
			actions: [MessageBox.Action.YES],
			emphasizedAction: MessageBox.Action.YES,
			onClose: function (oAction) { 
                if(oAction === 'YES') {
                    aList.push({
                        num1: iNum1,
                        oper: oSelect.getText(),
                        num2: iNum2,
                        result: result
                    });
                    oModel.setProperty("/list", aList);
                }
            }
                });
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
                    name: "zprojectteste0704.view.fragment.AddDialog"
                }).then(function(oDialog) {
                    oDialog.open();
                }, this);
            },
            onClose: function(oEvent) {
            var oDialog = oEvent.getSource()/*Button 객체 가져옴*/.getParent(); //Dialog 객체
            //    var sValue = oDialog.getContent()[0].getItems()[1].getValue();

            //    console.log(sValue);
            var sValue = this.getView().getModel("root").getProperty("/value");
            var oModel  = this.getView().getModel("MainModel");
            var aTodo = oModel.getData().todo;
           
            //    console.log(sValue);
                if(sValue){
                    aTodo.unshift({
                       content : sValue
                    });
                    oModel.setProperty("/todo", aTodo);
                }
               oDialog.close();
            },
            onBeforeOpen: function () {
                this.byId("addInput").setValue();
            },
           
            onDelete: function() {
                var oTable = this.byId("todoTable");
                var oModel = this.getView().getModel("MainModel");
                var aSelectedIndices =  oTable.getSelectedIndices(); //선택한 인덱스
                var aDatas = oModel.getProperty("/todo");
                var sMsg = "정말 삭제하시겠습니까?";


                MessageBox.show(sMsg, {
                  
                    icon: MessageBox.Icon.INFORMATION,
                    title: "삭제?",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function(oAction){
                    if(oAction === 'YES') {
                        for(var i = aSelectedIndices.length-1; i >= 0 ; i--) {
                            aDatas.splice(aSelectedIndices[i], 1);
                            oModel.setProperty("/todo", aDatas);
                            }
                    }}
                });
          },
          onRowDelete: function(oEvent) {
            var iSelectedIndex = oEvent.getParameters().row.getIndex();
            var oTable = this.byId("todoTable");
            var oModel = this.getView().getModel("MainModel");
            var aDatas = oModel.getProperty("/todo");

            aDatas.splice(iSelectedIndex, 1);
            oModel.setProperty("/todo", aDatas);
          }
});
});
