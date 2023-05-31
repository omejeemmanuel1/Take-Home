"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var authenticatedUser = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    var token = authHeader.split(" ")[1];
    try {
        var decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken.id;
        next();
    }
    catch (err) {
        console.log(err);
    }
};
module.exports = { authenticatedUser: authenticatedUser };
