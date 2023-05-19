/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"exprogram_e07/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
