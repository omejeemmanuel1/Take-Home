"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var getAllGroups = require('../controller/group');
router.get('/all', getAllGroups);
module.exports = router;
