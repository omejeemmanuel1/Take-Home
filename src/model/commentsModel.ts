import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface CommentAttributes {
  id: string;
  post_id: string;
  user_id: string;
  comment: string;
}

class Comment extends Model<CommentAttributes, CommentAttributes> implements CommentAttributes {
  id!: string;
  post_id!: string;
  user_id!: string;
  comment!: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
  }
);
export default Comment;
