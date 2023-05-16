import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mentalCondition: string;
  country: string;
  state: string;
  password: string;
  otp: any;
  otp_expiry:Date;
}

class User extends Model<UserAttributes, UserAttributes> implements UserAttributes {
  otp: any;
  otp_expiry: any;
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  mentalCondition!: string;
  country!: string;
  state!: string;
  password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING, // corrected type from DataTypes.UUIDV4 to DataTypes.STRING
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mentalCondition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    otp_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  }
);

export default User;