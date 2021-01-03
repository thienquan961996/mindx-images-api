const PostModel = require('./post');
const CommentController = require('../comments/comments.controller')

const createPost = async ({
  title,
  description,
  imageUrl,
  userId 
}) => {
  const newPost = await PostModel.create({
    title,
    description,
    imageUrl,
    userId 
  });
  return newPost;
}

const getPosts = async ({ page, limit }) => {
  // page = 1, offset = 0
  // page = 2, offset = (page - 1) * limit
  const offset = (page - 1) * limit;
  const posts = await PostModel
    .find()
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate('userId', 'username');
  
  const total = await PostModel.find().count();
  
  return { data: posts, total };
}

const getPost = async (id) => {
  // const foundPost = await PostModel.findById(id);
  
  // if (!foundPost) throw new Error('Not found post');

  // const comments = await CommentController.getCommentsByPost(id);

  // const clonePost = JSON.parse(JSON.stringify(foundPost));

  // return {...clonePost, comments };

  // C2:
     const foundPost = await PostModel.findById(id)
     .populate({
       path: 'comments',
       populate: {
         path: 'createdBy',
         select: 'username'
       }
       });
     if (!foundPost) throw new Error('Not found post');

     return foundPost;

} 

module.exports = {
  createPost,
  getPosts,
  getPost
}