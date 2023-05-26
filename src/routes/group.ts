const express = require('express');
const router = express.Router();
const { createGroup, getAllGroups  } = require('../controller/group');
const { authenticatedUser } = require('../middleware/index');
// getGroupById, joinGroup, leaveGroup
router.get('/all', getAllGroups)
router.post('/create-group', authenticatedUser, createGroup);
// router.get('/groups/:id', getGroupById);
// router.post('/group/:id/join', authenticatedUser, joinGroup);
// router.post("/group/:id/leave", authenticatedUser, leaveGroup)

module.exports = router;
