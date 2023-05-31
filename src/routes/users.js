"use strict";
exports.__esModule = true;
var express_1 = require("express");
var login_1 = require("../controller/login");
var router = express_1["default"].Router();
/* GET users listing. */
router.get('/test', function (req, res, next) {
    res.status(200).send({ msg: "Users Working well" });
});
router.post('/login', login_1.Login);
exports["default"] = router;
