const express = require("express");
const router = express.Router();
const { createGroup } = require('../controller/group');
// const { authenticatedUser } = require('../middleware/index');

router.post('/create-group', createGroup);

module.exports = router;
