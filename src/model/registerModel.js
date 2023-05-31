"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var database_1 = require("../config/database");
var postModel_1 = require("./postModel");
var groupModel_1 = require("./groupModel");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blocked = [];
        return _this;
    }
    return User;
}(sequelize_1.Model));
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    mentalCondition: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    otp_expiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    verify: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    blocked: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: true
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    timestamps: true
});
User.hasMany(postModel_1["default"], { foreignKey: 'userId', as: 'Post' });
postModel_1["default"].belongsTo(User, { foreignKey: 'userId', as: 'User' });
User.hasMany(groupModel_1["default"], { foreignKey: 'userId', as: 'Group' });
groupModel_1["default"].belongsTo(User, { foreignKey: "userId", as: "User" });
exports["default"] = User;
