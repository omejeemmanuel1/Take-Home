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
var registerModel_1 = require("./registerModel");
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Comment;
}(sequelize_1.Model));
Comment.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    comment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: registerModel_1["default"],
            key: 'id'
        }
    },
    post_id: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: postModel_1["default"],
            key: 'id'
        }
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Comment',
    timestamps: true
});
Comment.belongsTo(postModel_1["default"], { foreignKey: 'post_id' });
postModel_1["default"].hasMany(Comment, { foreignKey: 'post_id', as: 'comments' });
Comment.belongsTo(registerModel_1["default"], { foreignKey: 'user_id' });
registerModel_1["default"].hasMany(Comment, { foreignKey: 'user_id' });
exports["default"] = Comment;
