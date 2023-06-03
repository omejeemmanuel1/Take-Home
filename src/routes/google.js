"use strict";
exports.__esModule = true;
var express_1 = require("express");
var googleAuth_1 = require("../controller/googleAuth");
var googleauth_1 = require("../utils/googleauth");
var router = express_1["default"].Router();
router.get("/google/url", function (req, res) {
    res.redirect("".concat((0, googleauth_1.getGoogleAuthURL)()));
});
router.get("/google", googleAuth_1.googleSignIn);
exports["default"] = router;
