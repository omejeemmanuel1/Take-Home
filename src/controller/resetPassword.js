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
exports.resetPassword = exports.otpVerification = exports.genOtp = void 0;
var registerModel_1 = require("../model/registerModel");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcryptjs_1 = require("bcryptjs");
var resetPassword_1 = require("../utils/resetPassword");
var genOtp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, _a, otp, otp_expiry, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = req.body.email;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, registerModel_1["default"].findOne({ where: { email: email } })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            message: 'Invalid user, kindly register first'
                        })];
                }
                _a = (0, resetPassword_1.generateOtp)(), otp = _a.otp, otp_expiry = _a.otp_expiry;
                return [4 /*yield*/, (0, resetPassword_1.generatePasswordResetToken)(email, res)];
            case 3:
                token = _b.sent();
                return [4 /*yield*/, (0, resetPassword_1.sendResetPasswordOTP)(email, otp)];
            case 4:
                _b.sent();
                // Update user's OTP and OTP expiry
                user.otp = otp;
                user.otp_expiry = otp_expiry;
                return [4 /*yield*/, user.save()];
            case 5:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: 'OTP sent successfully', token: token, otp: otp })];
            case 6:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.genOtp = genOtp;
//   export const otpVerification = async (req: Request, res: Response) => {
//     const { otp } = req.body;
//     try {
//       const token = req.cookies.token;
//       if (!token) {
//         return res.status(400).json({ error: 'Token not found' });
//       }
//       const isValidToken = validatePasswordResetToken(token);
//       if (!isValidToken) {
//         return res.status(400).json({ error: 'Invalid or expired token' });
//       }
//       const decodedToken: any = jwt.decode(token);
//       const { email } = decodedToken;
//       const user = await User.findOne({ where: { email } });
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       if (otp !== user.otp) {
//         return res.status(400).json({ error: 'Invalid OTP' });
//       }
//       // Check if OTP has expired
//       const currentTime = new Date();
//       if (currentTime > user.otp_expiry) {
//         return res.status(400).json({ error: 'OTP has expired' });
//       }
//       return res.status(200).json({
//         message: 'OTP verified successfully',
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
var otpVerification = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var otp, user, currentTime, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                otp = req.body.otp;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, registerModel_1["default"].findOne({ where: { otp: otp } })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: 'User not found' })];
                }
                currentTime = new Date();
                if (currentTime > user.otp_expiry) {
                    return [2 /*return*/, res.status(400).json({ error: 'OTP has expired' })];
                }
                return [2 /*return*/, res.status(200).json({
                        message: 'OTP verified successfully'
                    })];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.otpVerification = otpVerification;
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, newPassword, confirmPassword, token, isValidToken, decodedToken, email, user, hashedPassword, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, newPassword = _a.newPassword, confirmPassword = _a.confirmPassword;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                token = req.cookies.token;
                if (!token) {
                    return [2 /*return*/, res.status(400).json({ error: 'Token not found' })];
                }
                isValidToken = (0, resetPassword_1.validatePasswordResetToken)(token);
                if (!isValidToken) {
                    return [2 /*return*/, res.status(400).json({ error: 'Invalid or expired token' })];
                }
                decodedToken = jsonwebtoken_1["default"].decode(token);
                email = decodedToken.email;
                return [4 /*yield*/, registerModel_1["default"].findOne({ where: { email: email } })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: 'User not found' })];
                }
                if (newPassword !== confirmPassword) {
                    return [2 /*return*/, res.status(400).json({ error: 'Passwords must match' })];
                }
                return [4 /*yield*/, bcryptjs_1["default"].hash(newPassword, 8)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, user.update({ password: hashedPassword })];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: 'Password reset successfully'
                    })];
            case 5:
                error_3 = _b.sent();
                console.error(error_3);
                return [2 /*return*/, res.status(500).json({ error: 'Internal server error' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
