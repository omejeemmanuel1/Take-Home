const express = require('express');
const router = express.Router();
const { createGroup, getGroupById, joinGroup, leaveGroup } = require('../controller/group');
const { authenticatedUser } = require('../middleware/index');

router.post('/create-group', authenticatedUser, createGroup);
router.get('/groups/:id', getGroupById);
router.post('/group/:id/join', authenticatedUser, joinGroup);
router.post("/group/:id/leave", authenticatedUser, leaveGroup)

module.exports = router;
