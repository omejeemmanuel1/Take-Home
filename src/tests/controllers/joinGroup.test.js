'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const groupModel_1 = __importDefault(require('../../model/groupModel'));
const { joinGroup } = require('./group');
const mockGroup = {
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
const mockRequest = (params = {}, user = null) => {
  return {
    params,
    user,
  };
};
const mockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return res;
};
describe('joinGroup', () => {
  it('should join the group successfully', async () => {
    const req = mockRequest({ id: 'group-id' }, 'user-id');
    const res = mockResponse();
    await joinGroup(req, res);
    expect(groupModel_1.default.findByPk).toHaveBeenCalledWith('group-id');
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
    expect(groupModel_1.default.findByPk).toHaveBeenCalledWith('non-existent-id');
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
    expect(groupModel_1.default.findByPk).toHaveBeenCalledWith('group-id');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'You are already a member of the group',
    });
    expect(mockGroup.users).toEqual(['user-id']);
    expect(mockGroup.save).not.toHaveBeenCalled();
  });
});
