const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


//! REMEMBER: EACH TIME WE UPDATE THE RELATIONSHIPS (ASSOCIATIONS) between the tables, we need to use 
//! sequelize.sync({ force: true }) in server.js to drop the tables and recreate them!
//* ONE TO ONE RELATIONSHIPS
User.hasMany(Post, {
   foreignKey: 'user_id',
});

//! AND WE ALSO NEED TO MAKE THE REVERSE ASSOCIATION: a post can belong to one user but not many iusers
Post.belongsTo(User, {
   foreignKey: 'user_id',
   onDelete: 'SET NULL',
});

//**********************************************************************************/


Comment.belongsTo(User, {
   foreignKey: 'user_id',
   onDelete: 'SET NULL',
});

Comment.belongsTo(Post, {
   foreignKey: 'post_id',
   onDelete: 'SET NULL',
});

User.hasMany(Comment, {
   foreignKey: 'user_id',
   onDelete: 'SET NULL',
});

Post.hasMany(Comment, {
   foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };
