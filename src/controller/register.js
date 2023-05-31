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
exports.verifyOTP = exports.register = void 0;
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var registerModel_1 = require("../model/registerModel");
var uuid_1 = require("uuid");
var resetPassword_1 = require("../utils/resetPassword");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, mentalCondition, country, state, gender, password, confirmPassword, userExist, encryptedPassword, _b, otp, otp_expiry, newUser, token, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, mentalCondition = _a.mentalCondition, country = _a.country, state = _a.state, gender = _a.gender, password = _a.password, confirmPassword = _a.confirmPassword;
                if (password !== confirmPassword) {
                    return [2 /*return*/, res.status(404).send('Password does not match')];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, registerModel_1["default"].findOne({ where: { email: email } })];
            case 2:
                userExist = _c.sent();
                if (userExist) {
                    return [2 /*return*/, res.status(404).send('This User already exists')];
                }
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, 10)];
            case 3:
                encryptedPassword = _c.sent();
                _b = (0, resetPassword_1.generateOtp)(), otp = _b.otp, otp_expiry = _b.otp_expiry;
                return [4 /*yield*/, registerModel_1["default"].create({
                        id: (0, uuid_1.v4)(),
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        mentalCondition: mentalCondition,
                        country: country,
                        state: state,
                        gender: gender,
                        password: encryptedPassword,
                        otp: otp,
                        otp_expiry: otp_expiry,
                        verify: false,
                        blocked: []
                    })];
            case 4:
                newUser = _c.sent();
                token = jsonwebtoken_1["default"].sign({ id: newUser.id, email: email }, process.env.JWT_SECRET_KEY || 'SECRET-KEY', {
                    expiresIn: '7d'
                });
                return [4 /*yield*/, (0, resetPassword_1.sendVerificationOTP)(newUser.email, newUser.otp)];
            case 5:
                _c.sent();
                return [2 /*return*/, res.status(201).json({
                        userDetails: newUser
                    })];
            case 6:
                err_1 = _c.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).send('An error occurred, please try again')];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var verifyOTP = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var otp, user, currentTime, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                otp = req.body.otp;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, registerModel_1["default"].findOne({ where: { otp: otp } })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ Error: 'User not found' })];
                }
                if (user.verify) {
                    return [2 /*return*/, res.status(400).json({ Error: 'User already verified' })];
                }
                currentTime = new Date();
                if (currentTime > user.otp_expiry) {
                    return [2 /*return*/, res.status(400).json({ Error: 'OTP has expired' })];
                }
                // Update user verification status
                user.verify = true;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'OTP verified successfully' })];
            case 4:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).json({ Error: 'An error occurred, please try again' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.verifyOTP = verifyOTP;
