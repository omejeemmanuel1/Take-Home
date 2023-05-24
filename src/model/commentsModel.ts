import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Post from './postModel';
import User from './registerModel';
export interface CommentAttributes {
  id: string;
  comment: string;
  user_id: string;
  post_id: string;
}

class Comment extends Model<CommentAttributes> {}

Comment.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id:{
        type: DataTypes.STRING,
        references: {
          model: 'User',
          key: 'id', 
        },
    },
    post_id: {
        type: DataTypes.STRING,
        references: {
          model: 'Post',
          key: 'id',
        }
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
  }
);

Comment.belongsTo(Post, { foreignKey: 'postId'}); 
Post.hasMany(Comment, { foreignKey: 'postId'});
// Comment.belongsTo(User, { foreignKey: 'userId'}); 
User.hasMany(Comment, { foreignKey: 'userId'});


export default Comment;
