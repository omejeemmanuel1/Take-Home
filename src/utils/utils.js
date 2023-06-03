"use strict";
exports.__esModule = true;
exports.options = exports.createPostSchema = exports.loginUserSchema = void 0;
var joi_1 = require("joi");
exports.loginUserSchema = joi_1["default"].object().keys({
    email: joi_1["default"].string().email().trim().lowercase().required(),
    password: joi_1["default"].string().trim().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});
exports.createPostSchema = joi_1["default"].object().keys({
    postContent: joi_1["default"].string().required()
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
