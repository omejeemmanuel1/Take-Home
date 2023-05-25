const express = require("express");
const router = express.Router();
const { createGroup, getGroupById, joinGroup } = require('../controller/group');
const { authenticatedUser } = require('../middleware/index');

router.post('/create-group', authenticatedUser, createGroup);
router.get('/groups/:id', getGroupById);
router.post("/group/:id/join", authenticatedUser, joinGroup)

module.exports = router;
