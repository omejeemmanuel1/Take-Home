import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from '../model/registerModel'; 

export interface GroupAttributes {
  id: string;
  groupName: string;
  about: string;
}

class Group extends Model<GroupAttributes, GroupAttributes> implements GroupAttributes {
  id!: string;
  groupName!: string;
  about!: string;
}

Group.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Group',
    timestamps: true,
  }
);

// Add the association
Group.belongsTo(User, { foreignKey: 'userId' }); 

module.exports = Group
