/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zezoui5r06_01/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
