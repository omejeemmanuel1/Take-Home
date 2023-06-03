"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var uuidv4 = require('uuid').v4;
var groupModel_1 = require("../model/groupModel");
var getAllGroups = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var group, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, groupModel_1["default"].findAll()];
            case 1:
                group = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: ' All group have been successfully fetch',
                        result: group
                    })];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                return [2 /*return*/, res.status(500).json({
                        error: err_1
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getGroupById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var groupId, group, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                groupId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, groupModel_1["default"].findByPk(groupId)];
            case 2:
                group = _a.sent();
                if (!group) {
                    return [2 /*return*/, res.status(404).json({
                            message: 'Group not found'
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        group: group
                    })];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).json({
                        err: 'Server Error'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var createGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, groupName, about, userId, group, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, groupName = _a.groupName, about = _a.about;
                if (!groupName) {
                    return [2 /*return*/, res.status(404).send('Group Name is required')];
                }
                if (!about) {
                    return [2 /*return*/, res.status(404).send('About is required')];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                userId = req.user;
                if (!userId) {
                    return [2 /*return*/, res.status(404).send('You are not allowed to create a group')];
                }
                return [4 /*yield*/, groupModel_1["default"].create(__assign(__assign({ id: uuidv4(), userId: userId }, req.body), { date: new Date().toString() }))];
            case 2:
                group = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        group: group,
                        message: "".concat(groupName, " has been created")
                    })];
            case 3:
                err_3 = _b.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(500).json({
                        err: 'Server Error'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var joinGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var groupId, userId, group, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                groupId = req.params.id;
                userId = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, groupModel_1["default"].findByPk(groupId)];
            case 2:
                group = _a.sent();
                if (!group) {
                    return [2 /*return*/, res.status(404).json({
                            message: 'Group not found'
                        })];
                }
                if (group.users.includes(userId)) {
                    return [2 /*return*/, res.status(404).json({
                            message: 'You are already a member of the group'
                        })];
                }
                group.users.push(userId);
                return [4 /*yield*/, group.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: 'You have joined the group successfully',
                        group: group
                    })];
            case 4:
                err_4 = _a.sent();
                console.log(err_4);
                return [2 /*return*/, res.status(500).json({
                        err: 'Server Error'
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var leaveGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var groupId, userId, group, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                groupId = req.params.id;
                userId = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, groupModel_1["default"].findByPk(groupId)];
            case 2:
                group = _a.sent();
                if (!group) {
                    return [2 /*return*/, res.status(404).json({
                            message: 'Group not found'
                        })];
                }
                if (!group.users.includes(userId)) {
                    return [2 /*return*/, res.status(404).json({
                            message: 'You are not a member of this group'
                        })];
                }
                group.users = group.users.filter(function (id) { return id !== userId; });
                return [4 /*yield*/, group.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: 'You have left the group successfully',
                        group: group
                    })];
            case 4:
                err_5 = _a.sent();
                console.log(err_5);
                return [2 /*return*/, res.status(500).json({
                        err: 'Server Error'
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
module.exports = { getAllGroups: getAllGroups, getGroupById: getGroupById, createGroup: createGroup, joinGroup: joinGroup, leaveGroup: leaveGroup };
