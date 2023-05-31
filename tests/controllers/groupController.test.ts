import request from 'supertest';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Group from '../../src/model/groupModel';
const { joinGroup } = require('../controllers/group');

const mockGroup: {
  id: string;
  userId: string;
  groupName: string;
  about: string;
  date: string;
  users: string[]; // Define the type of the `users` property
  save: jest.Mock;
} = {
  id: 'group-id',
  userId: 'user-id',
  groupName: 'Test Group',
  about: 'This is a test group',
  date: new Date().toString(),
  users: [],
  save: jest.fn(),
};

jest.mock('../../src/model/groupModel', () => {
  return {
    findByPk: jest.fn(() => Promise.resolve(mockGroup)),
  };
});

const mockRequest = (params = {}, user: string | null | undefined = null) => {
  return {
    params,
    user,
  } as unknown as Request;
};

const mockResponse = () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return res as Response;
};

describe('joinGroup', () => {
  it('should join the group successfully', async () => {
    const req = mockRequest({ id: 'group-id' }, 'user-id');
    const res = mockResponse();
    await joinGroup(req, res);
    expect(Group.findByPk).toHaveBeenCalledWith('group-id');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'You have joined the group successfully',
      group: expect.objectContaining(mockGroup),
    });
    expect(mockGroup.users).toContain('user-id');
    expect(mockGroup.save).toHaveBeenCalled();
  });
  it('should return 404 if the group is not found', async () => {
    const req = mockRequest({ id: 'non-existent-id' }, 'user-id');
    const res = mockResponse();
    await joinGroup(req, res);
    expect(Group.findByPk).toHaveBeenCalledWith('non-existent-id');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Group not found',
    });
    expect(mockGroup.users).not.toContain('user-id');
    expect(mockGroup.save).not.toHaveBeenCalled();
  });
  it('should return 404 if the user is already a member of the group', async () => {
    const req = mockRequest({ id: 'group-id' }, 'user-id');
    mockGroup.users = ['user-id'];
    const res = mockResponse();
    await joinGroup(req, res);
    expect(Group.findByPk).toHaveBeenCalledWith('group-id');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'You are already a member of the group',
    });
    expect(mockGroup.users).toEqual(['user-id']);
    expect(mockGroup.save).not.toHaveBeenCalled();
  });
});
