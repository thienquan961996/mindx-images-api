const CommentModel = require('./comment');

const createComment = async ({
  content,
  postId,
  userId
}) => {
  const newComment = await CommentModel.create({
    content,
    post: postId,
    createdBy: userId  
  });
  return newComment;
};

const getCommentsByPost = async (postId) =>{
    const comments = await CommentModel.find({ post: postId }).populate('createdBy', 'username');

    return comments;
}

module.exports = {
    createComment,
    getCommentsByPost
}