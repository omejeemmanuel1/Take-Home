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
exports.googleSignIn = void 0;
var axios_1 = require("axios");
var jsonwebtoken_1 = require("jsonwebtoken");
var googleauth_1 = require("../utils/googleauth");
var registerModel_1 = require("../model/registerModel");
var GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
var port = 4000;
var JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
var googleSignIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, _a, id_token, access_token, googleUser, user, newUser, token_1, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                code = req.query.code;
                return [4 /*yield*/, (0, googleauth_1.getTokens)({
                        code: code,
                        clientId: GOOGLE_CLIENT_ID,
                        clientSecret: GOOGLE_CLIENT_SECRET,
                        redirectUri: "http://localhost:".concat(port, "/auth/google")
                    })];
            case 1:
                _a = _b.sent(), id_token = _a.id_token, access_token = _a.access_token;
                return [4 /*yield*/, axios_1["default"]
                        .get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=".concat(access_token), {
                        headers: {
                            Authorization: "Bearer ".concat(id_token)
                        }
                    })
                        .then(function (res) { return res.data; })["catch"](function (error) {
                        console.error("Failed to fetch user");
                        throw new Error(error.message);
                    })];
            case 2:
                googleUser = _b.sent();
                return [4 /*yield*/, registerModel_1["default"].findOne({ where: { email: googleUser.email } })];
            case 3:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 5];
                return [4 /*yield*/, registerModel_1["default"].create({
                        id: googleUser.id,
                        firstName: googleUser.given_name,
                        lastName: googleUser.family_name,
                        email: googleUser.email,
                        mentalCondition: "",
                        country: "",
                        state: "",
                        password: "",
                        gender: "",
                        otp: null,
                        otp_expiry: null,
                        blocked: []
                        // verify: true
                    })];
            case 4:
                newUser = _b.sent();
                token_1 = jsonwebtoken_1["default"].sign({ id: newUser.id }, JWT_SECRET_KEY, { expiresIn: '30d' });
                res.cookie('token', token_1, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                //  return res.status(200).json({ message: 'User registered successfully' });
                res.redirect("http://localhost:5173");
                _b.label = 5;
            case 5:
                token = jsonwebtoken_1["default"].sign({ id: user === null || user === void 0 ? void 0 : user.id }, JWT_SECRET_KEY, { expiresIn: '30d' });
                res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                //  return res.status(200).json({ message: 'User already in database' });
                res.redirect("http://localhost:5173");
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ Error: 'Internal Server Error' })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.googleSignIn = googleSignIn;
