import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './registerModel';

export interface PostAttributes {
  id: string;
  userId: string;
  postContent: string;
  image: string[]; 
  video: string[]; 
  emoji: string;
  like: any;
  comment: number;
  reply: number;
  report: number;
  visible: any;
}

class Post extends Model<PostAttributes, PostAttributes> implements PostAttributes {
  id!: string;
  userId!: string;
  postContent!: string;
  image!:  string[];
  video!:  string[];
  emoji!: string;
  like!: any;
  comment!: number;
  reply!: number;
  report!: number;
  visible: any;

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
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    video: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: true,
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
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    timestamps: true,
  }
);

export default Post;
