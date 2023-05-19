// sap.ui.define(
//   [
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/core/format/DateFormat",
//     "sap/ui/model/Filter",
//     "sap/ui/unified/library",
//     "sap/ui/model/json/JSONModel",
//   ],
//   function (Controller, DateFormat, Filter, unifiedLibrary, JSONModel) {
//     "use strict";
//     var CalendarDayType = unifiedLibrary.CalendarDayType;

//     return Controller.extend("zezoui5r06.controller.Main", {
//       onInit: function () {
//         // 1. 샘플 그대로 우리 화면에 띄워보기
//         // 2. json data 구조 파악
//         // 3. odata 데이터 가져와서 가공. => 다시..

//         // this.getOwnerComponent()
//         //   .getModel()
//         //   .read("/SCHAPTSet", {
//         //     success: function (oReturn) {
//         //       console.log(oReturn);

//         //       // debugger 해서 받아오는 oReturn 값 확인
//         //       // ...가공...
//         //       // oModel.setData(가공한데이터);
//         //     },
//         //   });

//         var oModel = new JSONModel();
//         oModel.setData({
//           // startDate: new Date("2023", "6", "9"),
//           appointments: [
//             {
//               title: "Meet John Miller",
//               type: CalendarDayType.Type05,
//               startDate: new Date("2023", "6", "8", "5", "0"),
//               endDate: new Date("2023", "6", "8", "6", "0"),
//             },
//             {
//               title: "Discussion of the plan",
//               type: CalendarDayType.Type01,
//               startDate: new Date("2023", "6", "8", "6", "0"),
//               endDate: new Date("2023", "6", "8", "7", "9"),
//             },
//             {
//               title: "Lunch",
//               text: "canteen",
//               type: CalendarDayType.Type05,
//               startDate: new Date("2023", "6", "8", "7", "0"),
//               endDate: new Date("2023", "6", "8", "8", "0"),
//             },
//             {
//               title: "New Product",
//               text: "room 105",
//               type: CalendarDayType.Type01,
//               icon: "sap-icon://meeting-room",
//               startDate: new Date("2023", "6", "8", "8", "0"),
//               endDate: new Date("2023", "6", "8", "9", "0"),
//             },
//             {
//               title: "Team meeting",
//               text: "Regular",
//               type: CalendarDayType.Type01,
//               icon: "sap-icon://home",
//               startDate: new Date("2023", "6", "8", "9", "9"),
//               endDate: new Date("2023", "6", "8", "10", "0"),
//             },
//             {
//               title: "Discussion with clients regarding our new purpose",
//               text: "room 234 and Online meeting",
//               type: CalendarDayType.Type08,
//               icon: "sap-icon://home",
//               startDate: new Date("2023", "6", "8", "10", "0"),
//               endDate: new Date("2023", "6", "8", "11", "30"),
//             },
//             {
//               title: "Discussion of the plan",
//               text: "Online meeting with partners and colleagues",
//               type: CalendarDayType.Type01,
//               icon: "sap-icon://home",
//               tentative: true,
//               startDate: new Date("2023", "6", "8", "11", "30"),
//               endDate: new Date("2023", "6", "8", "13", "00"),
//             },
//             {
//               title: "Discussion with clients",
//               type: CalendarDayType.Type08,
//               icon: "sap-icon://home",
//               startDate: new Date("2023", "6", "8", "12", "30"),
//               endDate: new Date("2023", "6", "8", "13", "15"),
//             },
//             {
//               title: "Meeting with the manager",
//               type: CalendarDayType.Type03,
//               startDate: new Date("2023", "6", "8", "13", "9"),
//               endDate: new Date("2023", "6", "8", "13", "9"),
//             },
//             {
//               title: "Meeting with the HR",
//               type: CalendarDayType.Type03,
//               startDate: new Date("2023", "6", "8", "14", "0"),
//               endDate: new Date("2023", "6", "8", "14", "15"),
//             },
//             {
//               title: "Call with customer",
//               type: CalendarDayType.Type08,
//               startDate: new Date("2023", "6", "8", "14", "15"),
//               endDate: new Date("2023", "6", "8", "14", "30"),
//             },
//             {
//               title: "Prepare documentation",
//               text: "At my desk",
//               icon: "sap-icon://meeting-room",
//               type: CalendarDayType.Type03,
//               startDate: new Date("2023", "6", "8", "14", "10"),
//               endDate: new Date("2023", "6", "8", "15", "30"),
//             },
//             {
//               title: "Meeting with the manager",
//               type: CalendarDayType.Type03,
//               startDate: new Date("2023", "6", "9", "6", "30"),
//               endDate: new Date("2023", "6", "9", "7", "0"),
//             },
//             {
//               title: "Lunch",
//               type: CalendarDayType.Type05,
//               startDate: new Date("2023", "6", "9", "7", "0"),
//               endDate: new Date("2023", "6", "9", "8", "0"),
//             },
//             {
//               title: "Team meeting",
//               text: "online",
//               type: CalendarDayType.Type01,
//               startDate: new Date("2023", "6", "9", "8", "0"),
//               endDate: new Date("2023", "6", "9", "9", "0"),
//             },
//             {
//               title: "Discussion with clients for the new release dates",
//               text: "Online meeting",
//               type: CalendarDayType.Type08,
//               startDate: new Date("2023", "6", "9", "9", "0"),
//               endDate: new Date("2023", "6", "9", "10", "0"),
//             },
//             {
//               title: "Team meeting",
//               text: "room 5",
//               type: CalendarDayType.Type01,
//               startDate: new Date("2023", "6", "9", "11", "0"),
//               endDate: new Date("2023", "6", "9", "14", "0"),
//             },
//             {
//               title: "Daily standup meeting",
//               type: CalendarDayType.Type01,
//               startDate: new Date("2023", "6", "9", "9", "0"),
//               endDate: new Date("2023", "6", "9", "9", "15", "0"),
//             },
//             {
//               title: "Private meeting",
//               type: CalendarDayType.Type03,
//               startDate: new Date("2023", "6", "11", "9", "9"),
//               endDate: new Date("2023", "6", "11", "9", "20"),
//             },
//             {
//               title: "Private meeting",
//               type: CalendarDayType.Type03,
//               startDate: new Date("2023", "6", "10", "6", "0"),
//               endDate: new Date("2023", "6", "10", "7", "0"),
//             },
//             {
//               title: "Meeting with the manager",
//               type: CalendarDayType.Type03,
//               startDate: new Date("2023", "6", "10", "15", "0"),
//               endDate: new Date("2023", "6", "10", "15", "30"),
//             },
//             {
//               title: "Meet John Doe",
//               type: CalendarDayType.Type05,
//               icon: "sap-icon://home",
//               startDate: new Date("2023", "6", "11", "7", "0"),
//               endDate: new Date("2023", "6", "11", "7", "30"),
//             },
//             {
//               title: "Team meeting",
//               text: "online",
//               type: CalendarDayType.Type01,
//               startDate: new Date("2023", "6", "11", "8", "0"),
//               endDate: new Date("2023", "6", "11", "9", "30"),
//             },
//             {
//               title: "Workshop",
//               type: CalendarDayType.Type05,
//               startDate: new Date("2023", "6", "11", "8", "30"),
//               endDate: new Date("2023", "6", "11", "12", "0"),
//             },
//             {
//               title: "Team collaboration",
//               type: CalendarDayType.Type01,
//               startDate: new Date("2023", "6", "12", "4", "0"),
//               endDate: new Date("2023", "6", "12", "12", "30"),
//             },
//             {
//               title: "Out of the office",
//               type: CalendarDayType.Type05,
//               startDate: new Date("2023", "6", "12", "15", "0"),
//               endDate: new Date("2023", "6", "12", "19", "30"),
//             },
//             {
//               title: "Working out of the building",
//               type: CalendarDayType.Type05,
//               startDate: new Date("2023", "6", "12", "20", "0"),
//               endDate: new Date("2023", "6", "12", "21", "30"),
//             },
//             {
//               title: "Vacation",
//               type: CalendarDayType.Type09,
//               text: "out of office",
//               startDate: new Date("2023", "6", "11", "12", "0"),
//               endDate: new Date("2023", "6", "13", "14", "0"),
//             },
//             {
//               title: "Reminder",
//               type: CalendarDayType.Type09,
//               startDate: new Date("2023", "6", "12", "00", "00"),
//               endDate: new Date("2023", "6", "13", "00", "00"),
//             },
//             {
//               title: "Team collaboration",
//               type: CalendarDayType.Type01,
//               startDate: new Date("2023", "6", "6", "00", "00"),
//               endDate: new Date("2023", "6", "16", "00", "00"),
//             },
//             {
//               title: "Workshop out of the country",
//               type: CalendarDayType.Type05,
//               startDate: new Date("2023", "6", "14", "00", "00"),
//               endDate: new Date("2023", "6", "20", "00", "00"),
//             },
//             {
//               title: "Payment reminder",
//               type: CalendarDayType.Type09,
//               startDate: new Date("2023", "6", "7", "00", "00"),
//               endDate: new Date("2023", "6", "8", "00", "00"),
//             },
//             {
//               title: "Meeting with the manager",
//               type: CalendarDayType.Type03,
//               startDate: new Date("2023", "6", "6", "9", "0"),
//               endDate: new Date("2023", "6", "6", "10", "0"),
//             },
//             {
//               title: "Daily standup meeting",
//               type: CalendarDayType.Type01,
//               startDate: new Date("2023", "6", "7", "10", "0"),
//               endDate: new Date("2023", "6", "7", "10", "30"),
//             },
//             {
//               title: "Private meeting",
//               type: CalendarDayType.Type03,
//               startDate: new Date("2023", "6", "6", "11", "30"),
//               endDate: new Date("2023", "6", "6", "12", "0"),
//             },
//             {
//               title: "Lunch",
//               type: CalendarDayType.Type05,
//               startDate: new Date("2023", "6", "6", "12", "0"),
//               endDate: new Date("2023", "6", "6", "13", "0"),
//             },
//             {
//               title: "Discussion of the plan",
//               type: CalendarDayType.Type01,
//               startDate: new Date("2023", "6", "16", "11", "0"),
//               endDate: new Date("2023", "6", "16", "12", "0"),
//             },
//             {
//               title: "Lunch",
//               text: "canteen",
//               type: CalendarDayType.Type05,
//               startDate: new Date("2023", "6", "16", "12", "0"),
//               endDate: new Date("2023", "6", "16", "13", "0"),
//             },
//             {
//               title: "Team meeting",
//               text: "room 200",
//               type: CalendarDayType.Type01,
//               icon: "sap-icon://meeting-room",
//               startDate: new Date("2023", "6", "16", "16", "0"),
//               endDate: new Date("2023", "6", "16", "17", "0"),
//             },
//             {
//               title: "Discussion with clients",
//               text: "Online meeting",
//               type: CalendarDayType.Type08,
//               icon: "sap-icon://home",
//               startDate: new Date("2023", "6", "17", "15", "30"),
//               endDate: new Date("2023", "6", "17", "16", "30"),
//             },
//           ],
//           supportedAppointmentItems: [
//             {
//               text: "Team Meeting",
//               type: CalendarDayType.Type01,
//             },
//             {
//               text: "Personal",
//               type: CalendarDayType.Type05,
//             },
//             {
//               text: "Discussions",
//               type: CalendarDayType.Type08,
//             },
//             {
//               text: "Out of office",
//               type: CalendarDayType.Type09,
//             },
//             {
//               text: "Private meeting",
//               type: CalendarDayType.Type03,
//             },
//           ],
//         });

//         this.getView().setModel(oModel);

//         // oModel = new JSONModel();
//         // oModel.setData({ allDay: false });
//         // this.getView().setModel(oModel, "allDay");

//         // oModel = new JSONModel();
//         // oModel.setData({

//         //   enableAppointmentsDragAndDrop: true,
//         //   enableAppointmentsResize: true,
//         //   enableAppointmentsCreate: true,
//         // });
//         // this.getView().setModel(oModel, "settings");

//         // var oModel = new JSONModel();
//         // this.getView().setModel(oModel);
//         // // combinedStartDate와 combinedEndDate 값을 설정
//         // var combinedStartDate = this.getStartDate("/SCHAPTSet");
//         // var combinedEndDate = this.getEndDate("/SCHAPTSet");
//         // oModel.setProperty("/SCHAPTSet", combinedStartDate);
//         // oModel.setProperty("/SCHAPTSet", combinedEndDate);
//       },

//       // formatDate: function (date) {
//       //   var oDateFormat = DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
//       //   return oDateFormat.format(date);
//       // },
//       // formatEndDate: function (date) {
//       //   var oDateFormat = new DateType({
//       //     pattern: "yyyy-MM-dd",
//       //   });
//       //   var endDate = new Date(date);
//       //   endDate.setDate(endDate.getDate() + 1);
//       //   return oDateFormat.formatValue(endDate, "string");
//       // },
//       //   getStartDate: function (schaptSet) {
//       //     var oModel = this.getView().getModel();
//       //     var aSchaptSet = oModel.getProperty(schaptSet);
//       //     var selectedPrdonum = this.getView()
//       //       .getModel()
//       //       .getProperty("/selectedPrdonum");
//       //     var aFilteredSet = aSchaptSet.filter(function (item) {
//       //       return item.Prdonum === selectedPrdonum;
//       //     });
//       //     var aSortedDates = aFilteredSet
//       //       .map(function (item) {
//       //         return new Date(item.Schdate);
//       //       })
//       //       .sort(function (a, b) {
//       //         return a - b;
//       //       });

//       //     var combinedStartDate = null;
//       //     if (aSortedDates.length > 0) {
//       //       var earliestDate = aSortedDates[0];
//       //       var earliestTime = aFilteredSet.find(function (item) {
//       //         return new Date(item.Schdate).getTime() === earliestDate.getTime();
//       //       }).Sctime;
//       //       combinedStartDate = new Date(
//       //         earliestDate.getFullYear(),
//       //         earliestDate.getMonth(),
//       //         earliestDate.getDate(),
//       //         earliestTime.getHours(),
//       //         earliestTime.getMinutes()
//       //       );
//       //     }

//       //     return combinedStartDate;
//       //   },

//       //   getEndDate: function (schaptSet) {
//       //     var oModel = this.getView().getModel();
//       //     var aSchaptSet = oModel.getProperty(schaptSet);
//       //     var selectedPrdonum = this.getView()
//       //       .getModel()
//       //       .getProperty("/selectedPrdonum");
//       //     var aFilteredSet = aSchaptSet.filter(function (item) {
//       //       return item.Prdonum === selectedPrdonum;
//       //     });
//       //     var aSortedDates = aFilteredSet
//       //       .map(function (item) {
//       //         return new Date(item.Schdate);
//       //       })
//       //       .sort(function (a, b) {
//       //         return a - b;
//       //       });

//       //     var combinedEndDate = null;
//       //     if (aSortedDates.length > 0) {
//       //       var latestDate = aSortedDates[aSortedDates.length - 1];
//       //       var latestTime = aFilteredSet.find(function (item) {
//       //         return new Date(item.Schdate).getTime() === latestDate.getTime();
//       //       }).Ectime;
//       //       combinedEndDate = new Date(
//       //         latestDate.getFullYear(),
//       //         latestDate.getMonth(),
//       //         latestDate.getDate(),
//       //         latestTime.getHours(),
//       //         latestTime.getMinutes()
//       //       );
//       //     }

//       //     return combinedEndDate;
//       //   },
//     });
//   }
// );

sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/Filter",
    "sap/ui/unified/library",
    "sap/ui/model/json/JSONModel",
  ],
  function (Controller, DateFormat, Filter, unifiedLibrary, JSONModel) {
    "use strict";
    var CalendarDayType = unifiedLibrary.CalendarDayType;

    return Controller.extend("zezoui5r06.controller.Main", {
      onInit: function () {
        var oModel = new JSONModel();
        oModel.setData({
          appointments: [
            {
              title: "코딩 안되는 날",
              type: CalendarDayType.Type05,
              startDate: new Date("2023", "6", "8", "5", "0"),
              endDate: new Date("2023", "6", "8", "6", "0"),
            },
            {
              title: "진짜 안되는 날",
              type: CalendarDayType.Type01,
              startDate: new Date("2023", "6", "8", "6", "0"),
              endDate: new Date("2023", "6", "8", "7", "9"),
            },
            {
              title: "집가고 싶은 날",
              text: "canteen",
              type: CalendarDayType.Type05,
              startDate: new Date("2023", "6", "8", "7", "0"),
              endDate: new Date("2023", "6", "8", "8", "0"),
            },
            {
              title: "조퇴하고 싶은 날",
              text: "room 105",
              type: CalendarDayType.Type01,
              icon: "sap-icon://meeting-room",
              startDate: new Date("2023", "6", "8", "8", "0"),
              endDate: new Date("2023", "6", "8", "9", "0"),
            },
            {
              title: "놀러가고 싶은 날",
              text: "Regular",
              type: CalendarDayType.Type01,
              icon: "sap-icon://home",
              startDate: new Date("2023", "6", "8", "9", "9"),
              endDate: new Date("2023", "6", "8", "10", "0"),
            },
            {
              title: "술 마시고 싶은 날",
              text: "room 234 and Online meeting",
              type: CalendarDayType.Type08,
              icon: "sap-icon://home",
              startDate: new Date("2023", "6", "8", "10", "0"),
              endDate: new Date("2023", "6", "8", "11", "30"),
            },
            {
              title: "늦잠 자고 싶은 날",
              text: "Online meeting with partners and colleagues",
              type: CalendarDayType.Type01,
              icon: "sap-icon://home",
              tentative: true,
              startDate: new Date("2023", "6", "8", "11", "30"),
              endDate: new Date("2023", "6", "8", "13", "00"),
            },
            {
              title: "Discussion with clients",
              type: CalendarDayType.Type08,
              icon: "sap-icon://home",
              startDate: new Date("2023", "6", "8", "12", "30"),
              endDate: new Date("2023", "6", "8", "13", "15"),
            },
            {
              title: "Meeting with the manager",
              type: CalendarDayType.Type03,
              startDate: new Date("2023", "6", "8", "13", "9"),
              endDate: new Date("2023", "6", "8", "13", "9"),
            },
            {
              title: "Meeting with the HR",
              type: CalendarDayType.Type03,
              startDate: new Date("2023", "6", "8", "14", "0"),
              endDate: new Date("2023", "6", "8", "14", "15"),
            },
            {
              title: "Call with customer",
              type: CalendarDayType.Type08,
              startDate: new Date("2023", "6", "8", "14", "15"),
              endDate: new Date("2023", "6", "8", "14", "30"),
            },
            {
              title: "Prepare documentation",
              text: "At my desk",
              icon: "sap-icon://meeting-room",
              type: CalendarDayType.Type03,
              startDate: new Date("2023", "6", "8", "14", "10"),
              endDate: new Date("2023", "6", "8", "15", "30"),
            },
            {
              title: "Meeting with the manager",
              type: CalendarDayType.Type03,
              startDate: new Date("2023", "6", "9", "6", "30"),
              endDate: new Date("2023", "6", "9", "7", "0"),
            },
            {
              title: "Lunch",
              type: CalendarDayType.Type05,
              startDate: new Date("2023", "6", "9", "7", "0"),
              endDate: new Date("2023", "6", "9", "8", "0"),
            },
            {
              title: "Team meeting",
              text: "online",
              type: CalendarDayType.Type01,
              startDate: new Date("2023", "6", "9", "8", "0"),
              endDate: new Date("2023", "6", "9", "9", "0"),
            },
            {
              title: "Discussion with clients for the new release dates",
              text: "Online meeting",
              type: CalendarDayType.Type08,
              startDate: new Date("2023", "6", "9", "9", "0"),
              endDate: new Date("2023", "6", "9", "10", "0"),
            },
            {
              title: "Team meeting",
              text: "room 5",
              type: CalendarDayType.Type01,
              startDate: new Date("2023", "6", "9", "11", "0"),
              endDate: new Date("2023", "6", "9", "14", "0"),
            },
            {
              title: "Daily standup meeting",
              type: CalendarDayType.Type01,
              startDate: new Date("2023", "6", "9", "9", "0"),
              endDate: new Date("2023", "6", "9", "9", "15", "0"),
            },
            {
              title: "Private meeting",
              type: CalendarDayType.Type03,
              startDate: new Date("2023", "6", "11", "9", "9"),
              endDate: new Date("2023", "6", "11", "9", "20"),
            },
            {
              title: "Private meeting",
              type: CalendarDayType.Type03,
              startDate: new Date("2023", "6", "10", "6", "0"),
              endDate: new Date("2023", "6", "10", "7", "0"),
            },
            {
              title: "Meeting with the manager",
              type: CalendarDayType.Type03,
              startDate: new Date("2023", "6", "10", "15", "0"),
              endDate: new Date("2023", "6", "10", "15", "30"),
            },
            {
              title: "Meet John Doe",
              type: CalendarDayType.Type05,
              icon: "sap-icon://home",
              startDate: new Date("2023", "6", "11", "7", "0"),
              endDate: new Date("2023", "6", "11", "7", "30"),
            },
            {
              title: "Team meeting",
              text: "online",
              type: CalendarDayType.Type01,
              startDate: new Date("2023", "6", "11", "8", "0"),
              endDate: new Date("2023", "6", "11", "9", "30"),
            },
            {
              title: "Workshop",
              type: CalendarDayType.Type05,
              startDate: new Date("2023", "6", "11", "8", "30"),
              endDate: new Date("2023", "6", "11", "12", "0"),
            },
            {
              title: "Team collaboration",
              type: CalendarDayType.Type01,
              startDate: new Date("2023", "6", "12", "4", "0"),
              endDate: new Date("2023", "6", "12", "12", "30"),
            },
            {
              title: "Out of the office",
              type: CalendarDayType.Type05,
              startDate: new Date("2023", "6", "12", "15", "0"),
              endDate: new Date("2023", "6", "12", "19", "30"),
            },
            {
              title: "Working out of the building",
              type: CalendarDayType.Type05,
              startDate: new Date("2023", "6", "12", "20", "0"),
              endDate: new Date("2023", "6", "12", "21", "30"),
            },
            {
              title: "Vacation",
              type: CalendarDayType.Type09,
              text: "out of office",
              startDate: new Date("2023", "6", "11", "12", "0"),
              endDate: new Date("2023", "6", "13", "14", "0"),
            },
            {
              title: "Reminder",
              type: CalendarDayType.Type09,
              startDate: new Date("2023", "6", "12", "00", "00"),
              endDate: new Date("2023", "6", "13", "00", "00"),
            },
            {
              title: "Team collaboration",
              type: CalendarDayType.Type01,
              startDate: new Date("2023", "6", "6", "00", "00"),
              endDate: new Date("2023", "6", "16", "00", "00"),
            },
            {
              title: "Workshop out of the country",
              type: CalendarDayType.Type05,
              startDate: new Date("2023", "6", "14", "00", "00"),
              endDate: new Date("2023", "6", "20", "00", "00"),
            },
            {
              title: "Payment reminder",
              type: CalendarDayType.Type09,
              startDate: new Date("2023", "6", "7", "00", "00"),
              endDate: new Date("2023", "6", "8", "00", "00"),
            },
            {
              title: "Meeting with the manager",
              type: CalendarDayType.Type03,
              startDate: new Date("2023", "6", "6", "9", "0"),
              endDate: new Date("2023", "6", "6", "10", "0"),
            },
            {
              title: "Daily standup meeting",
              type: CalendarDayType.Type01,
              startDate: new Date("2023", "6", "7", "10", "0"),
              endDate: new Date("2023", "6", "7", "10", "30"),
            },
            {
              title: "Private meeting",
              type: CalendarDayType.Type03,
              startDate: new Date("2023", "6", "6", "11", "30"),
              endDate: new Date("2023", "6", "6", "12", "0"),
            },
            {
              title: "Lunch",
              type: CalendarDayType.Type05,
              startDate: new Date("2023", "6", "6", "12", "0"),
              endDate: new Date("2023", "6", "6", "13", "0"),
            },
            {
              title: "Discussion of the plan",
              type: CalendarDayType.Type01,
              startDate: new Date("2023", "6", "16", "11", "0"),
              endDate: new Date("2023", "6", "16", "12", "0"),
            },
            {
              title: "Lunch",
              text: "canteen",
              type: CalendarDayType.Type05,
              startDate: new Date("2023", "6", "16", "12", "0"),
              endDate: new Date("2023", "6", "16", "13", "0"),
            },
            {
              title: "Team meeting",
              text: "room 200",
              type: CalendarDayType.Type01,
              icon: "sap-icon://meeting-room",
              startDate: new Date("2023", "6", "16", "16", "0"),
              endDate: new Date("2023", "6", "16", "17", "0"),
            },
            {
              title: "Discussion with clients",
              text: "Online meeting",
              type: CalendarDayType.Type08,
              icon: "sap-icon://home",
              startDate: new Date("2023", "6", "17", "15", "30"),
              endDate: new Date("2023", "6", "17", "16", "30"),
            },
          ],
          supportedAppointmentItems: [
            {
              text: "Team Meeting",
              type: CalendarDayType.Type01,
            },
            {
              text: "Personal",
              type: CalendarDayType.Type05,
            },
            {
              text: "Discussions",
              type: CalendarDayType.Type08,
            },
            {
              text: "Out of office",
              type: CalendarDayType.Type09,
            },
            {
              text: "Private meeting",
              type: CalendarDayType.Type03,
            },
          ],
        });

        this.getView().setModel(oModel);
      },
    });
  }
);
