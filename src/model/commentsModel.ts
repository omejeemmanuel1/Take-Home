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
          model: User,
          key: 'id', 
        },
    },
    post_id: {
        type: DataTypes.UUID,
        references: {
          model: Post,
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

Comment.belongsTo(Post, { foreignKey: 'post_id'}); 
Post.hasMany(Comment, { foreignKey: 'post_id', as: 'comments'});
Comment.belongsTo(User, { foreignKey: 'user_id'}); 
User.hasMany(Comment, { foreignKey: 'user_id'});


export default Comment;
