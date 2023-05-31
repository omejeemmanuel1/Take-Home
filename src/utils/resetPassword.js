"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.validatePasswordResetToken = exports.generatePasswordResetToken = exports.sendResetPasswordOTP = exports.sendVerificationOTP = exports.generateOtp = void 0;
var nodemailer_1 = require("nodemailer");
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var generateOtp = function () {
    var otp = Math.floor(1000 + Math.random() * 9000);
    var otp_expiry = new Date();
    otp_expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp: otp, otp_expiry: otp_expiry };
};
exports.generateOtp = generateOtp;
var sendVerificationOTP = function (email, otp) { return __awaiter(void 0, void 0, void 0, function () {
    var transporter, mailOptions, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                transporter = nodemailer_1["default"].createTransport({
                    host: process.env.smtp_host,
                    port: 587,
                    auth: {
                        user: process.env.sendinblue_user,
                        pass: process.env.sendinblue_pass
                    }
                });
                mailOptions = {
                    from: 'Mind-Connect <noreply@mindconnect-mails.com>',
                    to: email,
                    subject: 'Account Verification OTP',
                    html: "\n        <p>Your OTP to verify your account is:</p>\n        <h1>".concat(otp, "</h1>\n        <p>Please enter this OTP to verify your account.</p>\n        <p>Note that the OTP is only valid for 30 minutes.</p>\n      ")
                };
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                throw new Error('Error sending account verification OTP');
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendVerificationOTP = sendVerificationOTP;
var sendResetPasswordOTP = function (email, otp) { return __awaiter(void 0, void 0, void 0, function () {
    var transporter, mailOptions, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                transporter = nodemailer_1["default"].createTransport({
                    host: process.env.smtp_host,
                    port: 587,
                    auth: {
                        user: process.env.sendinblue_user,
                        pass: process.env.sendinblue_pass
                    }
                });
                mailOptions = {
                    from: 'Mind-Connect <noreply@mindconnect-mails.com>',
                    to: email,
                    subject: 'Password Reset OTP',
                    html: "\n        <p>Your OTP to reset your password is:</p>\n        <h1>".concat(otp, "</h1>\n        <p>Please enter this OTP to reset your password.</p>\n        <p>Note that this OTP is valid for 30 minutes.</p>\n        <p>If you did not make this request, kindly ignore this email.</p>\n      ")
                };
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                throw new Error('Error sending password reset OTP');
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendResetPasswordOTP = sendResetPasswordOTP;
var generatePasswordResetToken = function (email, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, token;
    return __generator(this, function (_a) {
        payload = {
            email: email
        };
        try {
            token = jsonwebtoken_1["default"].sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '30min' });
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 30 * 60 * 1000
            });
            return [2 /*return*/, token];
        }
        catch (error) {
            console.error(error);
            throw new Error('Error generating password reset token');
        }
        return [2 /*return*/];
    });
}); };
exports.generatePasswordResetToken = generatePasswordResetToken;
var validatePasswordResetToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedToken, otp_expiry;
    return __generator(this, function (_a) {
        try {
            decodedToken = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET_KEY);
            otp_expiry = new Date(decodedToken.otp_expiry);
            if (otp_expiry.getTime() < new Date().getTime()) {
                return [2 /*return*/, false];
            }
            return [2 /*return*/, true];
        }
        catch (error) {
            console.error(error);
            return [2 /*return*/, false];
        }
        return [2 /*return*/];
    });
}); };
exports.validatePasswordResetToken = validatePasswordResetToken;
