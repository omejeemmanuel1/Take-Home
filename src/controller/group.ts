const Group = require('../model/groupModel');
const { v4: uuidv4 } = require('uuid');
import { Request, Response } from 'express';

const createGroup = async (req: Request, res: Response) => {
  const { groupName, about } = req.body;
  if (!groupName) {
    return res.status(404).send('Group Name is required');
  }
  if (!about) {
    return res.status(404).send('About is required');
  }
  try {
    let userId = req.user;
    if (!userId) {
      return res.status(404).send('You are not allowed to create a group');
    }
    const group = await Group.create({
      id: uuidv4(),
      groupName,
      about,
    });
    return res.status(201).json({
      message: `${groupName} has been created`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: 'Server Error',
    });
  }
};

module.exports = { createGroup };
