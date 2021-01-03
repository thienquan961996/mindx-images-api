const PostRouter = require('express').Router();
const PostController = require('./posts.controller');
const isAuth = require('../shared/isAuth');
// tạo một bài post
// POST api/posts
PostRouter.post('/', isAuth, async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl
    } = req.body;

    const user = req.user;
    const userId = user._id;
    // muốn có req.body thì phải đi qua app.use(express.json());

    const newPost = await PostController.createPost({
      title,
      description,
      imageUrl,
      userId
    });
    res.send({ success: 1, data: newPost })
  } catch (err) {
    res.send({ success: 0, message: err.message })
  }
});

// get list posts
// GET api/posts
// page, limit

PostRouter.get('/', async (req, res) => {
  const { page, limit } = req.query;
  const pageNumber = Number(page) ? Number(page) : 1;
  const limitNumber = Number(limit) ? Number(limit) : 4;

  const result = await PostController.getPosts(
    {
      page: pageNumber,
      limit: limitNumber
    }
  );
  res.send({ success: 1, data: result });
})

// get detail post
// GET /api/posts/:id
PostRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const foundPost = await PostController.getPost(id);
    res.send({ success: 1, data: foundPost });
  } catch (err) {
    res.send({ success: 0, message: err.message })
  }
})

module.exports = PostRouter;