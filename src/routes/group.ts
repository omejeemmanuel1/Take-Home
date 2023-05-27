import { createGroup, getGroupById, joinGroup, leaveGroup } from '../controller/group'
const express = require('express');
const router = express.Router();
const { authenticatedUser } = require('../middleware/index');
import { auth } from '../middleware/auth'
import { getAllGroups } from '../controller/group';



router.get('/getAll', auth, getAllGroups)
router.post('/create-group', auth, createGroup);
router.get('/groups/:id', auth, getGroupById);
router.post('/group/:id/join', auth, joinGroup);
router.post("/group/:id/leave", auth, leaveGroup)

module.exports = router;
