import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './registerModel';

export interface PostAttributes {
  id: string;
  userId: string;
  postContent: string;
  like: number;
  comment: number;
  reply: number;
  report: number;
  visible: boolean;
}

class Post extends Model<PostAttributes, PostAttributes> implements PostAttributes {
  id!: string;
  userId!: string;
  postContent!: string;
  like!: any;
  comment!: number;
  reply!: number;
  report!: number;
  visible!: boolean;
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    postContent: {
      type: DataTypes.STRING,
     
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    comment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    reply: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    report: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // or false, depending on your default visibility preference
      },
      
  },
  {
    sequelize,
    modelName: 'Post',
    timestamps: true,
  }
);

export default Post;
