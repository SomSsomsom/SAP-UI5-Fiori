sap.ui.define(
  [
    "sap/ui/core/Fragment",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/json/JSONModel",
    "sap/ui/unified/library",
    "sap/m/library",
    "sap/m/MessageToast",
  ],
  function (
    Fragment,
    Controller,
    DateFormat,
    JSONModel,
    unifiedLibrary,
    mobileLibrary,
    MessageToast
  ) {
    "use strict";

    var CalendarDayType = unifiedLibrary.CalendarDayType;
    // var ValueState = coreLibrary.ValueState;
    var StickyMode = mobileLibrary.PlanningCalendarStickyMode;

    return Controller.extend("zezoui5r0601.controller.Main", {
      onInit: function () {
        // 1. 샘플 그대로 우리 화면에 띄워보기
        //         // 2. json data 구조 파악
        //         // 3. odata 데이터 가져와서 가공. => 다시..

        var that = this;
        this.getOwnerComponent()
          .getModel("sch")
          .read("/ZSCHD_E07_00", {
            success: function (oReturn) {
              console.log(oReturn);
              var arr = oReturn.results;

              // var arr2 = arr.map(function (item) {
              //   item.startDate = that.formatDateTime(item.Schdate, item.Stime);
              //   item.endDate = that.formatDateTime(item.Schdate, item.Etime);
              //   item.type = "Type01";
              //   item.icon = "sap-icon://legend";
              //   return item;
              // });
              var arr2 = arr.map(function (item) {
                item.startDate = that.formatDateTime(item.Schdate, item.Stime);
                item.endDate = that.formatDateTime(item.Schdate, item.Etime);

                if (item.Wccode === "1001") {
                  item.type = "Type01";
                  item.icon = "sap-icon://compare";
                } else if (item.Wccode === "1002") {
                  item.type = "Type05";
                  item.icon = "sap-icon://paint-bucket";
                } else if (item.Wccode === "1003") {
                  item.type = "Type08";
                  item.icon = "ap-icon://factory";
                } else if (item.Wccode === "1004") {
                  item.type = "Type09";
                  item.icon = "sap-icon://factory";
                } else if (item.Wccode === "1005") {
                  item.type = "Type03";
                  item.icon = "sap-icon://factory";
                } else {
                  item.type = "Type02";
                  item.icon = "sap-icon://supplier";
                }

                // item.icon = "sap-icon://legend";
                return item;
              });

              that.getView().setModel(new JSONModel(arr2), "sch_j");
              // debugger;
              // debugger 해서 받아오는 oReturn 값 확인
              // ...가공...
              // oModel.setData(가공한데이터);
            },
          });
        var oModel = new JSONModel();
        oModel.setData({
          startDate: new Date("2023", "7", "9"),
          appointments: [],
          supportedAppointmentItems: [
            {
              text: "1F-Weighing Room",
              type: CalendarDayType.Type01,
            },
            {
              text: "1F-Manufacturing Room",
              type: CalendarDayType.Type05,
            },
            {
              text: "1F-Filling/Assembly Room1",
              type: CalendarDayType.Type08,
            },
            {
              text: "1F-Filling/Assembly Room2",
              type: CalendarDayType.Type09,
            },
            {
              text: "1F-Filling/Assembly Room3",
              type: CalendarDayType.Type03,
            },
          ],
        });

        this.getView().setModel(oModel);

        oModel = new JSONModel();
        oModel.setData({ allDay: false });
        this.getView().setModel(oModel, "allDay");

        oModel = new JSONModel();
        oModel.setData({
          stickyMode: StickyMode.None,
          enableAppointmentsDragAndDrop: true,
          enableAppointmentsResize: true,
          enableAppointmentsCreate: true,
        });
        this.getView().setModel(oModel, "settings");
      },

      _typeFormatter: function (sType) {
        var sTypeText = "",
          aTypes = this.getView()
            .getModel()
            .getData().supportedAppointmentItems;

        for (var i = 0; i < aTypes.length; i++) {
          if (aTypes[i].type === sType) {
            sTypeText = aTypes[i].text;
          }
        }

        if (sTypeText !== "") {
          return sTypeText;
        } else {
          return sType;
        }
      },
      // formatLegendText: function (sType) {
      //   if (sType === "Non-Working Day") {
      //     return "Weekend";
      //   }
      //   return sType;
      // },

      // handleAppointmentDrop: function (oEvent) {
      //   var oAppointment = oEvent.getParameter("appointment"),
      //     oStartDate = oEvent.getParameter("startDate"),
      //     oEndDate = oEvent.getParameter("endDate"),
      //     bCopy = oEvent.getParameter("copy"),
      //     sAppointmentTitle = oAppointment.getTitle(),
      //     oModel = this.getView().getModel(),
      //     oNewAppointment;

      //   if (bCopy) {
      //     oNewAppointment = {
      //       title: sAppointmentTitle,
      //       icon: oAppointment.getIcon(),
      //       text: oAppointment.getText(),
      //       type: oAppointment.getType(),
      //       startDate: oStartDate,
      //       endDate: oEndDate,
      //     };
      //     oModel.getData().appointments.push(oNewAppointment);
      //     oModel.updateBindings();
      //   } else {
      //     oAppointment.setStartDate(oStartDate);
      //     oAppointment.setEndDate(oEndDate);
      //   }

      //   MessageToast.show(
      //     "Appointment with title \n'" +
      //       sAppointmentTitle +
      //       "'\n has been " +
      //       (bCopy ? "create" : "moved")
      //   );
      // },

      // handleAppointmentResize: function (oEvent) {
      //   var oAppointment = oEvent.getParameter("appointment"),
      //     oStartDate = oEvent.getParameter("startDate"),
      //     oEndDate = oEvent.getParameter("endDate"),
      //     sAppointmentTitle = oAppointment.getTitle();

      //   oAppointment.setStartDate(oStartDate);
      //   oAppointment.setEndDate(oEndDate);

      //   MessageToast.show(
      //     "Appointment with title \n'" +
      //       sAppointmentTitle +
      //       "'\n has been resized"
      //   );
      // },

      // handleAppointmentCreateDnD: function (oEvent) {
      //   var oStartDate = oEvent.getParameter("startDate"),
      //     oEndDate = oEvent.getParameter("endDate"),
      //     sAppointmentTitle = "New Appointment",
      //     oModel = this.getView().getModel(),
      //     oNewAppointment = {
      //       title: sAppointmentTitle,
      //       startDate: oStartDate,
      //       endDate: oEndDate,
      //     };

      //   oModel.getData().appointments.push(oNewAppointment);
      //   oModel.updateBindings();
      // },
      handleOpenDetailFragment: function (oAppointment) {
        var oSCHjsonModel = this.getView().getModel("sch_j");
        if (!this._pDetailsPopover) {
          this._pDetailsPopover = Fragment.load({
            id: this.getView().getId(),
            name: "zezoui5r0601.view.Details",
            controller: this,
          }).then(
            function (oResponsivePopover) {
              this.getView().addDependent(oResponsivePopover);
              return oResponsivePopover;
            }.bind(this)
          );
        }

        // this._pDetailsPopover.then(function (oResponsivePopover) {
        //   oResponsivePopover.setBindingContext(
        //     oAppointment.getBindingContext("sch_j")
        //   );
        //   oResponsivePopover.openBy(oAppointment);
        // });
        this._pDetailsPopover.then(function (oResponsivePopover) {
          var oBindingContext = oAppointment.getBindingContext("sch_j");
          if (oBindingContext) {
            var sPath = oAppointment.getBinding("title").getContext().getPath();
            var oItem = oSCHjsonModel.getProperty(sPath);
            oSCHjsonModel.setProperty("/Popover", oItem);

            // oResponsivePopover.setBindingContext(oBindingContext);
            oResponsivePopover.openBy(oAppointment);
            // debugger;
            // console.log(oAppointment);
            // console.log(oBindingContext);
            // console.log(oResposivePopover);
            // debugger;
          }
        });
      },

      handleAppointmentSelect: function (oEvent) {
        // var oAppointment = oEvent.getParameter("appointment"),
        //   oStartDate,
        //   oEndDate,
        //   oTrimmedStartDate,
        //   oTrimmedEndDate,
        //   bAllDate,
        //   oModel,
        //   oView = this.getView();
        // if (oAppointment === undefined) {
        //   return;
        // }
        // oStartDate = oAppointment.getStartDate();
        // oEndDate = oAppointment.getEndDate();
        // oTrimmedStartDate = new Date(oStartDate);
        // oTrimmedEndDate = new Date(oEndDate);
        // bAllDate = false;
        // oModel = this.getView().getModel("allDay");
        // if (!oAppointment.getSelected() && this._pDetailsPopover) {
        //   this._pDetailsPopover.then(function (oResponsivePopover) {
        //     oResponsivePopover.close();
        //   });
        //   return;
        // }
        // this._setHoursToZero(oTrimmedStartDate);
        // this._setHoursToZero(oTrimmedEndDate);
        // if (
        //   oStartDate.getTime() === oTrimmedStartDate.getTime() &&
        //   oEndDate.getTime() === oTrimmedEndDate.getTime()
        // ) {
        //   bAllDate = true;
        // }
        // oModel.getData().allDay = bAllDate;
        // oModel.updateBindings();
        // if (!this._pDetailsPopover) {
        //   this._pDetailsPopover = Fragment.load({
        //     id: oView.getId(),
        //     name: "zezoui5r0601.view.Details",
        //     controller: this,
        //   }).then(function (oResponsivePopover) {
        //     oView.addDependent(oResponsivePopover);
        //     return oResponsivePopover;
        //   });
        // }
        // this._pDetailsPopover.then(function (oResponsivePopover) {
        //   oResponsivePopover.setBindingContext(
        //     oAppointment.getBindingContext()
        //   );
        //   oResponsivePopover.openBy(oAppointment);
        // });
        var oAppointment = oEvent.getParameter("appointment");
        console.log(oAppointment);

        // this.byId("moreInfoText").setvalue(oAppointment.getTitle());
        if (oAppointment) {
          this.handleOpenDetailFragment(oAppointment);
        }
        console.log(oAppointment);
      },
      // handleAppointmentSelect: function (oEvent) {
      //   var oAppointment = oEvent.getParameter("appointment"),
      //     oStartDate,
      //     oEndDate,
      //     oTrimmedStartDate,
      //     oTrimmedEndDate,
      //     bAllDate,
      //     oModel,
      //     oView = this.getView();

      //   if (oAppointment === undefined) {
      //     return;
      //   }

      //   oStartDate = oAppointment.getStartDate();
      //   oEndDate = oAppointment.getEndDate();
      //   oTrimmedStartDate = new Date(oStartDate);
      //   oTrimmedEndDate = new Date(oEndDate);
      //   bAllDate = false;
      //   oModel = this.getView().getModel("sch_j");

      //   if (!oAppointment.getSelected() && this._pDetailsPopover) {
      //     this._pDetailsPopover.then(function (oResponsivePopover) {
      //       oResponsivePopover.close();
      //     });
      //     return;
      //   }

      //   this._setHoursToZero(oTrimmedStartDate);
      //   this._setHoursToZero(oTrimmedEndDate);

      //   if (
      //     oStartDate.getTime() === oTrimmedStartDate.getTime() &&
      //     oEndDate.getTime() === oTrimmedEndDate.getTime()
      //   ) {
      //     bAllDate = true;
      //   }

      //   oModel.getData() = bAllDate;
      //   oModel.updateBindings();

      //   if (!this._pDetailsPopover) {
      //     this._pDetailsPopover = Fragment.load({
      //       id: oView.getId(),
      //       name: "zezoui5r0601.view.Details",
      //       controller: this,
      //     }).then(function (oResponsivePopover) {
      //       oView.addDependent(oResponsivePopover);
      //       return oResponsivePopover;
      //     });
      //   }
      //   this._pDetailsPopover.then(function (oResponsivePopover) {
      //     oResponsivePopover.setBindingContext(
      //       oAppointment.getBindingContext()
      //     );
      //     oResponsivePopover.openBy(oAppointment);
      //   });
      // },

      handleMoreLinkPress: function (oEvent) {
        var oDate = oEvent.getParameter("date"),
          oSinglePlanningCalendar = this.getView().byId("SPC1");

        oSinglePlanningCalendar.setSelectedView(
          oSinglePlanningCalendar.getViews()[2]
        ); // DayView

        this.getView().getModel().setData({ startDate: oDate }, true);
      },
      onCloseButtonPress: function () {
        var oDetailsPopover = this.byId("detailsPopover");
        oDetailsPopover.close();
      },
      formatDateTime: function (date, time) {
        var oDate = new Date(date),
          oTime = new Date(time.ms);
        var year = oDate.getFullYear(),
          month = oDate.getMonth(),
          day = oDate.getDate(),
          hour = oTime.getHours() - 9,
          minutes = oTime.getMinutes(),
          seconds = oTime.getSeconds();

        if (hour < 0) {
          hour = hour + 24;
          day = day;
        }

        var oDate = new Date(year, month, day, hour, minutes, seconds);
        // var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
        //   pattern: "yyyy-MM-dd",
        // });
        // var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
        //   pattern: "HH:mm:ss",
        // });
        // var formattedDate = dateFormat.format(date);
        // var formattedTime = timeFormat.format(time);
        // var oDate = new Date(formattedDate + " " + formattedTime);
        return oDate;
      },

      formatDate: function (oDate) {
        if (oDate) {
          var iHours = oDate.getHours(),
            iMinutes = oDate.getMinutes(),
            iSeconds = oDate.getSeconds();

          if (iHours !== 0 || iMinutes !== 0 || iSeconds !== 0) {
            return DateFormat.getDateTimeInstance({
              style: "medium",
            }).format(oDate);
          } else {
            return DateFormat.getDateInstance({ style: "medium" }).format(
              oDate
            );
          }
        }
      },

      // _getDefaultAppointmentStartHour: function () {
      //   return 9;
      // },

      // _getDefaultAppointmentEndHour: function () {
      //   return 10;
      // },

      // _setHoursToZero: function (oDate) {
      //   oDate.setHours(0, 0, 0, 0);
      // },

      handleStartDateChange: function (oEvent) {
        var oStartDate = oEvent.getParameter("date");
        MessageToast.show(
          "'startDateChange' event fired.\n\nNew start date is " +
            oStartDate.toString()
        );
      },

      handleOpenLegend: function (oEvent) {
        var oSource = oEvent.getSource(),
          oView = this.getView();

        if (!this._pLegendPopover) {
          this._pLegendPopover = Fragment.load({
            id: oView.getId(),
            name: "zezoui5r0601.view.Legend",
            controller: this,
          }).then(function (oLegendPopover) {
            oView.addDependent(oLegendPopover);
            return oLegendPopover;
          });
        }

        this._pLegendPopover.then(function (oLegendPopover) {
          if (oLegendPopover.isOpen()) {
            oLegendPopover.close();
          } else {
            oLegendPopover.openBy(oSource);
          }
        });
      },

      handleSelectionChange: function (oEvent) {
        var changedItem = oEvent.getParameter("changedItem");
        var isSelected = oEvent.getParameter("selected");

        var state = "Selected";
        if (!isSelected) {
          state = "Deselected";
        }

        MessageToast.show(
          "Event 'selectionChange': " +
            state +
            " '" +
            changedItem.getText() +
            "'",
          {
            width: "auto",
          }
        );
      },

      // handleHeaderDateSelect: function (oEvent) {
      //   var selectedDate = oEvent.getSource().getStartDate();
      //   var oCalendar = that.getView().byId("SPC1");
      //   oCalendar.setViewKey("DayView");
      //   oCalendar.setStartDate(selectedDate);
      //   oCalendar.fireStartDateChange({ startDate: selectedDate });
      // },
    });
  }
);
