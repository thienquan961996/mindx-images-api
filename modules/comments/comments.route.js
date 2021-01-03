const CommentRouter = require('express').Router();
const CommentController = require('./comments.controller');
const isAuth = require('../shared/isAuth');
// tạo một comment
// POST api/comment
CommentRouter.post('/', isAuth, async (req, res) => {
  try {
    const {
      content,
      postId
    } = req.body;

    const user = req.user;
    const userId = user._id;
    // muốn có req.body thì phải đi qua app.use(express.json());

    const newComment = await CommentController.createComment({
      content,
      postId,
      userId
    });
    res.send({ success: 1, data: newComment })
  } catch (err) {
    res.send({ success: 0, message: err.message })
  }
});


module.exports = CommentRouter;