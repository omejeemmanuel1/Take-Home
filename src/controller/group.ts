import { Request, Response } from 'express';
const { v4: uuidv4 } = require('uuid');
import Group, { GroupAttributes} from '../model/groupModel';


const createGroup = async (req: Request, res: Response) => {
  const { groupName, about } = req.body;
  if (!groupName) {
    return res.status(404).send('Group Name is required');
  }
  if (!about) {
    return res.status(404).send('About is required');
  }
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(404).send('You are not allowed to create a group');
    }
    // const group = await Group.create({
    //   id: uuidv4(),
    //   groupName,
    //   about,
    //   date: new Date(),
    //   userId,
    // });
    return res.status(201).json({
      // group,
      message: `${groupName} has been created`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: 'Server Error',
    });
  }
};


interface User {
  id: string;
  email: string;
}

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const group = await Group.findAll();
    return res.status(200).json({
      message: ' All group have been successfully fetch',
      result: group,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err,
    });
  }
};
export const getGroupById = async (req: Request, res: Response) => {
  const groupId = req.params.id;
  try {
    const group = await Group.findOne({where:{id:groupId}});
    if (!group) {
      return res.status(404).json({
        message: 'Group not found',
      });
    }
    return res.status(200).json({
      group,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: 'Server Error',
    });
  }
};

const joinGroup = async (req: Request|any, res: Response) => {
  const groupId = req.params.id;
  const userId = req.user as string;
  try {
    const group = await Group.findOne({where:{id:groupId}});
    if (!group) {
      return res.status(404).json({
        message: 'Group not found',
      });
    }
    if (group.users.includes(userId)) {
      return res.status(404).json({
        message: 'You are already a member of the group',
      });
    }
    group.users.push(userId);
    await group.save();
    return res.status(200).json({
      message: 'You have joined the group successfully',
      group,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: 'Server Error',
    });
  }
};

const leaveGroup = async (req: Request|any, res: Response) => {
  const groupId = req.params.id;
  const userId = req.user as string;
  try {
    const group = await Group.findOne({where:{id:groupId}});
    if (!group) {
      return res.status(404).json({
        message: 'Group not found',
      });
    }
    if (!group.users.includes(userId)) {
      return res.status(404).json({
        message: 'You are not a member of this group',
      });
    }
    group.users = group.users.filter((id: string) => id !== userId);
    await group.save();
    return res.status(200).json({
      message: 'You have left the group successfully',
      group,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: 'Server Error',
    });
  }
};

module.exports = { getAllGroups, getGroupById ,createGroup, joinGroup, leaveGroup};
