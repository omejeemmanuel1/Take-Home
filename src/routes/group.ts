const express = require("express");
const router = express.Router();
const { createGroup, getGroupById } = require('../controller/group');
const { authenticatedUser } = require('../middleware/index');

router.post('/create-group', authenticatedUser, createGroup);
router.get('/groups/:id', getGroupById);

module.exports = router;
