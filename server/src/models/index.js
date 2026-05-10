import User from './User.js';
import Post from './Post.js';
import Project from './Project.js';
import Comment from './Comment.js';
import Subscriber from './Subscriber.js';
import SiteConfig from './SiteConfig.js';

// Associations
Post.hasMany(Comment, { foreignKey: 'entityId', constraints: false, scope: { entityType: 'post' } });
Project.hasMany(Comment, { foreignKey: 'entityId', constraints: false, scope: { entityType: 'project' } });
User.hasMany(Post, { foreignKey: 'authorId' });
User.hasMany(Project, { foreignKey: 'authorId' });

Post.belongsTo(User, { foreignKey: 'authorId' });
Project.belongsTo(User, { foreignKey: 'authorId' });
Comment.belongsTo(User, { foreignKey: 'authorId', constraints: false });

export { User, Post, Project, Comment, Subscriber, SiteConfig };
