sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        //클로져 변수
        var test = 'hihi';

        return Controller.extend("zprojectteste0701.controller.Main", {
            iNumber : 20,
            onInit: function () {
                this.test2 = 'hihi2';
                // this.iNumber = 20;

                // var localVariable = 'local'; //다른 함수에서는 사용 불가
                // function a(){}; //상위 함수에서 사용되는 변수는 하위 함수에서 접근 가능

                // this.byId("idInput1").setValue(10);
                // this.byId("idInput2").setValue(20);
                // this.byId("idSelect").setSelectedkey('multiply');
                           },
            onButtonPress: function(oEvent) {
                // debugger;
                // alert('버튼 이벤트 함수 실행!');

                //<접근방식>
                // test //클로져 변수
                // this.test2 //Controller에 붙은 변수 
                // this.iNumber //Controller에 붙은 변수2 

               let sValue = this.byId("idInput1").getValue();
               alert(sValue);

               this._getSum(10, 20, 30);
            },
            _getSum : function(a, b, c) {
                return a +b+c;
            }, 
            onClick : function() {
                var oInput = this.byId("idCustomer"); //Input 객체
                var oLabel = oInput.getLabels()[0]; //Label 객체

                oLabel.getText(); //'Cusotomer'

                console.log(oLabel.getText());
            }
        });
    });
