/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zezoui5c03/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
