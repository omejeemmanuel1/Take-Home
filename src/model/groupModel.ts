import { DataTypes, Model } from 'sequelize';
const Sequelize = require("sequelize");
import { sequelize } from '../config/database';
import User from '../model/registerModel'; 

const Group = sequelize.define("Group", {
  id: {
    type: Sequelize.UUIDV4,
    primaryKey: true
  },
  groupName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  about: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUIDV4,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  users: {
    type: Sequelize.ARRAY(Sequelize.UUIDV4),
    defaultValue: [],
  },
});

module.exports = Group