import { DataTypes, Model, STRING } from 'sequelize';
import { sequelize } from '../config/database';

export interface UserAttributes {
  id: string; 
  email: String;
  password: String;
  otp: any;
  expiry: any;
}

class User extends Model<UserAttributes, UserAttributes> implements UserAttributes {
  id!: string;
  email!: String;
  otp!: number;
  expiry!: Date;
  password!: String;
}

User.init(
  {
    id: {
      type: STRING,
      allowNull: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Passwords',
    timestamps: true,
  }
);

export default User;