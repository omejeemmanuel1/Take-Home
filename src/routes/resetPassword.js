"use strict";
exports.__esModule = true;
var express_1 = require("express");
var resetPassword_1 = require("../controller/resetPassword");
var router = express_1["default"].Router();
router.post('/forgot-password', resetPassword_1.genOtp);
router.post('/verify-otp', resetPassword_1.otpVerification);
router.post('/reset-password', resetPassword_1.resetPassword);
exports["default"] = router;
